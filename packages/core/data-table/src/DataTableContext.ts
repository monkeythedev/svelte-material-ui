import { createContextBuilder } from "@smui/common";

export const [
	createDataTableContext,
	getDataTableContext,
] = createContextBuilder<DataTableContext>();

interface DataTableContext {
	syncDom(): void;
}
