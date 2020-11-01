<script context="module" lang="ts">
	export type AspectRatio = "square" | "16x9";
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/functions";
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Media
	export let aspectRatio: AspectRatio = "square";
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-card__media',
		[aspectRatio === 'square', 'mdc-card__media--square'],
		[aspectRatio === '16x9', 'mdc-card__media--16-9'],
	])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
