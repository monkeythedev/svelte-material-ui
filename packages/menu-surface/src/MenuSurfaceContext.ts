import { createContextBuilder } from "@smui/common";

const [createMenuSurfaceContext, getMenuSurfaceContext] = createContextBuilder<MenuSurfaceContext>();
export { createMenuSurfaceContext, getMenuSurfaceContext };

export interface MenuSurfaceContext {
  open: boolean;
}