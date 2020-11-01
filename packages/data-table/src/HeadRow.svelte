<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/functions";
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/data-table/Row:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// HeadRow
	import { SelectableGroup } from "@smui/common/hoc";
</script>

<SelectableGroup contextOverride$={null}>
	<!-- Workaround to prevent header checkbox to dirty the table SelectableGroup -->
	<tr
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([className, 'mdc-data-table__header-row'])}
		{style}
		use:forwardDOMEvents>
		<slot />
	</tr>
</SelectableGroup>
