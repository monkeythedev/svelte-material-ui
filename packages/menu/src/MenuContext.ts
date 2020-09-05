import { createContextBuilder } from "@smui/common";

const [createMenuContext, getMenuContext] = createContextBuilder<MenuContext>();
export { createMenuContext, getMenuContext };

export interface MenuContext {

}