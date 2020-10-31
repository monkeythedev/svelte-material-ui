import { createContextPropBuilder, createContextBuilder } from "@smui/common";

const [setRowBehaviour, getRowBehaviour] = createContextPropBuilder<
  RowBehaviour
>();
export { setRowBehaviour, getRowBehaviour };

export type RowBehaviour = "header";

const [createRowContext, getRowContext] = createContextBuilder<RowContext>();
export { createRowContext, getRowContext };

export interface RowContext {
  setSelected(selected: boolean): void
}