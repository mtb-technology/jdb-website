"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTracking } from "@/app/components/providers/tracking-provider";
import { FormProgress } from "@/components/forms/form-progress";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jdbApi } from "@/lib/api/JDBApi";
import type { SupportedLocale } from "@/lib/types";
import { cn } from "@/lib/utils";

const validationMessages = {
  nl: {
    email: "Voer een geldig e-mailadres in.",
    required: "Dit veld is verplicht.",
    minOptions: "Selecteer ten minste één optie.",
    minLength: (min: number) => `Minimaal ${min} karakters.`,
    maxLength: (max: number) => `Maximaal ${max} karakters.`,
    pattern: "Ongeldige invoer.",
    previous: "Vorige",
    next: "Volgende",
    submitting: "Bezig met versturen...",
  },
  en: {
    email: "Enter a valid email address.",
    required: "This field is required.",
    minOptions: "Select at least one option.",
    minLength: (min: number) => `Minimum ${min} characters.`,
    maxLength: (max: number) => `Maximum ${max} characters.`,
    pattern: "Invalid input.",
    previous: "Previous",
    next: "Next",
    submitting: "Submitting...",
  },
};

export interface FieldConfig {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  description?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  width?: "full" | "half" | "third" | "twoThird";
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  defaultValue?: any;
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  submitButtonText: string;
  fields: FieldConfig[];
  sections?: {
    title?: string;
    description?: string;
    fields: string[];
    page?: number;
  }[];
  successMessage?: {
    title: string;
    description: string;
    buttonText?: string;
  };
}

interface DynamicFormProps {
  config: FormConfig;
  onSubmit?: (values: any) => Promise<boolean>;
  className?: string;
  locale?: SupportedLocale;
}

export function DynamicForm({
  config,
  className,
  locale = "nl",
}: DynamicFormProps) {
  const messages = useMemo(
    () => validationMessages[locale] || validationMessages.nl,
    [locale]
  );
  const { trackingData } = useTracking();
  const safeConfig = useMemo(
    () => ({
      ...config,
      id: config.id || "advisor-request",
      fields: config.fields || [],
      sections: config.sections || [],
      submitButtonText: config.submitButtonText || "Submit",
    }),
    [config]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [validatedPages, setValidatedPages] = useState<Record<number, boolean>>(
    {}
  );
  const prevPageRef = useRef(currentPage);

  const currentPageFieldIds = useMemo(() => {
    return (
      safeConfig.sections
        ?.filter((section) => (section.page || 1) === currentPage)
        .flatMap((section) => section.fields || []) || []
    );
  }, [safeConfig.sections, currentPage]);

  const totalPages = useMemo(() => {
    if (!safeConfig.sections || safeConfig.sections.length === 0) return 1;
    return Math.max(...safeConfig.sections.map((section) => section.page || 1));
  }, [safeConfig.sections]);

  const { dynamicSchema, defaultValues } = useMemo(() => {
    const schemaObj: Record<string, any> = {};
    const initialValues: Record<string, any> = {};

    if (Array.isArray(safeConfig.fields)) {
      safeConfig.fields.forEach((field) => {
        let fieldSchema: any = z.string();

        if (field.type === "checkbox") {
          initialValues[field.id] = field.defaultValue || [];
        } else if (field.type === "date") {
          initialValues[field.id] = field.defaultValue
            ? new Date(field.defaultValue)
            : undefined;
        } else {
          initialValues[field.id] = field.defaultValue || "";
        }

        if (field.type === "email") {
          fieldSchema = z.string().email({
            message: field.validation?.message || messages.email,
          });
        } else if (field.type === "checkbox") {
          fieldSchema = z.array(z.string());
          if (field.required) {
            fieldSchema = fieldSchema.min(1, {
              message: field.validation?.message || messages.minOptions,
            });
          }
        } else if (field.type === "date") {
          fieldSchema = z.date({
            required_error: field.validation?.message || messages.required,
          });
        } else {
          if (field.required) {
            fieldSchema = fieldSchema.min(1, {
              message: field.validation?.message || messages.required,
            });
          }

          if (field.validation?.min) {
            fieldSchema = fieldSchema.min(field.validation.min, {
              message:
                field.validation.message ||
                messages.minLength(field.validation.min),
            });
          }

          if (field.validation?.max) {
            fieldSchema = fieldSchema.max(field.validation.max, {
              message:
                field.validation.message ||
                messages.maxLength(field.validation.max),
            });
          }

          if (field.validation?.pattern) {
            fieldSchema = fieldSchema.regex(
              new RegExp(field.validation.pattern),
              {
                message: field.validation.message || messages.pattern,
              }
            );
          }
        }

        if (
          !field.required &&
          field.type !== "checkbox" &&
          field.type !== "date"
        ) {
          fieldSchema = fieldSchema.optional();
        }

        schemaObj[field.id] = fieldSchema;
      });
    }

    return {
      dynamicSchema: z.object(schemaObj),
      defaultValues: initialValues,
    };
  }, [safeConfig.fields, messages]);

  const form = useForm<any>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
    mode: "onSubmit",
  });

  // Add honeypot field to the form
  const honeypotField = "company_name"; // Common field name that bots might try to fill

  const _handleNextPage = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      form.trigger(currentPageFieldIds).then((isValid) => {
        if (isValid) {
          const nextPage = Math.min(currentPage + 1, totalPages);
          setCurrentPage(nextPage);
          window.scrollTo(0, 0);
        } else {
          setValidatedPages((prev) => ({
            ...prev,
            [currentPage]: true,
          }));
        }
      });
    },
    [currentPage, currentPageFieldIds, form, totalPages]
  );

  const handlePrevPage = useCallback(() => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSubmit = useCallback(
    async (values: any): Promise<boolean> => {
      if (currentPage < totalPages) {
        _handleNextPage();
        return false;
      }

      // Check honeypot field
      if (values[honeypotField]) {
        // If honeypot is filled, silently fail
        console.log("Bot detected - honeypot field filled");
        return false;
      }

      const formData: Record<string, any> = {};
      formData.id = safeConfig.id;
      safeConfig.fields.forEach((field) => {
        const fieldId = field.id;
        formData[fieldId] = values[fieldId];
      });

      formData.lead_source = trackingData?.leadSource || "advisor_finder";
      formData.tracking_id = trackingData?.trackingId;
      formData.utm_params = trackingData?.utmParams;
      formData.gad_source = trackingData?.gadSource;
      formData.gclid = trackingData?.gclid;
      formData.fbclid = trackingData?.fbclid;
      formData.hotjar_user_id = trackingData?.hotjarUserId;
      formData.app_locale = locale;

      setIsSubmitting(true);
      try {
        const response = await jdbApi.submitForm("advisor-request", formData);
        if (response.success) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "formSubmitted",
            ecommerce: {
              form_handle: formData.id,
              language: locale,
              transaction_id: trackingData?.trackingId,
              lead_source: trackingData?.leadSource,
              utm_params: trackingData?.utmParams,
              hotjar_user_id: trackingData?.hotjarUserId,
              gad_source: trackingData?.gadSource,
              gclid: trackingData?.gclid,
              fbclid: trackingData?.fbclid,
            },
          });
          setIsSubmitted(true);
          return true;
        } else {
          console.error("Form submission failed:", response.message);
          return false;
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [locale, trackingData, currentPage, totalPages, _handleNextPage, safeConfig]
  );

  const renderField = useCallback(
    (fieldId: string) => {
      const fieldConfig = safeConfig.fields.find((f) => f.id === fieldId);
      if (!fieldConfig) return null;

      const { type, label, placeholder, options, required, width } =
        fieldConfig;

      const widthClass =
        width === "half"
          ? "col-span-full md:col-span-1"
          : width === "third"
            ? "col-span-full md:col-span-1"
            : width === "twoThird"
              ? "col-span-full md:col-span-2"
              : "col-span-full";

      const shouldShowErrors = validatedPages[currentPage] === true;

      switch (type) {
        case "text":
        case "email":
        case "tel":
        case "number":
          return (
            <div className={widthClass} key={fieldId}>
              <FormField
                control={form.control}
                name={fieldId}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {label}
                      {required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className={cn(
                          "text-sm placeholder:text-sm",
                          shouldShowErrors && fieldState.invalid
                            ? "border-destructive"
                            : ""
                        )}
                      />
                    </FormControl>
                    {fieldConfig.description && (
                      <FormDescription>
                        {fieldConfig.description}
                      </FormDescription>
                    )}
                    {shouldShowErrors && fieldState.invalid && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          );

        case "textarea":
          return (
            <div className={widthClass} key={fieldId}>
              <FormField
                control={form.control}
                name={fieldId}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {label}
                      {required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={placeholder}
                        className={cn(
                          "min-h-[120px] text-sm placeholder:text-sm",
                          shouldShowErrors && fieldState.invalid
                            ? "border-destructive"
                            : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    {fieldConfig.description && (
                      <FormDescription>
                        {fieldConfig.description}
                      </FormDescription>
                    )}
                    {shouldShowErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          );

        case "select":
          return (
            <div className={widthClass} key={fieldId}>
              <FormField
                control={form.control}
                name={fieldId}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {label}
                      {required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            shouldShowErrors && fieldState.invalid
                              ? "border-destructive"
                              : ""
                          )}
                        >
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldConfig.description && (
                      <FormDescription>
                        {fieldConfig.description}
                      </FormDescription>
                    )}
                    {shouldShowErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          );

        case "radio":
          return (
            <div className={widthClass} key={fieldId}>
              <FormField
                control={form.control}
                name={fieldId}
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      {label}
                      {required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className={cn(
                          "flex flex-row space-x-4",
                          shouldShowErrors && fieldState.invalid
                            ? "border-destructive border rounded-md p-2"
                            : ""
                        )}
                      >
                        {options?.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    {fieldConfig.description && (
                      <FormDescription>
                        {fieldConfig.description}
                      </FormDescription>
                    )}
                    {shouldShowErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          );

        case "checkbox":
          return (
            <div className={widthClass} key={fieldId}>
              <FormField
                control={form.control}
                name={fieldId}
                render={({ field: parentField, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {label}
                      {required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <div
                      className={cn(
                        "flex flex-col space-y-2",
                        shouldShowErrors && fieldState.invalid
                          ? "border-destructive border rounded-md p-2"
                          : ""
                      )}
                    >
                      {options?.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name={fieldId}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.value}
                                className="flex flex-row items-start space-x-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      option.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...(field.value || []), option.value]
                                        : field.value?.filter(
                                            (value: string) =>
                                              value !== option.value
                                          );
                                      field.onChange(updatedValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    {fieldConfig.description && (
                      <FormDescription>
                        {fieldConfig.description}
                      </FormDescription>
                    )}
                    {shouldShowErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          );

        case "date":
          return (
            <div className={widthClass} key={fieldId}>
              <FormField
                control={form.control}
                name={fieldId}
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      {label}
                      {required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal text-sm",
                              !field.value && "text-muted-foreground",
                              shouldShowErrors && fieldState.invalid
                                ? "border-destructive"
                                : ""
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>
                                {placeholder || "Selecteer een datum"}
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          showOutsideDays={false}
                          classNames={{
                            months:
                              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                            head_row: "hidden",
                            head_cell: "hidden",
                            row: "flex w-full mt-2",
                            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                            day: cn(
                              "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                              "rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            ),
                            day_selected:
                              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today: "bg-accent text-accent-foreground",
                            day_outside: "text-muted-foreground opacity-50",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_hidden: "invisible",
                            caption:
                              "flex justify-center items-center space-x-1 mb-4",
                            caption_label: "hidden",
                            nav: "hidden",
                            dropdown_month:
                              "min-w-[90px] bg-background border rounded-md px-2 py-1 text-sm hover:bg-accent",
                            dropdown_year:
                              "min-w-[70px] bg-background border rounded-md px-2 py-1 text-sm hover:bg-accent",
                            dropdown:
                              "focus:ring-1 focus:ring-primary [&>*:first-child]:hidden [&>select]:!p-0 [&>select]:!pl-2",
                            vhidden: "hidden",
                          }}
                          components={{
                            Dropdown: ({
                              value,
                              onChange,
                              children,
                              ...props
                            }) => {
                              return (
                                <select
                                  value={value}
                                  onChange={onChange}
                                  className="cursor-pointer border rounded-md px-2 py-1 text-sm hover:bg-accent"
                                  {...props}
                                >
                                  {children}
                                </select>
                              );
                            },
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldConfig.description && (
                      <FormDescription>
                        {fieldConfig.description}
                      </FormDescription>
                    )}
                    {shouldShowErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          );

        default:
          return null;
      }
    },
    [currentPage, form, safeConfig.fields, validatedPages]
  );

  const content =
    isSubmitted && safeConfig.successMessage ? (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>{safeConfig.successMessage.title}</CardTitle>
          <CardDescription>
            {safeConfig.successMessage.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeConfig.successMessage.buttonText && (
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentPage(1);
                setValidatedPages({});
                form.reset(defaultValues);
              }}
            >
              {safeConfig.successMessage.buttonText}
            </Button>
          )}
        </CardContent>
      </Card>
    ) : (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>{safeConfig.title}</CardTitle>
          {safeConfig.description && (
            <CardDescription>{safeConfig.description}</CardDescription>
          )}
          {totalPages > 1 && (
            <FormProgress
              currentPage={currentPage}
              totalPages={totalPages}
              className="mt-4"
              locale={locale}
            />
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              {/* Add honeypot field */}
              <div className="hidden">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...form.register(honeypotField)}
                />
              </div>

              {safeConfig.sections && safeConfig.sections.length > 0 ? (
                safeConfig.sections
                  .filter((section) => (section.page || 1) === currentPage)
                  .map((section, index) => (
                    <div key={index} className="space-y-4">
                      {section.title && (
                        <h3 className="text-lg font-medium">{section.title}</h3>
                      )}
                      {section.description && (
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {(section.fields || []).map((fieldId) =>
                          renderField(fieldId)
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {safeConfig.fields.map((field) => renderField(field.id))}
                </div>
              )}

              {currentPage === totalPages && (
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="privacy_consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            required
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {locale === "en" ? (
                              <>
                                I have read the{" "}
                                <Link href="/en/privacy">privacy policy</Link>{" "}
                                and consent to being contacted.
                              </>
                            ) : (
                              <>
                                Ik heb het{" "}
                                <Link href="/privacy">privacybeleid</Link>{" "}
                                gelezen en ga ermee akkoord dat er contact met
                                mij wordt opgenomen.
                              </>
                            )}
                            <span className="text-destructive ml-1">*</span>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between mt-6">
                {currentPage > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevPage}
                  >
                    {messages.previous}
                  </Button>
                )}
                {currentPage < totalPages ? (
                  <Button
                    type="button"
                    className="ml-auto"
                    onClick={_handleNextPage}
                  >
                    {messages.next}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={cn(currentPage > 1 ? "ml-auto" : "w-full")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? messages.submitting
                      : safeConfig.submitButtonText}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );

  return content;
}
