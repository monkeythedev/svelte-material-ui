import { createContextBuilder } from "./ContextBuilder";
import { ListItemDOMElement } from "./types";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext {
  disabled: boolean;
  selected: boolean;
  tabindex: "0" | "-1";
  dom: ListItemDOMElement
  setTabIndex(tabindex: string): void;
  setDisabled(isDisabled: boolean): void;
  setSelected(selected: boolean): void;
  sendOnSelected(): void;
}