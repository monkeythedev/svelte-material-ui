<script lang="ts" context="module">
	import { A, Button } from "@smui/common/dom";
	export type ButtonComponent = typeof Button | typeof A;
	export type ButtonVariant = "raised" | "unelevated" | "outlined";
	export type ButtonColor = "primary" | "secondary";
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLButtonElement | HTMLAnchorElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Button
	//#region imports
	import { Ripple3 } from "@smui/ripple";
	import { UseState } from "@smui/common/hooks";
	import { tick } from "svelte";
	import { getButtonBehaviour } from "./";
	import { parseClassList } from "@smui/common/src/functions";
	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = undefined;
	export let disabled: boolean = false;
	export let density: number = undefined;
	export let href: string = undefined;
	export let target: string = undefined;
	//#endregion

	//#region Internal variables
	const behaviour = getButtonBehaviour();
	let rippleInstance: Ripple3;
	let rippleClasses: string;
	let component: typeof Button | typeof A;

	$: {
		// Set component
		component = href == null || disabled ? Button : A;
	}

	$: {
		// Force valid density
		if (density > 3) density = 3;
		else if (density < 0) density = 0;
	}
	//#endregion

	function onComponentChanged() {
		tick().then(() => {
			rippleInstance.reinstantiate();
		});
	}
</script>

<svelte:options immutable={true} />

<UseState value={component} onUpdate={onComponentChanged} />

<svelte:component
	this={component}
	bind:dom
	props={{ ...props, disabled, target, href }}
	{id}
	class={parseClassList([
		className,
		'mdc-button',
		[variant, `mdc-button--${variant}`],
		[color === 'secondary', 'smui-button--color-secondary'],
		[density != null, `smui-button--dense--${density}`],
		[behaviour === 'card:action', 'mdc-card__action mdc-card__action--button'],
		[behaviour === 'top-app-bar:action', 'mdc-top-app-bar__action-item'],
		rippleClasses,
	])}
	{style}
	on:domEvent={forwardDOMEvents}>
	{#if ripple}
		<Ripple3
			bind:this={rippleInstance}
			rippleElement="mdc-button__ripple"
			bind:rippleClasses
			target={dom} />
	{/if}
	<slot />
</svelte:component>
