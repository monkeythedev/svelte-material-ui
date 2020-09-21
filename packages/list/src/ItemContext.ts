import { createContextBuilder } from "@smui/common";
import { ListItemDOMElement } from "./types";
import { SelectableContext } from "@smui/common/hoc";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext extends SelectableContext {
  dom: ListItemDOMElement;
  sendOnSelected(): void;
}
