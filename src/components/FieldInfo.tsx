import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <small className="text-xs text-red-500">
          {field.state.meta.errors.join(", ")}
        </small>
      ) : null}
      {/* {field.state.meta.isValidating ? "Validating..." : null} */}
    </>
  );
}
