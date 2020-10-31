<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/src/functions";
	import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/dialog/Title:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Title
	import { getDialogContext } from "./DialogContext";

	const dialogContext$ = getDialogContext();

	$: $dialogContext$.setTitleId(id);
</script>

<svelte:options immutable={true} />

<h2
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-dialog__title'])}
	{style}
	use:forwardDOMEvents>
	<slot />
</h2>
