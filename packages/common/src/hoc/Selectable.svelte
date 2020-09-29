<script lang="ts">
  import {
    getSelectableContext,
  } from "./SelectableContext";
  import SelectableImpl from "./SelectableImpl.svelte";

  export let selected: boolean = undefined;
  export let disabled: boolean = undefined;
  export let value: any = undefined;
  export let tabindex: number = undefined;

  let selectable: SelectableImpl;

  const parentContext$ = getSelectableContext();

  $: $parentContext$?.setSelected(selected);

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
  <SelectableImpl bind:this={selectable} bind:selected bind:disabled bind:value bind:tabindex on:change>
    <slot />
  </SelectableImpl>
{:else}
  <slot />
{/if}
