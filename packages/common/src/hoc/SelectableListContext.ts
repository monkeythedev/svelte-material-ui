import { createContextBuilder } from "../context";
import { SelectableContext } from "./SelectableContext";

const [setSelectableListContext, getSelectableListContext] = createContextBuilder<SelectableListContext>();
export {setSelectableListContext, getSelectableListContext};

export interface SelectableListContext {
  readonly value: any;
  notifySelected(itemDeselected: SelectableContext): void;
  notifyUnselected(itemDeselected: SelectableContext): void;
  registerItem(itemDeselected: SelectableContext): void;
  unregisterItem(itemDeselected: SelectableContext): void;
}