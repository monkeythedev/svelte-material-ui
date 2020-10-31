import { createContextBuilder, createContextPropBuilder } from "@smui/common";

const [createMenuSurfaceContext, getMenuSurfaceContext] = createContextBuilder<MenuSurfaceContext>();
export { createMenuSurfaceContext, getMenuSurfaceContext };

export const [setCreateMDCMenuSurfaceInstance, getCreateMDCMenuSurfaceInstance] = createContextPropBuilder<boolean>();

export interface MenuSurfaceContext {
  open: boolean;
}