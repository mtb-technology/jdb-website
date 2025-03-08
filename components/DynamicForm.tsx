"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useTracking } from "@/app/components/providers/tracking-provider";
import { Button } from "@/components/ui/button";
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

interface FormData {
  form_sections: FormSection[];
  handle: string;
  name: string;
}

export function DynamicForm({ handle, className }: DynamicFormProps) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { trackingData } = useTracking();

  // Generate Zod schema dynamically based on form fields
  const generateZodSchema = (formSections: FormSection[]) => {
    const schemaObject: Record<string, any> = {};

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        let fieldSchema = z.string();

        if (field.field_type === "email") {
          fieldSchema = z.string().email();
        } else if (field.field_type === "checkbox") {
          fieldSchema = z.boolean().optional();
        } else if (field.field_type === "checkboxes") {
          fieldSchema = z.array(z.string()).min(field.is_required ? 1 : 0);
        }

        if (field.is_required) {
          fieldSchema = fieldSchema.min(1, "This field is required");
        } else {
          fieldSchema = fieldSchema.optional();
        }

        schemaObject[field.field_key] = fieldSchema;
      });
    });

    return z.object(schemaObject);
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await jdbApi.getForm(handle);
        setFormData(data.form);
      } catch (error) {
        console.error("Error fetching form:", error);
        toast.error("Failed to load form");
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [handle]);

  const form = useForm<z.infer<ReturnType<typeof generateZodSchema>>>({
    resolver: zodResolver(
      formData ? generateZodSchema(formData.form_sections) : z.object({})
    ),
    defaultValues: {},
  });

  const onSubmit = async (
    values: z.infer<ReturnType<typeof generateZodSchema>>
  ) => {
    try {
      const response = await jdbApi.submitForm(handle, {
        ...values,
        tracking_id: trackingData?.trackingId,
        lead_source: trackingData?.leadSource,
        app_locale: navigator.language,
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

    return (
      <div key={field.field_key} className={fieldWidth}>
        <FormField
          control={form.control}
          name={field.field_key}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>
                {field.field_label}
                {field.is_required && <span className="text-red-500">*</span>}
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
                          <SelectTrigger>
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
                          checked={formField.value}
                          onCheckedChange={formField.onChange}
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
                            <div
                              key={option.value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={option.value} />
                              <span>{option.label}</span>
                            </div>
                          ))}
                        </RadioGroup>
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
      </div>
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
