import { createContextPropBuilder } from "@smui/common/src";

const [setIconStyle, getIconStyle] = createContextPropBuilder<IconStyle>();
export { setIconStyle, getIconStyle };

type IconStyle = "button" | "fab" | "icon-button" | "chip" | "tab";

