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

	// PrimaryAction
	import { UseRipple, RippleProps } from "@smui/ripple";

	export let ripple: boolean = true;
	export let color: RippleProps["color"] = undefined;
	export let padded: boolean = false;
	export let tabindex: number = 0;
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-card__primary-action',
		[padded, 'smui-card__primary-action--padded'],
	])}
	{style}
	{tabindex}
	use:forwardDOMEvents>
	<slot />
</div>

{#if ripple}
	<UseRipple target={dom} {color} />
{/if}
