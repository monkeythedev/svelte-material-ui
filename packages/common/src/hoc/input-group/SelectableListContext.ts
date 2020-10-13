import { createContextBuilder } from "../../context";
import { SelectableContext } from "../SelectableContext";

const [
  setSelectableListContext,
  getSelectableListContext,
] = createContextBuilder<SelectableListContext>();
export { setSelectableListContext, getSelectableListContext };

export interface SelectableListContext {
  readonly value: any;
  notifyFocus(itemFocused: SelectableContext): void;
  notifySelected(itemSelected: SelectableContext): void;
  notifyUnselected(itemDeselected: SelectableContext): void;
  registerItem(itemDeselected: SelectableContext): void;
  unregisterItem(itemDeselected: SelectableContext): void;
  setValue(newValue: any): void;
  setItemSelected(index: number, selected: boolean): void;
  selectAll(): void;
  unselectAll(): void;
  getItems(): Set<SelectableContext>;
}
