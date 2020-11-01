<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "@smui/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: GraphicElement = undefined;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};

	// Icon
	import {
		Graphic,
		GraphicElement,
		GraphicType,
	} from "@smui/common/components";
	import { parseClassList } from "@smui/common/functions";

	export let type: GraphicType = "icon";

	$: props = {
		...props,
		"aria-hidden": true,
	};
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		'mdc-button__icon',
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Graphic>
