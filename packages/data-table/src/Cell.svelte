<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLTableHeaderCellElement | HTMLTableDataCellElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Cell
  import { getRowBehaviour } from "./RowContext";
  import { Th, Td } from "@smui/common/dom";

  const behaviour = getRowBehaviour();

  const role = behaviour === "header" ? "columnheader" : undefined;
  const scope = behaviour === "header" ? "col" : undefined;
  export let numeric: boolean = false;
  export let checkbox: boolean = false;

  const component = behaviour === "header" ? Th : Td;
</script>

<svelte:component
  this={component}
  bind:dom
  props={{ ...props, role, scope }}
  class="{behaviour === 'header' ? 'mdc-data-table__header-cell' : 'mdc-data-table__cell'}
    {className}
    {behaviour === 'header' && checkbox ? 'mdc-data-table__header-cell--checkbox' : ''}
    {behaviour !== 'header' && numeric ? 'mdc-data-table__cell--numeric' : ''}
    {behaviour !== 'header' && checkbox ? 'mdc-data-table__cell--checkbox' : ''}"
  {style}>
  <slot />
</svelte:component>

<!-- {#if header}
  <th
    use:useActions={use}
    use:forwardEvents
    class="
      mdc-data-table__header-cell
      {className}
      {checkbox ? 'mdc-data-table__header-cell--checkbox' : ''}
    "
    {...roleProp}
    {...scopeProp}
    {...props}
  ><slot></slot></th>
{:else}
  <td
    use:useActions={use}
    use:forwardEvents
    class="
      mdc-data-table__cell
      {className}
      {numeric ? 'mdc-data-table__cell--numeric' : ''}
      {checkbox ? 'mdc-data-table__cell--checkbox' : ''}
    "
    {...roleProp}
    {...scopeProp}
    {...props}
  ><slot></slot></td>
{/if} -->
