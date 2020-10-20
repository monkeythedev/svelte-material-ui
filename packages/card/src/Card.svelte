<script context="module" lang="ts">
	export type CardVariant = "raised" | "outlined";
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/functions";
	import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Card
	export let variant: CardVariant = "raised";
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-card',
		[variant === 'outlined', 'mdc-card--outlined'],
	])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
