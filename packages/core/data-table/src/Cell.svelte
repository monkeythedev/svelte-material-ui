<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/src/functions";
	import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/data-table/Cell:${count++}`;

	export let dom: HTMLTableCellElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Cell
	import { getRowBehaviour } from "./RowContext";
	import { onMount } from "svelte";
	import { getDataTableContext } from "./DataTableContext";

	export let numeric: boolean = false;
	export let checkbox: boolean = false;

	const dataTableContext$ = getDataTableContext();

	onMount(() => {
		if (checkbox) {
			// This will prevent MDCDataTable to broke itself if previously there was no checkbox
			$dataTableContext$?.syncDom();
		}
	});
</script>

<td
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-data-table__cell',
		[numeric, 'mdc-data-table__cell--numeric'],
		[checkbox, 'mdc-data-table__cell--checkbox'],
	])}
	{style}
	use:forwardDOMEvents>
	<slot />
</td>

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
