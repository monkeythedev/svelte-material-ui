import { createContextBuilder } from "@smui/common";

const [createHelperTextContext, getHelperTextContext] = createContextBuilder<HelperTextContext>();
export { createHelperTextContext, getHelperTextContext };

export interface HelperTextContext {
  readonly id: string
}