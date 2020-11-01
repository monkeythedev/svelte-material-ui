<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLAnchorElement | HTMLButtonElement = null;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Section
	import { setIconButtonBehaviour } from "@smui/icon-button";
	import { setButtonBehaviour } from "@smui/button";

	export let align = "start";
	export let toolbar = false;

	setButtonBehaviour("top-app-bar:action");
	setIconButtonBehaviour(
		toolbar ? "top-app-bar:action" : "top-app-bar:navigation"
	);
</script>

<section
	bind:this={dom}
	{...props}
	class="mdc-top-app-bar__section {className}
    {align === 'start' ? 'mdc-top-app-bar__section--align-start' : ''}
    {align === 'end' ? 'mdc-top-app-bar__section--align-end' : ''}"
	{style}
	use:forwardDOMEvents
	{...toolbar ? { role: 'toolbar' } : {}}>
	<slot />
</section>

<!-- <section
  use:useActions={use}
  use:forwardEvents
  class=" mdc-top-app-bar__section {className}
  {align === 'start' ? 'mdc-top-app-bar__section--align-start' : ''}
  {align === 'end' ? 'mdc-top-app-bar__section--align-end' : ''}
  "
  {...toolbar ? { role: 'toolbar' } : {}}
  {...exclude($$props, ['use', 'class', 'align', 'toolbar'])}>
  <slot />
</section> -->
