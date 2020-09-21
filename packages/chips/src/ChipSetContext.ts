import { createContextBuilder } from "@smui/common/context";
import { ChipContext } from "./ChipContext";

const [createChipSetContext, getChipSetContext] = createContextBuilder<
  ChipSetContext
>();
export { createChipSetContext, getChipSetContext };

export interface ChipSetContext {
  registerItem(item: ChipContext): void;
  unregisterItem(item: ChipContext): void;
}
