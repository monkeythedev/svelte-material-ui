import { createContextBuilder } from "@smui/common";

const [createDialogContext, getDialogContext] = createContextBuilder<
	DialogContext
>();
export { createDialogContext, getDialogContext };

export interface DialogContext {
	readonly isOpen: boolean;
	setTitleId(titleId: string): void;
	setContentId(contentId: string): void;
}
