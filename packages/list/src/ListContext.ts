import { ItemContext } from "./ItemContext";
import { createContextBuilder } from "@smui/common";
import { MDCList } from '@material/list'

const [createListContext, getListContext] = createContextBuilder<ListContext>();
export { createListContext, getListContext };

export interface ListContext {
  listItems: Set<ItemContext>;
  role: ListRole;
  isNav: boolean;
  list: MDCList;
  notifyFocus(item: ItemContext): void;
  notifySelected(item: ItemContext): void;
  notifyDeselected(item: ItemContext): void;
}

export type ListRole = "listbox" | "radiogroup" | "group" | "list" | "menu";
