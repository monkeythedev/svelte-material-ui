import { createContextBuilder } from "@smui/common";
import { DrawerVariant } from "./Drawer.svelte";

const [createDrawerContext, getDrawerContext] = createContextBuilder<DrawerContext>();
export { createDrawerContext, getDrawerContext };

export interface DrawerContext {
  variant: DrawerVariant
}