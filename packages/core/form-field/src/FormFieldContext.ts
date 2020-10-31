import { createContextBuilder } from "@smui/common";
import { MDCFormField, MDCFormFieldInput } from "@material/form-field";

const [createFormFieldContext, getFormFieldContext] = createContextBuilder<FormFieldContext>();
export { createFormFieldContext, getFormFieldContext };

export interface FormFieldContext {
  readonly inputId: string;
  readonly instance: MDCFormField;
  setInput(slider: MDCFormFieldInput);
}