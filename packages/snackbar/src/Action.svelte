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
	import { Button, ButtonVariant, ButtonColor } from "@smui/button";
	import A from "@smui/common/dom/A.svelte";

	//#region exports
	export let ripple: boolean = undefined;
	export let color: ButtonColor = undefined;
	export let variant: ButtonVariant = undefined;
	export let disabled: boolean = undefined;
	export let density: number = undefined;
	export let href: string = undefined;
	export let target: string = undefined;
	//#endregion
</script>

<svelte:options immutable={true} />

<Button
	bind:dom
	props={{ ...props, type: 'button' }}
	{id}
	class="{className || ''} mdc-button mdc-snackbar__action"
	{style}
	{ripple}
	{color}
	{variant}
	{href}
	{disabled}
	{target}
	{density}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Button>
