<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/functions";
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-card__action-icons'])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
