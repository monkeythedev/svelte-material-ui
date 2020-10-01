<script lang="ts">
  import { Use } from "../hooks";

  import { getSelectableContext, SelectableContext } from "./SelectableContext";
  import SelectableImpl from "./SelectableImpl.svelte";

  export let selected: boolean = undefined;
  export let disabled: boolean = undefined;
  export let value: any = undefined;
  export let tabindex: number = undefined;

  let selectable: SelectableImpl;

  const parentContext$ = getSelectableContext();

  // During init, parent values should win over child's
  if (parentContext$) onParentContextUpdate($parentContext$);

  function onComponentUpdate(selected: boolean, value: any) {
    if ($parentContext$.selected !== selected) {
      // $parentContext$?.setSelected(selected);
    }

    if ($parentContext$.value !== value) {
      $parentContext$?.setValue(value);
    }
  }

  function onParentContextUpdate(parentContext: SelectableContext) {
    if (parentContext.selected !== selected) {
      selected = parentContext.selected;
    }

    if (parentContext.value !== value) {
      value = parentContext.value;
    }

    if (parentContext.disabled !== disabled) {
      disabled = parentContext.disabled;
    }

    if (parentContext.tabindex !== tabindex) {
      tabindex = parentContext.tabindex;
    }
  }

  export function setSelected(_selected: boolean) {
    selectable?.setValue(_selected);
  }

  export function setValue(_value: any) {
    selectable?.setValue(_value);
  }

  export function notifyFocus() {
    selectable?.notifyFocus();
  }
</script>

{#if !parentContext$}
  <SelectableImpl
    bind:this={selectable}
    bind:selected
    bind:disabled
    bind:value
    bind:tabindex
    on:change>
    <slot />
  </SelectableImpl>
{:else}
  <Use hook={() => onComponentUpdate(selected, value)} />
  <Use hook={() => onParentContextUpdate($parentContext$)} />
  <slot />
{/if}
