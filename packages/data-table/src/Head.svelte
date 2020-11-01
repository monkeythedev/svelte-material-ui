<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLDivElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	import { setCheckboxBehaviour } from "@smui/checkbox/src";
	import { setRowBehaviour } from "./RowContext";

	setCheckboxBehaviour("data-table-header");
	setRowBehaviour("header");
</script>

<thead
	bind:this={dom}
	{...props}
	class={className}
	{style}
	use:forwardDOMEvents>
	<slot />
</thead>
