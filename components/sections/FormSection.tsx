import { DynamicForm } from "@/components/DynamicForm";

export default function FormSection({ formName }: { formName: string }) {
  return (
    <div className="">
      <DynamicForm handle={formName} />
    </div>
  );
}
