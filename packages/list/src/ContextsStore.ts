import { Readable, Writable, writable } from "svelte/store";

export function createContextsStoreBuilder<T>(): () => ContextsStore<Writable<T>> {
  return function createContextsStore(): ContextsStore<Writable<T>> {
    const { subscribe, update } = writable<(Writable<T>)[]>([]);

    return {
      subscribe,
      add(item: Writable<T>) {
        update((items) => {
          if (!~items.indexOf(item)) {
            items = [...items, item];
          }

          return items;
        });
      },
      remove(item: Writable<T>) {
        update((items) => {
          const index = items.indexOf(item);
          if (~index) {
            items = [...items.splice(index, 1)];
          }

          return items;
        });
      },
    };
  };
}

export interface ContextsStore<T> extends Readable<(T)[]> {
  add(item: T);
  remove(item: T);
}
