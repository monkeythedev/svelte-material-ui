import { createContextBuilder } from "@smui/common";

const [createInputFieldContext, getInputFieldContext] = createContextBuilder<InputFieldContext>();
export { createInputFieldContext, getInputFieldContext };

export interface InputFieldContext extends TextAreaContext {
  setTrailingIcon(value: boolean);
  setLeadingIcon(value: boolean);
}

const [createTextAreaContext, getTextAreaContext] = createContextBuilder<TextAreaContext>();
export { createTextAreaContext, getTextAreaContext };

export interface TextAreaContext {
  setHelperTextId(id: string);
}