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
  import { SelectableList } from "@smui/common/src/hoc";

  export let value: any = undefined;

  let behaviour = getRowBehaviour();
  let selected = undefined;

  $: props = { ...props, "aria-selected": selected ? "true" : "false" };
</script>

{#if behaviour === 'header'}
  <SelectableList>
    <!-- Workaround to prevent header checkbox to dirty the table SelectableList -->
    <tr
      bind:this={dom}
      class="mdc-data-table__header-row {className}"
      {style}
      {...props}>
      <slot />
    </tr>
  </SelectableList>
{:else}
  <Selectable bind:selected bind:value>
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
