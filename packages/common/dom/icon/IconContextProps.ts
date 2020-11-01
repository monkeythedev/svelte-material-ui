import { createContextPropBuilder } from "../../context";

const [setIconBehaviour, getIconBehaviour] = createContextPropBuilder<
	IconBehaviour
>();
export { setIconBehaviour, getIconBehaviour };

type IconBehaviour = "fab" | "tab";
