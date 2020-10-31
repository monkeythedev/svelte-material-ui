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

	// Actions
	import { setIconButtonBehaviour } from "@smui/icon-button";
	import { setButtonBehaviour } from "@smui/button";

	export let fullBleed: boolean = false;

	setButtonBehaviour("card:action");
	setIconButtonBehaviour("card:action");
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-card__actions',
		[fullBleed, 'mdc-card__actions--full-bleed'],
	])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
