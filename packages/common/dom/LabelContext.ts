import { createContextPropBuilder } from "../src";

const [setLabelBehaviour, getLabelBehaviour] = createContextPropBuilder<
	LabelBehaviour
>();
export { setLabelBehaviour, getLabelBehaviour };

export type LabelBehaviour = "chip" | "tab" | "image-list";
