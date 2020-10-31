import { createContextBuilder } from "@smui/common/context";
import { ChipContext } from "./ChipContext";
import { ChipSetVariant } from "./types";

export const [createChipSetContext, getChipSetContext] = createContextBuilder<
	ChipSetContext
>();

export interface ChipSetContext {
	readonly variant: ChipSetVariant;
	registerItem(item: ChipContext): void;
	unregisterItem(item: ChipContext): void;
}
