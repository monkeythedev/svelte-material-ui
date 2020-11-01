<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "@smui/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLButtonElement | HTMLAnchorElement = null;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};

	// Separator
	import { H1, H2, H3, H4, H5, H6 } from "@smui/common/dom";

	const component:
		| typeof H1
		| typeof H2
		| typeof H3
		| typeof H4
		| typeof H5
		| typeof H6 = H3;
</script>

<svelte:component
	this={component}
	bind:dom
	props={{ ...props }}
	class="mdc-list-group__subheader {className}"
	{style}
	on:domEvent={forwardDOMEvents} />
