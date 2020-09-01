import { createContextsStoreBuilder } from "./ContextsStore";
import { ItemContext } from "./ItemContext";

export const createItemsStore = createContextsStoreBuilder<ItemContext>();
export type ItemsStore = ReturnType<typeof createItemsStore>;