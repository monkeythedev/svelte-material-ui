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
	export let id: string = `@smui/data-table/DataTable:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// DataTable
	import {
		MDCDataTable,
		MDCDataTableRowSelectionChangedEventDetail,
		SortActionEventDetail,
	} from "@material/data-table";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { SelectableGroup } from "@smui/common/src/hoc";
	import { setDisableCheckboxMDCIstance } from "@smui/checkbox";
	import { getDialogContext } from "@smui/dialog";
	import { createDataTableContext } from "./DataTableContext";
	import { SortEventDetail } from "./";

	// TODO: radio single selection table, figure out how to handle pagination and selection (maybe specific component?), allow sort deactivation.
	export let value: any = undefined;
	export let ariaLabel: string = undefined;

	const dispatch = createEventDispatcher<{
		sort: SortEventDetail;
	}>();
	createDataTableContext({
		syncDom() {
			dataTable?.layout();
		},
	});

	let selectableGroup: SelectableGroup;

	setDisableCheckboxMDCIstance(true);
	const dialogContext$ = getDialogContext();

	let dataTable: MDCDataTable;
	onMount(async () => {
		dataTable = new MDCDataTable(dom);

		dataTable.listen("MDCDataTable:rowSelectionChanged", handleChange);
		dataTable.listen("MDCDataTable:selectedAll", selectAllRows);
		dataTable.listen("MDCDataTable:unselectedAll", unselectAllRows);
		dataTable.listen("MDCDataTable:sorted", handleSort);
	});

	// Redraw on dialog opened
	$: if (dataTable && $dialogContext$?.isOpen) dataTable.layout();

	onDestroy(() => {
		if (dataTable) {
			(dataTable as any).headerRowCheckbox = { destroy() {} }; // Workaround for MDCDataTable bug on destroy
			(dataTable as any).rowCheckboxList = []; // Workaround for MDCDataTable bug on destroy

			dataTable.destroy();
		}
	});

	function handleSort(event: CustomEvent<SortActionEventDetail>) {
		dispatch("sort", event.detail as SortEventDetail);
	}

	function handleChange(
		event: CustomEvent<MDCDataTableRowSelectionChangedEventDetail>
	) {
		selectableGroup.setItemSelected(
			event.detail.rowIndex,
			event.detail.selected
		);
	}

	function selectAllRows() {
		selectableGroup.selectAll();
	}

	function unselectAllRows() {
		selectableGroup.unselectAll();
	}
</script>

<style>
	.smui-data-table__pagination {
		/* Why in hell would MDC put 4px randomly... */
		padding-left: calc(1em - 4px);
	}
</style>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	class={parseClassList([className, 'mdc-data-table'])}
	{style}
	{id}
	use:forwardDOMEvents>
	<SelectableGroup bind:this={selectableGroup} bind:value>
		<table class="mdc-data-table__table" aria-label={ariaLabel}>
			<slot />
		</table>
	</SelectableGroup>

	<slot name="loader" />

	<div class="smui-data-table__pagination">
		<slot name="pagination" />
	</div>
</div>
