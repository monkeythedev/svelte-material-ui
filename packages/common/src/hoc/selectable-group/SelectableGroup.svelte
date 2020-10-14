<script context="module" lang="ts">
  let count = 0;
</script>

<script lang="ts">
  import { SelectableContext, SelectionType } from "../";
  import {UseSelectableGroup} from "./";
  import {
    getSelectableGroupContext,
    SelectableGroupContext,
    setSelectableGroupContext
  } from "./SelectableGroupContext";
  import { Writable } from "svelte/store";
  import { Use, UseState } from "../../hooks";

  export let value: any = undefined;
  export let selectionType: SelectionType = "multi";
  export let indexHasValues: boolean = undefined;
  export let contextOverride$: Writable<SelectableGroupContext> = undefined;
  
  let id = "SelectableGroup-" + count++;
  let selectableGroup: UseSelectableGroup;

  const parentContext$ = getSelectableGroupContext();
  if (parentContext$ && contextOverride$ === undefined) {
    contextOverride$ = parentContext$;
  }

  let context$: Writable<SelectableGroupContext>;
  if (contextOverride$) {
    context$ = setSelectableGroupContext({
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
      value: $contextOverride$?.value,
    });
  } else {
    context$ = setSelectableGroupContext({
      notifyFocus(itemFocused: SelectableContext) {
        selectableGroup?.notifyFocus(itemFocused);
      },
      registerItem(item: SelectableContext) {
        selectableGroup?.registerItem(item);
      },
      unregisterItem(item: SelectableContext) {
        selectableGroup?.unregisterItem?.(item);
      },
      notifySelected(itemSelected: SelectableContext) {
        selectableGroup?.notifySelected(itemSelected);
      },
      notifyUnselected(itemDeselected: SelectableContext) {
        selectableGroup?.notifyUnselected(itemDeselected);
      },
      setValue(newValue: any) {
        selectableGroup?.setValue(newValue);
      },
      setItemSelected(index: number, selected: boolean) {
        selectableGroup?.setItemSelected(index, selected);
      },
      selectAll() {
        selectableGroup?.selectAll();
      },
      unselectAll() {
        selectableGroup?.unselectAll();
      },
      getItems() {
        return selectableGroup?.getItems();
      },
      value,
    });
  }

  $: if (contextOverride$) {
    $context$ = { ...$context$, value: $contextOverride$.value };
  } else {
    $context$ = { ...$context$, value };
  }

  function onSelfUpdated() {
    $contextOverride$?.setValue(value);
  }

  function onContextOverrideUpdate(contextOverride: SelectableGroupContext) {
    if (contextOverride && contextOverride.value !== value) {
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

  export function getContext(): Writable<SelectableGroupContext> {
    return context$;
  }
</script>

{#if parentContext$}
  <UseState {value} onUpdate={onSelfUpdated} />
  <Use effect hook={() => onContextOverrideUpdate($contextOverride$)} />
{:else}
  <UseSelectableGroup
    bind:this={selectableGroup}
    bind:value
    bind:selectionType
    bind:indexHasValues
    on:change />
{/if}

<slot />
