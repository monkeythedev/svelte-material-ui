import { createContextBuilder } from "../../context";
import { SelectableContext } from "../selectable/SelectableContext";

const [
  setSelectableGroupContext,
  getSelectableGroupContext,
] = createContextBuilder<SelectableGroupContext>();
export { setSelectableGroupContext, getSelectableGroupContext };

export interface SelectableGroupContext {
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
