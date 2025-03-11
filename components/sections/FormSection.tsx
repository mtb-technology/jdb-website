import { DynamicForm } from "@/components/DynamicForm";


export default function FormSection({ formName, locale }: { formName: string, locale: string }) {
  return (
    <div className="">
      <DynamicForm handle={formName} />
    </div>
  );
}
