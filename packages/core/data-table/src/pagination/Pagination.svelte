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
	export let id: string = `@smui/data-table/pagination/Pagination:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Pagination
	import { IconButton, Icon } from "@smui/icon-button";
	import { createPaginationContext } from "./PaginationContext";

	export let pageSize: number = $$slots.pageSize ? undefined : 10;
	export let pageIndex: number = 0;
	export let length: number = 0;
	export let firstPageBtn: boolean = true;
	export let lastPageBtn: boolean = true;

	$: if (pageSize < 0) pageSize = 0;
	$: if (pageIndex < 0) pageIndex = 0;
	$: if (length < 0) length = 0;
	$: lastPageIndex = parseInt("" + length / pageSize);
	$: if (pageIndex > lastPageIndex) pageIndex = lastPageIndex;
	$: remainingItemsLength = length - (pageIndex + 1) * pageSize;

	createPaginationContext({
		setPageSize(newValue: typeof pageSize) {
			pageSize = newValue;
		},
	});

	function setPageSize(value: number) {
		pageSize = value;
	}
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-data-table__pagination'])}
	{style}
	use:forwardDOMEvents>
	<div class="mdc-data-table__pagination-trailing">
		<slot name="pageSize" {setPageSize} />

		<div class="mdc-data-table__pagination-navigation">
			<div class="mdc-data-table__pagination-total">
				<slot
					name="counter"
					first={pageIndex * pageSize + 1}
					end={(pageIndex + 1) * pageSize}
					{length}
					pages={lastPageIndex + 1}
					page={pageIndex + 1} />
			</div>
			{#if firstPageBtn}
				<IconButton
					class="mdc-data-table__pagination-button"
					props={{ 'data-first-page': 'true' }}
					disabled={pageIndex === 0}
					on:click={() => (pageIndex = 0)}>
					<Icon>first_page</Icon>
				</IconButton>
			{/if}
			<IconButton
				class="mdc-data-table__pagination-button"
				props={{ 'data-prev-page': 'true' }}
				disabled={pageIndex === 0}
				on:click={() => pageIndex--}>
				<Icon>chevron_left</Icon>
			</IconButton>
			<IconButton
				class="mdc-data-table__pagination-button"
				props={{ 'data-next-page': 'true' }}
				disabled={remainingItemsLength <= 0}
				on:click={() => pageIndex++}>
				<Icon>chevron_right</Icon>
			</IconButton>
			{#if lastPageBtn}
				<IconButton
					class="mdc-data-table__pagination-button"
					props={{ 'data-last-page': 'true' }}
					disabled={remainingItemsLength <= 0}
					on:click={() => (pageIndex = lastPageIndex)}>
					<Icon>last_page</Icon>
				</IconButton>
			{/if}
		</div>
	</div>
</div>
