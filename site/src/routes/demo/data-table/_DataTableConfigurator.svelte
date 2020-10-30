<script lang="ts">
	import {
		DataTable,
		Head,
		Body,
		Row,
		Cell,
		LinearProgress,
		HeadCell,
		HeadRow,
		Label,
		SortButton
	} from "@smui/data-table";
	import { Pagination, PageSize } from "@smui/data-table/pagination";
	import { Checkbox } from "@smui/checkbox";
	import { FormField } from "@smui/form-field";
	import { Configurator } from "src/components/configurator";
	import { SortEventDetail } from "@smui/data-table/src/DataTable.svelte";

	let allowSelection: boolean;
	let value: any[] = [];
	let pageIndex: number = undefined;
	let pageSize: number = undefined;

	let svelteCode: string;
	let scssCode: string;

	let rows: RowData[] = [
		{
			name: "Broom",
			description: "A wooden handled broom.",
			price: 15,
		},
		{
			name: "Dust Pan",
			description: "A plastic dust pan.",
			price: 8,
		},
		{
			name: "Mop",
			description: "A strong, durable mop.",
			price: 18,
		},
		{
			name: "Bucket",
			description: "A metal bucket.",
			price: 13,
		},
		{
			name: "Ray Gun",
			description: "An alien artifact.",
			price: 99.99,
		},
		{
			name: "Big gun",
			description: "To kick asses.",
			price: 50,
		},
		{
			name: "Compound V",
			description: "To get nice and strong.",
			price: 14.03,
		},
		{
			name: "Script Hook",
			description: "To shape the world like The Matrix.",
			price: 13,
		},
		{
			name: "Riff",
			description: "Lot of people will follows you.",
			price: 5,
		},
	];

	function sort(sortData: SortEventDetail) {
		if (sortData.columnId === "name") {
			rows = rows.sort((a, b) => {
				if (a.name > b.name) return 1;
				else if (a.name < b.name) return -1;
				else return 0;
			});
		}

		if (sortData.sortValue === "ascending") {
			rows = [...rows];
		} else if (sortData.sortValue === "descending") {
			rows = [...rows.reverse()];
		}
	}

	interface RowData {
		name: string;
		description: string;
		price: number;
		selected?: boolean;
	}
</script>

<svelte:options immutable={true} />

<Configurator {svelteCode} {scssCode}>
	<div slot="preview">
		<DataTable
			ariaLabel="Items list"
			bind:value
			on:sort={(event) => sort(event.detail)}>
			<Head>
				<HeadRow>
					{#if allowSelection}
						<HeadCell checkbox>
							<Checkbox />
						</HeadCell>
					{/if}
					<HeadCell columnId="name">
						<Label>Name</Label>
						<SortButton />
					</HeadCell>
					<HeadCell>
						<Label>Description</Label>
						<SortButton />
					</HeadCell>
					<HeadCell numeric>
						<SortButton />
						<Label>Price</Label>
					</HeadCell>
				</HeadRow>
			</Head>
			<Body>
				{#if pageIndex != null && pageSize != null}
					{#each rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize) as row (row.name)}
						<Row value={row.name}>
							{#if allowSelection}
								<Cell checkbox>
									<Checkbox />
								</Cell>
							{/if}
							<Cell>{row.name}</Cell>
							<Cell>{row.description}</Cell>
							<Cell numeric>{row.price}</Cell>
						</Row>
					{/each}
				{/if}
			</Body>
			<div slot="loader">
				<LinearProgress ariaLabel={'Loading data...'} />
			</div>
			<div slot="pagination">
				<Pagination length={rows.length} bind:pageIndex bind:pageSize>
					<div slot="pageSize">
						<PageSize pageSizeOptions={[4, 8, 12]}>Rows per page</PageSize>
					</div>
					<div slot="counter" let:first let:end let:length>
						{first}‑{end}
						of
						{length}
					</div>
				</Pagination>
			</div>
		</DataTable>
	</div>
	<div slot="values">
		{#if allowSelection}value: {`[${value.join(', ')}]`}{/if}
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div style="grid-column: span 2;">ChipSet</div>
		<div>
			<FormField>
				<Checkbox bind:checked={allowSelection} />
				<span slot="label">Allow selection</span>
			</FormField>
		</div>
	</div>
</Configurator>
