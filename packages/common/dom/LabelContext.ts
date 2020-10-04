import { createContextPropBuilder } from "../src";

const [setLabelBehaviour, getLabelBehaviour] = createContextPropBuilder<
  LabelBehaviour
>();
export { setLabelBehaviour, getLabelBehaviour };

export type LabelBehaviour =
  | "button"
  | "fab"
  | "chip"
  | "tab"
  | "image-list";
