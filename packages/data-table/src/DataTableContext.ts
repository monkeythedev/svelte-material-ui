import { createContextBuilder } from "@smui/common";

const [createDataTableContext, getDataTableContext] = createContextBuilder<DataTableContext>();
export { createDataTableContext, getDataTableContext };

export interface DataTableContext {}