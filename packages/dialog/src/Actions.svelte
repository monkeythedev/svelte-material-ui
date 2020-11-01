<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/dialog/Actions:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Actions
</script>

<svelte:options immutable={true} />

<footer
	bind:this={dom}
	{...props}
	{id}
	class="mdc-dialog__actions {className}"
	{style}
	use:forwardDOMEvents>
	<slot />
</footer>
