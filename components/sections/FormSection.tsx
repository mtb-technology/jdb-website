import { DynamicForm } from "@/components/DynamicForm";

export default function FormSection({ formName }: { formName: string }) {
  return (
    <div className="container mx-auto py-8">
      <DynamicForm handle={formName} />
    </div>
  );
}
