<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// TabScroller
	import { MDCTabScroller } from "@material/tab-scroller";
	import { onMount, onDestroy } from "svelte";
	import { getCreateMDCTabScrollerInstance } from "./TabScrollerContext";

	let instantiate = getCreateMDCTabScrollerInstance();

	let tabScroller: MDCTabScroller;
	onMount(async () => {
		if (instantiate !== false) {
			tabScroller = new MDCTabScroller(dom);
		}
	});

	onDestroy(() => {
		tabScroller && tabScroller.destroy();
	});

	export function scrollTo(scrollX: number) {
		return tabScroller.scrollTo(scrollX);
	}

	export function incrementScroll(scrollXIncrement: number) {
		return tabScroller.incrementScroll(scrollXIncrement);
	}

	export function getScrollPosition() {
		return tabScroller.getScrollPosition();
	}

	export function getScrollContentWidth() {
		return tabScroller.getScrollContentWidth();
	}
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class="mdc-tab-scroller {className}"
	{style}
	use:forwardDOMEvents>
	<div class="mdc-tab-scroller__scroll-area">
		<div class="mdc-tab-scroller__scroll-content">
			<slot />
		</div>
	</div>
</div>
