<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLButtonElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Tab
	import { MDCTabIndicator } from "@material/tab-indicator";
	import { onMount, onDestroy } from "svelte";
	import { getCreateMDCTabIndicatorInstance } from "./";

	export let active: boolean = false;
	export let type = "underline";
	export let transition = "slide";

	let instantiate = getCreateMDCTabIndicatorInstance();

	let tabIndicator: MDCTabIndicator;
	onMount(async () => {
		if (instantiate !== false) {
			tabIndicator = new MDCTabIndicator(dom);
		}
	});

	onDestroy(() => {
		tabIndicator && tabIndicator.destroy();
	});

	export function activate(previousIndicatorClientRect?: ClientRect) {
		return tabIndicator.activate(previousIndicatorClientRect);
	}

	export function deactivate() {
		return tabIndicator.deactivate();
	}

	export function computeContentClientRect() {
		return tabIndicator.computeContentClientRect();
	}
</script>

<span
	bind:this={dom}
	{...props}
	{id}
	class="
    mdc-tab-indicator
    {className}
    {active ? 'mdc-tab-indicator--active' : ''}
    {transition === 'fade' ? 'mdc-tab-indicator--fade' : ''}
  "
	{style}
	use:forwardDOMEvents>
	<span
		class="
      mdc-tab-indicator__content
      {type === 'underline' ? 'mdc-tab-indicator__content--underline' : ''}
      {type === 'icon' ? 'mdc-tab-indicator__content--icon' : ''}
    "
		aria-hidden={type === 'icon' ? 'true' : 'false'}><slot /></span>
</span>
