<script lang="ts">
  import { setSelectableListContext } from "./";
  import { SelectableContext, SelectionType } from "../";
  import UseInputGroup from "./UseInputGroup.svelte";
  import {
    getSelectableListContext,
    SelectableListContext,
  } from "./SelectableListContext";
  import { Writable } from "svelte/store";
  import { Use } from "../../hooks";

  export let value: any = undefined;
  export let selectionType: SelectionType = "multi";
  export let indexHasValues: boolean = undefined;
  export let contextOverride$: Writable<SelectableListContext> = undefined;

  let inputGroup: UseInputGroup;

  const parentContext$ = getSelectableListContext();

  if (parentContext$ && contextOverride$ === undefined) {
    contextOverride$ = parentContext$;
  }

  let context$: Writable<SelectableListContext>;
  if (contextOverride$) {
    context$ = setSelectableListContext({
      notifyFocus(itemFocused: SelectableContext) {
        $contextOverride$.notifyFocus(itemFocused);
      },
      registerItem(item: SelectableContext) {
        $contextOverride$.registerItem(item);
      },
      unregisterItem(item: SelectableContext) {
        $contextOverride$.unregisterItem(item);
      },
      notifySelected(itemSelected: SelectableContext) {
        $contextOverride$.notifySelected(itemSelected);
      },
      notifyUnselected(itemDeselected: SelectableContext) {
        $contextOverride$.notifyUnselected(itemDeselected);
      },
      setValue(newValue: any) {
        $contextOverride$.setValue(newValue);
      },
      setItemSelected(index: number, selected: boolean) {
        $contextOverride$.setItemSelected(index, selected);
      },
      selectAll() {
        $contextOverride$.selectAll();
      },
      unselectAll() {
        $contextOverride$.unselectAll();
      },
      getItems() {
        return $contextOverride$.getItems();
      },
      value: $contextOverride$.value,
    });
  } else {
    context$ = setSelectableListContext({
      notifyFocus(itemFocused: SelectableContext) {
        inputGroup?.notifyFocus(itemFocused);
      },
      registerItem(item: SelectableContext) {
        inputGroup?.registerItem(item);
      },
      unregisterItem(item: SelectableContext) {
        inputGroup?.unregisterItem(item);
      },
      notifySelected(itemSelected: SelectableContext) {
        inputGroup?.notifySelected(itemSelected);
      },
      notifyUnselected(itemDeselected: SelectableContext) {
        inputGroup?.notifyUnselected(itemDeselected);
      },
      setValue(newValue: any) {
        inputGroup?.setValue(newValue);
      },
      setItemSelected(index: number, selected: boolean) {
        inputGroup?.setItemSelected(index, selected);
      },
      selectAll() {
        inputGroup?.selectAll();
      },
      unselectAll() {
        inputGroup?.unselectAll();
      },
      getItems() {
        return inputGroup?.getItems();
      },
      value,
    });
  }

  $: $context$ = { ...$context$, value };

  function onSelfUpdated(newValue: typeof value) {
    $contextOverride$?.setValue(newValue);
  }

  function onContextOverrideUpdate(contextOverride: SelectableListContext) {
    if (contextOverride.value !== value) {
      value = contextOverride.value;
    }
  }

  export function setValue(newValue: any) {
    $context$.setValue(newValue);
  }

  export function setItemSelected(index: number, selected: boolean) {
    $context$.setItemSelected(index, selected);
  }

  export function selectAll() {
    $context$.selectAll();
  }

  export function unselectAll() {
    $context$.unselectAll();
  }

  export function getItems(): Set<SelectableContext> {
    return $context$.getItems();
  }

  export function getContext(): Writable<SelectableListContext> {
    return context$;
  }
</script>

{#if parentContext$}
  <Use hook={() => onSelfUpdated(value)} />
  <Use hook={() => onContextOverrideUpdate($contextOverride$)} />
{:else}
  <UseInputGroup
    bind:this={inputGroup}
    bind:value
    bind:selectionType
    bind:indexHasValues />
{/if}

<slot />
