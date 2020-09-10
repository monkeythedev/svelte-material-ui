import { createContextBuilder } from "@smui/common";
import { RadioContext } from "./RadioContext";

const [createRadioGroupContext, getRadioGroupContext] = createContextBuilder<RadioGroupContext>();
export { createRadioGroupContext, getRadioGroupContext };

export interface RadioGroupContext {
  readonly value: any;
  registerItem(item: RadioContext);
  unregisterItem(item: RadioContext);
  notifySelected(item: RadioContext);
  notifyDeselected(item: RadioContext);
}