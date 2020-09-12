import { ItemContext } from "./ItemContext";
import { createContextBuilder } from "@smui/common";
import { MDCList } from '@material/list'
import { SelectableListContext } from "@smui/common/hoc";

const [createListContext, getListContext] = createContextBuilder<ListContext>();
export { createListContext, getListContext };

export interface ListContext extends SelectableListContext {
  role: ListRole;
  isNav: boolean;
  list: MDCList;
  notifyFocus(item: ItemContext): void;
  registerItem(item: ItemContext): void;
  unregisterItem(item: ItemContext): void;
}

export type ListRole = "listbox" | "radiogroup" | "group" | "list" | "menu";
