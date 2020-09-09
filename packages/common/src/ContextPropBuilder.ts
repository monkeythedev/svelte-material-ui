import { getContext, setContext } from "svelte";

export function createContextPropBuilder<T>() {
  const CONTEXT_ID = {};

  function setContextProp(prop: Partial<T>) {
    setContext(CONTEXT_ID, prop);
  }

  function getContextProp(): T {
    return getContext(CONTEXT_ID);
  }

  return [setContextProp, getContextProp] as [
    SetContextProp<T>,
    GetContextProp<T>
  ];
}

export type SetContextProp<T> = (prop?: Partial<T>) => void;
export type GetContextProp<T> = () => T;
