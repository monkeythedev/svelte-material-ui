<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLButtonElement | HTMLAnchorElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Action
	import { Button, ButtonColor } from "@smui/button";

	export let ripple: boolean = true;
	export let type: ButtonColor = "primary";
</script>

<svelte:options immutable={true} />

<Button
	bind:dom
	{props}
	{id}
	class="{className || ''} {type === 'primary' ? 'mdc-banner__primary-action' : 'mdc-banner__secondary-action'}"
	{style}
	{ripple}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Button>
