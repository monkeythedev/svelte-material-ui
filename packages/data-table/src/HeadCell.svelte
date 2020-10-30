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
	export let id: string = `@smui/data-table/HeaderCell:${count++}`;

	export let dom: HTMLTableHeaderCellElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// HeadCell
	import { onMount } from "svelte";
	import {
		getDataTableContext,
		createHeadCellContext,
		SortDirection,
	} from "./";
	import { Icon, IconButton } from "@smui/icon-button";

	export let numeric: boolean = false;
	export let checkbox: boolean = false;
	//export let sort: "ascending" | "descending" | "none" = undefined;
	export let sortAriaLabel: string = undefined;
	export let columnId: string = undefined;

	let sort: boolean = false;
	let sortDirection: SortDirection = "none";

	const dataTableContext$ = getDataTableContext();
	createHeadCellContext({
		setSort(enabled: boolean) {
			sort = enabled;
		},
		setSortDirection(direction: SortDirection) {
			sortDirection = direction;
		},
	});

	onMount(() => {
		if (checkbox) {
			// This will prevent MDCDataTable to broke itself if previously there was no checkbox
			$dataTableContext$?.syncDom();
		}
	});
</script>

<th
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-data-table__header-cell',
		[sort, 'mdc-data-table__header-cell--with-sort'],
		[
			sort && (sortDirection === 'ascending' || sortDirection == 'descending'),
			'mdc-data-table__header-cell--sorted',
		],
		[checkbox, 'mdc-data-table__header-cell--checkbox'],
		[numeric, 'mdc-data-table__header-cell--numeric'],
	])}
	{style}
	role="columnheader"
	scope="col"
	aria-sort={sort}
	data-column-id={columnId || id}
	use:forwardDOMEvents>
	<div class="mdc-data-table__header-cell-wrapper">
		<slot />
	</div>
</th>

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
