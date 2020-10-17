import { createContextPropBuilder } from "@smui/common/src";

const [setIconBehaviour, getIconBehaviour] = createContextPropBuilder<
  IconBehaviour
>();
export { setIconBehaviour, getIconBehaviour };

type IconBehaviour = "fab" | "chip" | "tab";
