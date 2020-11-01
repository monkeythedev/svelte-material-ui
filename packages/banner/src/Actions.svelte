<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Actions
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class="mdc-banner__actions {className}"
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
