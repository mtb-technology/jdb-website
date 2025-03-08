"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useTracking } from "@/app/components/providers/tracking-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { jdbApi } from "@/lib/api/JDBApi";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface DynamicFormProps {
  handle: string;
  className?: string;
}

interface FormField {
  field_type: string;
  field_key: string;
  field_label: string;
  field_width?: "full" | "half" | "third" | "two-thirds";
  is_required?: boolean;
  placeholder?: string;
  helper_text?: string;
  options?: Array<{ label: string; value: string }>;
  has_conditions?: boolean;
  condition_field?: string;
  condition_operator?: string;
  condition_value?: any;
}

interface FormSection {
  title: string;
  fields: FormField[];
}

interface DynamicFormData {
  form_sections: FormSection[];
  handle: string;
  name: string;
}

export function DynamicForm({ handle, className }: DynamicFormProps) {
  const [formData, setFormData] = useState<DynamicFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setForceUpdate] = useState({});
  const { trackingData } = useTracking();
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const locale = isEnglish ? "en" : "nl";

  // Helper function to normalize condition values for comparison
  const normalizeValue = (value: any): boolean | string | number => {
    if (value === "1" || value === 1 || value === "true" || value === true) {
      return true;
    }
    if (value === "0" || value === 0 || value === "false" || value === false) {
      return false;
    }
    return value;
  };

  // Helper function to check if a field should be visible based on its conditions
  const isFieldVisible = (
    field: FormField,
    formValues: Record<string, any>
  ): boolean => {
    // Only check conditions if the field has conditions
    if (!field.has_conditions) {
      return true;
    }

    // If has_conditions is true but no condition_field, hide the field
    if (!field.condition_field) {
      return false;
    }

    const conditionFieldValue = formValues[field.condition_field];
    const normalizedFieldValue = normalizeValue(conditionFieldValue);
    const normalizedConditionValue = normalizeValue(field.condition_value);

    console.log(`Checking visibility for field: ${field.field_key}`);
    console.log(`Condition field: ${field.condition_field}`);
    console.log(`Condition operator: ${field.condition_operator}`);
    console.log(`Raw condition value:`, field.condition_value);
    console.log(`Raw field value:`, conditionFieldValue);
    console.log(`Normalized condition value:`, normalizedConditionValue);
    console.log(`Normalized field value:`, normalizedFieldValue);

    // If the condition field doesn't exist in form values, hide the field
    if (normalizedFieldValue === undefined) {
      console.log("Field value is undefined, hiding field");
      return false;
    }

    // Check the condition based on the operator
    switch (field.condition_operator) {
      case "equals":
        const isEqual = normalizedFieldValue === normalizedConditionValue;
        console.log(`Equals comparison result: ${isEqual}`);
        return isEqual;
      case "not_equals":
        return normalizedFieldValue !== normalizedConditionValue;
      case "contains":
        return Array.isArray(normalizedFieldValue)
          ? normalizedFieldValue.includes(normalizedConditionValue)
          : String(normalizedFieldValue).includes(
              String(normalizedConditionValue)
            );
      case "not_contains":
        return Array.isArray(normalizedFieldValue)
          ? !normalizedFieldValue.includes(normalizedConditionValue)
          : !String(normalizedFieldValue).includes(
              String(normalizedConditionValue)
            );
      case "greater_than":
        return Number(normalizedFieldValue) > Number(normalizedConditionValue);
      case "less_than":
        return Number(normalizedFieldValue) < Number(normalizedConditionValue);
      case "is_empty":
        return (
          !normalizedFieldValue ||
          (Array.isArray(normalizedFieldValue) &&
            normalizedFieldValue.length === 0) ||
          normalizedFieldValue === ""
        );
      case "is_not_empty":
        return (
          Boolean(normalizedFieldValue) &&
          (!Array.isArray(normalizedFieldValue) ||
            normalizedFieldValue.length > 0) &&
          normalizedFieldValue !== ""
        );
      case "is_true":
        return normalizedFieldValue === true;
      case "is_false":
        return normalizedFieldValue === false;
      default:
        return false; // If no valid operator is provided, hide the field
    }
  };

  // Generate Zod schema dynamically based on form fields
  const generateZodSchema = (
    formSections: FormSection[],
    formValues: Record<string, any> = {}
  ) => {
    const schemaObject: Record<string, z.ZodTypeAny> = {};

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        // Skip validation for hidden fields
        if (!isFieldVisible(field, formValues)) {
          schemaObject[field.field_key] = z.any().optional();
          return;
        }

        let fieldSchema: z.ZodTypeAny;

        switch (field.field_type) {
          case "email":
            fieldSchema = z.string().email();
            break;
          case "checkbox":
            fieldSchema = z.boolean();
            break;
          case "checkboxes": {
            const arraySchema = z.array(z.string());
            fieldSchema = field.is_required
              ? arraySchema.min(1, "This field is required")
              : arraySchema;
            break;
          }
          case "date":
            fieldSchema = z.date();
            break;
          default: {
            const stringSchema = z.string();
            fieldSchema = field.is_required
              ? stringSchema.min(1, "This field is required")
              : stringSchema;
          }
        }

        if (!field.is_required) {
          fieldSchema = fieldSchema.optional();
        }

        schemaObject[field.field_key] = fieldSchema;
      });
    });

    return z.object(schemaObject);
  };

  const generateDefaultValues = (formSections: FormSection[]) => {
    const defaultValues: Record<string, any> = {};
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        switch (field.field_type) {
          case "checkbox":
            defaultValues[field.field_key] = false;
            break;
          case "checkboxes":
            defaultValues[field.field_key] = [];
            break;
          case "date":
            defaultValues[field.field_key] = null;
            break;
          default:
            defaultValues[field.field_key] = "";
        }
      });
    });
    return defaultValues;
  };

  const form = useForm<z.infer<ReturnType<typeof generateZodSchema>>>({
    resolver: zodResolver(
      formData ? generateZodSchema(formData.form_sections, {}) : z.object({})
    ),
    defaultValues: formData
      ? generateDefaultValues(formData.form_sections)
      : {},
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // Get all condition fields from the form data
  const getConditionFields = () => {
    if (!formData) return new Set<string>();

    const conditionFields = new Set<string>();
    formData.form_sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.has_conditions && field.condition_field) {
          conditionFields.add(field.condition_field);
        }
      });
    });
    return conditionFields;
  };

  // Subscribe to form value changes to handle conditional visibility
  useEffect(() => {
    if (!formData) return;

    const conditionFields = getConditionFields();
    console.log("Condition fields:", Array.from(conditionFields));

    // Subscribe to all form changes
    const subscription = form.watch((formValues) => {
      console.log("Form values changed:", formValues);

      // Force re-render to update visibility
      setForceUpdate({});

      // Update validation schema when condition fields change
      form.clearErrors();
      const newSchema = generateZodSchema(formData.form_sections, formValues);
      form.setError = form.setError;
    });

    return () => subscription.unsubscribe();
  }, [form, formData, generateZodSchema, getConditionFields]);

  // Initialize form when formData is loaded
  useEffect(() => {
    if (formData) {
      const defaultValues = generateDefaultValues(formData.form_sections);
      form.reset(defaultValues);
    }
  }, [formData, form]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await jdbApi.getForm(handle);
        setFormData(data.form as unknown as DynamicFormData);
      } catch (error) {
        console.error("Error fetching form:", error);
        toast.error("Failed to load form");
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [handle]);

  const onSubmit = async (
    values: z.infer<ReturnType<typeof generateZodSchema>>,
    locale: string
  ) => {
    try {
      const formValues = form.getValues();
      const visibleFields = new Set<string>();

      // Get all visible fields
      formData?.form_sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (isFieldVisible(field, formValues)) {
            visibleFields.add(field.field_key);
          }
        });
      });

      // Clear errors for hidden fields
      Object.keys(form.formState.errors).forEach((key) => {
        if (!visibleFields.has(key)) {
          form.clearErrors(key);
        }
      });

      // Only include visible field values in submission
      const visibleValues = Object.fromEntries(
        Object.entries(values).filter(([key]) => visibleFields.has(key))
      );

      const response = await jdbApi.submitForm(handle, {
        ...visibleValues,
        tracking_id: trackingData?.trackingId ?? undefined,
        lead_source: trackingData?.leadSource ?? undefined,
        app_locale: locale,
      });

      if (!response.success) {
        throw new Error(response.message || "Form submission failed");
      }

      toast.success("Form submitted successfully");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return <div>Form not found</div>;
  }

  const renderField = (field: FormField) => {
    const fieldWidth = {
      full: "col-span-12",
      half: "col-span-12 md:col-span-6",
      third: "col-span-12 md:col-span-4",
      "two-thirds": "col-span-12 md:col-span-8",
    }[field.field_width || "full"];

    const formValues = form.getValues();
    const isVisible = isFieldVisible(field, formValues);

    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={field.field_key}
            className={fieldWidth}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FormField
              control={form.control}
              name={field.field_key}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {field.field_label}
                    {field.is_required && (
                      <span className="text-red-500">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    {(() => {
                      switch (field.field_type) {
                        case "text":
                        case "email":
                        case "url":
                        case "tel":
                        case "password":
                          return (
                            <Input
                              type={field.field_type}
                              placeholder={field.placeholder}
                              {...formField}
                            />
                          );

                        case "textarea":
                          return (
                            <Textarea
                              placeholder={field.placeholder}
                              {...formField}
                            />
                          );

                        case "select":
                          return (
                            <Select
                              onValueChange={formField.onChange}
                              defaultValue={formField.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );

                        case "checkbox":
                          return (
                            <Switch
                              checked={Boolean(formField.value)}
                              onCheckedChange={(checked) => {
                                console.log(
                                  `Switch value changing to:`,
                                  checked
                                );
                                formField.onChange(checked);
                              }}
                            />
                          );

                        case "radio":
                          return (
                            <RadioGroup
                              onValueChange={formField.onChange}
                              defaultValue={formField.value}
                              className="flex flex-col space-y-1"
                            >
                              {field.options?.map((option) => (
                                <label
                                  key={option.value}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <RadioGroupItem value={option.value} />
                                  <span>{option.label}</span>
                                </label>
                              ))}
                            </RadioGroup>
                          );

                        case "date":
                          return (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formField.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formField.value ? (
                                    format(formField.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={formField.value}
                                  onSelect={formField.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </FormControl>
                  {field.helper_text && (
                    <FormDescription>{field.helper_text}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (values: z.infer<ReturnType<typeof generateZodSchema>>) =>
            onSubmit(values, locale)
        )}
        className={cn("space-y-8", className)}
      >
        {formData.form_sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 space-y-6"
          >
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {section.fields.map(renderField)}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
