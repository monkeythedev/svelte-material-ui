import { createContextBuilder } from "../context";

const [setSelectableContext, getSelectableContext] = createContextBuilder<SelectableContext>();
export {setSelectableContext, getSelectableContext};

export interface SelectableContext {
  readonly value: any;
  readonly selected: boolean;
  setSelected(selected: boolean): void;
  setValue(value: any): void;
}