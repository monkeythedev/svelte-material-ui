import { createContextBuilder } from "@smui/common/context";
import { MDCChip } from '@material/chips';

const [createChipSetContext, getChipSetContext] = createContextBuilder<
  ChipSetContext
>();
export { createChipSetContext, getChipSetContext };

export interface ChipContext {
  chip: MDCChip;
  setChip(chip: MDCChip): void;
}

export interface ChipSetContext {
  registerItem(item: ChipContext): void;
  unregisterItem(item: ChipContext): void;
}
