import { getContext, setContext } from "svelte";

export function createContextBuilder<T extends ContextId>() {
  const CONTEXT_ID = {};

  function createContext() {
    const __id = {};

    return function setContextValue(value: T) {
      const context = {
        ...value,
        __id,
      };
      setContext(CONTEXT_ID, context);
      return context;
    };
  }

  function getContextValue(): T {
    return getContext(CONTEXT_ID);
  }

  return [createContext, getContextValue] as [
    typeof createContext,
    typeof getContextValue
  ];
}

export interface ContextId {
  __id?: {};
}
