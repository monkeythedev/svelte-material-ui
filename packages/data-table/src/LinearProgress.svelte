<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/src/functions";
	import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/data-table/LinearProgress:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Cell
	import {
		LinearProgress,
		setCreateMDCLinearProgressInstance,
	} from "@smui/linear-progress";

	setCreateMDCLinearProgressInstance(false);
</script>

<LinearProgress
	bind:dom
	{props}
	{id}
	class={parseClassList([className, 'mdc-data-table__linear-progress'])}
	{style}
	indeterminate
	on:domEvent={forwardDOMEvents} />
