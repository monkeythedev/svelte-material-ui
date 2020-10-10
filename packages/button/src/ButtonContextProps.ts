import { createContextPropBuilder } from "@smui/common";

const [setButtonBehaviour, getButtonBehaviour] = createContextPropBuilder<
  ButtonBehaviour
>();
export { setButtonBehaviour, getButtonBehaviour };

type ButtonBehaviour =
  | "card:action"
  | "dialog:action"
  | "top-app-bar:navigation"
  | "top-app-bar:action"
  | "snackbar"
  | "banner:action";
