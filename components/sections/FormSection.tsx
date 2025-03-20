import formsConfig from "@/app/forms/forms.json";
import { DynamicForm, FormConfig } from "@/components/forms/dynamic-form";
import type { SupportedLocale } from "@/lib/types";

interface FormSectionProps {
  formName: string;
  locale: SupportedLocale;
}

export default function FormSection({ formName, locale }: FormSectionProps) {
  const forms = formsConfig[locale as keyof typeof formsConfig] || formsConfig.nl;
  const formConfig = forms.find((form) => form.id === formName) as FormConfig;

  if (!formConfig) {
    console.error(`Form configuration not found for: ${formName}`);
    return null;
  }

  return (
    <div className="container mx-auto pt-8 pb-1 mt-16">
      <div className="max-w-2xl mx-auto mb-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {locale === "nl"
            ? "Deskundig belastingadvies op maat"
            : "Expert tax advice tailored to your situation"}
        </h2>
        <p className="text-gray-600">
          {locale === "nl"
            ? "Heb je een complexe belastingaangifte of wil je dat een expert het voor je regelt? Vul het formulier in en krijg hulp van een belastingadviseur die jouw situatie begrijpt. Hoe meer informatie je deelt, hoe beter we je kunnen helpen zonder extra vragen of vertraging."
            : "Got a complex tax situation or want an expert to handle your tax return? Fill out the form and get help from a tax advisor who understands your needs. The more information you share, the better we can help you without extra questions or delays."}
        </p>
      </div>
      <div className="py-4">
        <DynamicForm config={formConfig} locale={locale} />
      </div>
    </div>
  );
}
