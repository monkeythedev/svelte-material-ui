<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLAnchorElement | HTMLButtonElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// IconButton
	import { Graphic, GraphicType } from "@smui/common/components";
	import { parseClassList } from "@smui/common/functions";

	export let on: boolean = false;
	export let type: GraphicType = "icon";
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		'mdc-icon-button__icon',
		[type === 'icon' && className == undefined, 'material-icons'],
		[on, 'mdc-icon-button__icon--on'],
	])}
	{style}
	{type}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Graphic>
