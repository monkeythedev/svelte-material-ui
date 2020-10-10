import { createContextPropBuilder } from "@smui/common/src";

const [setIconBehaviour, getIconBehaviour] = createContextPropBuilder<IconBehaviour>();
export { setIconBehaviour, getIconBehaviour };

type IconBehaviour = "button" | "fab" | "icon-button" | "chip" | "tab";

