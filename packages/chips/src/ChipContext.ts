import { MDCChip } from "@material/chips";
import { createContextBuilder } from "@smui/common";

export const [createChipContext, getChipContext] = createContextBuilder<
	ChipContext
>();

export interface ChipContext {
	chip: MDCChip;
	dom: HTMLDivElement;
	selected: boolean;
	setChip(chip: MDCChip): void;
	reinitializeMDC(): void;
}
