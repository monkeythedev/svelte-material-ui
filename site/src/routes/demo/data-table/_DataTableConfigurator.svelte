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
		SortButton,
		SortEventDetail,
	} from "@smui/core/data-table";
	import { Pagination, PageSize } from "@smui/core/data-table/pagination";
	import { Checkbox } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";
	import {
		Configurator,
		generateSvelteCode,
		indentCode,
	} from "src/components/configurator";

	let allowSelection: boolean;
	let showSelectAll: boolean;

	$: if (!allowSelection) showSelectAll = false;

	let allowSorting: boolean;
	let showLinearProgress: boolean;

	let value: any[] = [];

	let showPagination: boolean;
	let pageIndex: number = undefined;
	let pageSize: number = undefined;

	$: initPagination(showPagination);

	let nameColNumeric: boolean;
	let descColNumeric: boolean;
	let priceColNumeric: boolean = true;

	let svelteCode: string;
	let scssCode: string;

	let allRows: RowData[] = [
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

	let rows: RowData[];

	$: svelteCode = generateSvelteCode({
		tag: "DataTable",
		props: [
			`aria-label="Items List"`,
			[allowSorting, `on:sort={handleSort}`],
			[allowSelection, `bind:value`],
		],
		content: `
			${getHeadCode(
				allowSelection,
				showSelectAll,
				allowSorting,
				nameColNumeric,
				descColNumeric,
				priceColNumeric
			)}
			${getBodyCode(
				allowSelection,
				nameColNumeric,
				descColNumeric,
				priceColNumeric,
				showPagination
			)}
			${getLinearProgressCode(showLinearProgress)}
			${getPaginationCode(showPagination)}
		`,
	});

	function getHeadCode(
		allowSelectionValue: typeof allowSelection,
		showSelectAllValue: typeof showSelectAll,
		allowSortingValue: typeof allowSorting,
		nameColNumericValue: typeof nameColNumeric,
		descColNumericValue: typeof descColNumeric,
		priceColNumericValue: typeof priceColNumeric
	) {
		function selectAllCode() {
			if (allowSelectionValue) {
				return `
					<HeadCell checkbox>
						<Checkbox${!showSelectAllValue ? ` style="display: none;"` : ""}/>
					</HeadCell>
				`;
			} else {
				return "";
			}
		}

		function colCode(label: string, numeric: boolean) {
			const labelCode = `<Label>${label}</Label>`;
			const sortCode = allowSorting ? `<SortButton />` : "";
			return `
						${numeric ? sortCode : labelCode}
						${numeric ? labelCode : sortCode}
			`;
		}

		return `
			<Head>
				<HeadRow>
					${selectAllCode()}
					<HeadCell${allowSortingValue ? ` columnId="name"` : ""}${
			nameColNumericValue ? " numeric" : ""
		}>
						${colCode("Name", nameColNumeric)}
					</HeadCell>
					<HeadCell${allowSortingValue ? ` columnId="description"` : ""}${
			descColNumeric ? " numeric" : ""
		}>
						${colCode("Description", descColNumericValue)}
					</HeadCell>
					<HeadCell${allowSortingValue ? ` columnId="price"` : ""}${
			priceColNumeric ? " numeric" : ""
		}>
						${colCode("Price", priceColNumericValue)}
					</HeadCell>
				</HeadRow>
			</Head>
		`;
	}

	function getBodyCode(
		allowSelectionValue: typeof allowSelection,
		nameColNumericValue: typeof nameColNumeric,
		descColNumericValue: typeof descColNumeric,
		priceColNumericValue: typeof priceColNumeric,
		showPaginationValue: typeof showPagination
	) {
		function selectRowCode() {
			if (allowSelectionValue) {
				return `
						<Cell checkbox>
							<Checkbox />
						</Cell>
				`;
			} else {
				return "";
			}
		}

		return `
			<Body>
				{#each ${
					showPaginationValue
						? `rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)`
						: "rows"
				} as row (row.name)}
					<Row${allowSelectionValue ? ` value={row.name}` : ""}>
						${selectRowCode()}
						<Cell${nameColNumericValue ? ` numeric` : ""}>{row.name}</Cell>
						<Cell${descColNumericValue ? ` numeric` : ""}>{row.description}</Cell>
						<Cell${priceColNumericValue ? ` numeric` : ""}>{row.price}</Cell>
					</Row>
				{/each}
			</Body>
		`;
	}

	function getLinearProgressCode(
		showLinearProgressValue: typeof showLinearProgress
	) {
		return showLinearProgressValue
			? `
			<div slot="loader">
				<LinearProgress ariaLabel="Loading data..." />
			</div>
		`
			: "";
	}

	function getPaginationCode(showPaginationValue: typeof showPagination) {
		return showPaginationValue
			? `
			<div slot="pagination">
				<Pagination length={rows.length} bind:pageIndex bind:pageSize>
					<div slot="pageSize">
						<PageSize pageSizeOptions={[4, 8, 12]}>Rows per page</PageSize>
					</div>
					<div slot="counter" let:first let:end let:length>
						{first}‑{end} of {length}
					</div>
				</Pagination>
			</div>
		`
			: "";
	}

	function initPagination(showPaginationValue: typeof showPagination) {
		if (showPaginationValue) {
			allowSelection = false;
			pageIndex = undefined;
			pageSize = undefined;
			rows = [...allRows];
		} else {
			pageIndex = 0;
			pageSize = 4;
			rows = allRows.slice(0, 4);
		}
	}

	function sort(sortData: SortEventDetail) {
		rows = rows.sort((a, b) => {
			if (a[sortData.columnId] > b[sortData.columnId]) return 1;
			else if (a[sortData.columnId] < b[sortData.columnId]) return -1;
			else return 0;
		});

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
							<Checkbox style={!showSelectAll ? 'display: none;' : ''} />
						</HeadCell>
					{/if}
					<HeadCell columnId="name" numeric={nameColNumeric}>
						{#if nameColNumeric}
							{#if allowSorting}
								<SortButton />
							{/if}
							<Label>Name</Label>
						{:else}
							<Label>Name</Label>
							{#if allowSorting}
								<SortButton />
							{/if}
						{/if}
					</HeadCell>
					<HeadCell columnId="description" numeric={descColNumeric}>
						{#if descColNumeric}
							{#if allowSorting}
								<SortButton />
							{/if}
							<Label>Description</Label>
						{:else}
							<Label>Description</Label>
							{#if allowSorting}
								<SortButton />
							{/if}
						{/if}
					</HeadCell>
					<HeadCell columnId="price" numeric={priceColNumeric}>
						{#if priceColNumeric}
							{#if allowSorting}
								<SortButton />
							{/if}
							<Label>Price</Label>
						{:else}
							<Label>Price</Label>
							{#if allowSorting}
								<SortButton />
							{/if}
						{/if}
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
							<Cell numeric={nameColNumeric}>{row.name}</Cell>
							<Cell numeric={descColNumeric}>{row.description}</Cell>
							<Cell numeric={priceColNumeric}>{row.price}</Cell>
						</Row>
					{/each}
				{/if}
			</Body>
			<div slot="loader">
				{#if showLinearProgress}
					<LinearProgress ariaLabel="Loading data..." />
				{/if}
			</div>
			<div slot="pagination">
				{#if showPagination}
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
				{/if}
			</div>
		</DataTable>
	</div>
	<div slot="values">
		{#if allowSelection}value: {`[${value.join(', ')}]`}{/if}
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div>
			<FormField>
				<Checkbox bind:checked={allowSelection} disabled={showPagination} />
				<span slot="label">Allow selection</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showSelectAll} disabled={!allowSelection} />
				<span slot="label">Show select all</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={allowSorting} />
				<span slot="label">Allow sortimg</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showLinearProgress} />
				<span slot="label">Show linear progress</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showPagination} />
				<span slot="label">Show pagination</span>
			</FormField>
		</div>
		<div style="grid-column: span 2">
			<FormField>
				<Checkbox bind:checked={nameColNumeric} />
				<span slot="label">Name column is numeric</span>
			</FormField>
			<FormField>
				<Checkbox bind:checked={descColNumeric} />
				<span slot="label">Description column is numeric</span>
			</FormField>
			<FormField>
				<Checkbox bind:checked={priceColNumeric} />
				<span slot="label">Price column is numeric</span>
			</FormField>
		</div>
	</div>
</Configurator>
