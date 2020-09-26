import { createContextBuilder } from "@smui/common";

const [createTextFieldContext, getTextFieldContext] = createContextBuilder<TextFieldContext>();
export { createTextFieldContext, getTextFieldContext };

export interface TextFieldContext {
  setTrailingIcon(value: boolean);
  setLeadingIcon(value: boolean);
  setHelperTextId(id: string);
  readonly helperTextId: string;
}