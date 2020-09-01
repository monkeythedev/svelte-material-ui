import { Readable, writable } from "svelte/store";
import { ContextId } from "./ContextBuilder";

export function createContextsStoreBuilder<T extends ContextId>(): () => ContextsStore<T> {
  return function createContextsStore(): ContextsStore<T> {
    const { subscribe, update } = writable<(T)[]>([]);

    function find(items: (T)[], id) {
      return items.find((item) => item.__id === id);
    }

    return {
      subscribe,
      add(item: T) {
        update((items) => {
          if (!find(items, item.__id)) {
            items = [...items, item];
          }

          return items;
        });
      },
      update(item: T) {
        update((items) => {
          const index = items.indexOf(find(items, item.__id));
          if (~index) {
            items[index] = item;
            items = [...items];
          }

          return items;
        });
      },
      remove(item: T) {
        update((items) => {
          const index = items.indexOf(find(items, item.__id));
          if (~index) {
            items = [...items.splice(index, 1)];
          }

          return items;
        });
      },
    };
  };
}

export interface ContextsStore<T extends ContextId> extends Readable<(T)[]> {
  add(item: T);
  update(item: T);
  remove(item: T);
}
