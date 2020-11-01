<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;

	export let dom: HTMLAnchorElement | HTMLButtonElement = undefined;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// IconButton
	//#region imports
	import { MDCIconButtonToggle } from "@material/icon-button";
	import { onDestroy, onMount } from "svelte";
	import IconButton from "./IconButton.svelte";
	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let title:
		| string
		| {
				on: string;
				off: string;
		  } = undefined;
	//#endregion

	let toggleButton: MDCIconButtonToggle;
	onMount(() => {
		toggleButton = new MDCIconButtonToggle(dom);
		if (!ripple) {
			toggleButton.ripple.destroy();
		}

		toggleButton.listen(
			"MDCIconButtonToggle:change",
			(event: CustomEvent<{ isOn: boolean }>) => {
				active = event.detail.isOn;
			}
		);
	});

	$: {
		// On pressed change
		if (toggleButton && toggleButton.on !== active) {
			toggleButton.on = active;
		}
	}

	onDestroy(() => {
		toggleButton && toggleButton.destroy();
	});

	$: props = {
		...props,
		"data-aria-label-on":
			props["data-aria-label-on"] || typeof title === "string"
				? title
				: title?.on,
		"data-aria-label-off":
			props["data-aria-label-off"] || typeof title === "string"
				? title
				: title?.off,
	};
</script>

<svelte:options immutable={true} />

<IconButton
	bind:dom
	{props}
	class={className}
	{style}
	on:domEvent={forwardDOMEvents}
	{disabled}
	title={typeof title === 'string' ? title : active ? title && title.on : title && title.off}
	ripple={false}>
	<slot />
</IconButton>
