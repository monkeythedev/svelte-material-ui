<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLDivElement = null;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};

	// Drawer
	import { MDCDrawer } from "@material/drawer";
	import {
		onMount,
		onDestroy,
		afterUpdate,
		setContext,
		createEventDispatcher,
	} from "svelte";
	import { createDrawerContext } from "./DrawerContext";
	import { DrawerVariant } from "./types";

	export let variant: DrawerVariant = null;
	export let open: boolean = false;

	const context$ = createDrawerContext();
	$: $context$ = { ...$context$, variant };

	$: if (drawer && drawer.open !== open) {
		drawer.open = open;
	}

	let drawer;
	onMount(() => {
		if (variant === "dismissible" || variant === "modal") {
			drawer = new MDCDrawer(dom);
			drawer.listen("MDCDrawer:opened", updateOpen);
			drawer.listen("MDCDrawer:closed", updateOpen);
		}
	});

	onDestroy(() => {
		drawer && drawer.destroy();
	});

	afterUpdate(() => {
		// if (drawer && !(variant === "dismissible" || variant === "modal")) {
		//   drawer.destroy();
		//   drawer = undefined;
		// } else if (!drawer && (variant === "dismissible" || variant === "modal")) {
		//   drawer = new MDCDrawer(dom);
		//   drawer.listen("MDCDrawer:opened", updateOpen);
		//   drawer.listen("MDCDrawer:closed", updateOpen);
		// }
	});

	function updateOpen() {
		open = drawer.open;
	}

	export function setOpen(value) {
		open = value;
	}
</script>

<aside
	{...props}
	bind:this={dom}
	use:forwardDOMEvents
	class="mdc-drawer {className}
    {variant === 'dismissible' ? 'mdc-drawer--dismissible' : ''}
    {variant === 'modal' ? 'mdc-drawer--modal' : ''}"
	{style}>
	<slot />
</aside>

<!-- <aside
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class=" mdc-drawer {className}
  {variant === 'dismissible' ? 'mdc-drawer--dismissible' : ''}
  {variant === 'modal' ? 'mdc-drawer--modal' : ''}
  "
  on:MDCDrawer:opened={updateOpen}
  on:MDCDrawer:closed={updateOpen}
  {...exclude($$props, ['use', 'class', 'variant', 'open'])}>
  <slot />
</aside> -->
