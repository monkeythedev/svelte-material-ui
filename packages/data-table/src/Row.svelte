<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLTableRowElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Row
  import { getRowBehaviour, createRowContext } from "./RowContext";
  import { Selectable } from "@smui/common/hoc";

  let behaviour = getRowBehaviour();
  let selected = undefined;

  $: props = { ...props, "aria-selected": selected ? "true" : "false" };
</script>

{#if behaviour === 'header'}
  <tr
    bind:this={dom}
    class="mdc-data-table__header-row {className}"
    {style}
    {...props}>
    <slot />
  </tr>
{:else}
  <Selectable bind:selected>
    <tr
      bind:this={dom}
      class="mdc-data-table__row {className}
        {selected ? 'mdc-data-table__row--selected' : ''}"
      {style}
      {...props}>
      <slot />
    </tr>
  </Selectable>
{/if}
