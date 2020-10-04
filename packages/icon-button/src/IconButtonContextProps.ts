import { createContextPropBuilder } from "@smui/common";

const [setIconButtonBehaviour, getIconButtonBehaviour] = createContextPropBuilder<IconButtonBehaviour>();
export {setIconButtonBehaviour, getIconButtonBehaviour}

type IconButtonBehaviour =
  | "card:action"
  | "top-app-bar:navigation"
  | "top-app-bar:action";
