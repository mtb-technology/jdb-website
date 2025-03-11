import { DynamicForm } from "@/components/DynamicForm";


export default function FormSection({ formName, locale }: { formName: string, locale: string }) {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{locale === "nl" ? "Deskundig belastingadvies op maat" : "Expert tax advice tailored to your situation"}</h2>
        <p className="text-gray-600">{locale === "nl" ? "Heb je een complexe situatie die om specialistische kennis vraagt of wil je jouw belastingaangifte met vertrouwen uit handen geven? Vul het formulier in en ontvang passend advies van een belastingexpert die gespecialiseerd is in jouw situatie. Hoe meer informatie je deelt, hoe gerichter we je kunnen helpen, zonder onnodige vervolgvragen of vertraging." : "Do you have a complex situation that requires specialist knowledge or do you want to outsource your tax return with confidence? Fill out the form and receive tailored advice from a tax expert who is specialized in your situation. The more information you share, the more we can help you, without unnecessary follow-up questions or delays."}</p>
      </div>
      <DynamicForm handle={formName} />
    </div>
  );
}
