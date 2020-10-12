import { createContextBuilder, createContextPropBuilder } from "@smui/common";
import { ListItemDOMElement } from "../";
import { SelectableContext } from "@smui/common/hoc";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext extends SelectableContext {
  dom: ListItemDOMElement;
  sendOnSelected(): void;
}

export const [
  setIsSelectionGroup,
  getIsSelectionGroup,
] = createContextPropBuilder<boolean>();