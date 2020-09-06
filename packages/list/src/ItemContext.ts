import { createContextBuilder } from "@smui/common";
import { RadioContext } from "@smui/radio/src/RadioContext";
import { ListItemDOMElement } from "./types";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext {
  disabled: boolean;
  selected: boolean;
  tabindex: "0" | "-1";
  dom: ListItemDOMElement;
  value: any;
  setTabIndex(tabindex: string): void;
  setDisabled(isDisabled: boolean): void;
  setSelected(selected: boolean): void;
  sendOnSelected(): void;
  setValue(value: any): void;
}