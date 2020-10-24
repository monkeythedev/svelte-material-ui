<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
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
	import { parseClassList } from "@smui/common/src/functions";
	import { onMount, tick } from "svelte";
	import { getChipContext } from "./ChipContext";
	import { getChipSetContext } from "./ChipSetContext";

	export let type: GraphicType = "icon";
	export let removeOnClick: boolean = false;

	const chipContext$ = getChipContext();
	const chipSetContext$ = getChipSetContext();

	let leadingHidden: boolean = $chipContext$.selected;
	let leading: boolean = false;
	let trailing: boolean = false;

	onMount(() => {
		const chipElement = dom.parentElement;
		const chipChildren = Array.from(chipElement.children);
		const chipText = chipChildren.find(
			(child) => child.getAttribute("role") === "gridcell"
		);
		const chipTextIndex = chipChildren.indexOf(chipText);
		const selfIndex = chipChildren.indexOf(dom);

		if (selfIndex < chipTextIndex) {
			leading = true;
		} else {
			trailing = true;
		}

		tick().then(() => {
			$chipContext$?.reinitializeMDC();
		});
	});

	$: leadingHidden =
		$chipContext$.selected && $chipSetContext$.variant === "filter";
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		'mdc-chip__icon',
		[type === 'icon' && className == undefined, 'material-icons'],
		[leading, 'mdc-chip__icon--leading'],
		[leadingHidden, 'mdc-chip__icon--leading-hidden'],
		[trailing, 'mdc-chip__icon--trailing mdc-chip-trailing-action'],
	])}
	{style}
	{type}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Graphic>
