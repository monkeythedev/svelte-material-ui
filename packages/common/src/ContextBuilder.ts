import { getContext, setContext } from "svelte";
import { writable, Writable } from "svelte/store";

export function createContextBuilder<T>() {
  const CONTEXT_ID = {};

  function createContext(context: Partial<T> = {}) {
    const context$ = writable(context);
    setContext(CONTEXT_ID, context$);
    return context$;
  }

  function getContextValue(): Writable<T> {
    return getContext(CONTEXT_ID);
  }

  return [createContext, getContextValue] as [
    CreateContext<T>,
    GetContext<T>
  ];
}

export type CreateContext<T> = (context?: Partial<T>) => Writable<Partial<T>>;
export type GetContext<T> = () => Writable<T>;
