import { createContextPropBuilder } from "@smui/common";

export interface CheckboxContext {
  value: any;
}

const [setCheckboxBehaviour, getCheckboxBehaviour] = createContextPropBuilder<CheckboxBehaviour>()
export {setCheckboxBehaviour, getCheckboxBehaviour};

export type CheckboxBehaviour = "data-table-header" | "data-table-row";

const [setDisableCheckboxMDCIstance, getDisableCheckboxMDCIstance] = createContextPropBuilder<boolean>()
export {setDisableCheckboxMDCIstance, getDisableCheckboxMDCIstance};