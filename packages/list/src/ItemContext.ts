import { ContextId, createContextBuilder } from "./ContextBuilder";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext extends ContextId {
  disabled: boolean;
  selected: boolean;
  tabindex: "0" | "-1";
  setTabIndex(tabindex: string): void;
}