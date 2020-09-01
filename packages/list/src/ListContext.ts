import { setContext, getContext, onMount, onDestroy } from "svelte";
import { ContextsStore } from "./ContextsStore";
import { createItemsStore, ItemsStore } from "./ListStores";

const LIST_CONTEXT = {};

export function createListContext(): ListContext {
  const listItems$ = createItemsStore();
  const context: ListContext = {
    listItems$,
  };

  setContext(LIST_CONTEXT, context);
  return context;
}

export function setListContext(context) {
  setContext(LIST_CONTEXT, context);
}

export function getListContext(): ListContext {
  return getContext(LIST_CONTEXT);
}

export interface ListContext {
  listItems$: ItemsStore;
}
