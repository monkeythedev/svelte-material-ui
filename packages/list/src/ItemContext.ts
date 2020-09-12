import { createContextBuilder } from "@smui/common";
import { ListItemDOMElement } from "./types";
import { SelectableContext } from "@smui/common/hoc";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext extends SelectableContext {
  disabled: boolean;
  tabindex: "0" | "-1";
  dom: ListItemDOMElement;
  setTabIndex(tabindex: string): void;
  setDisabled(isDisabled: boolean): void;
  sendOnSelected(): void;
}