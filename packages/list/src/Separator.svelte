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
	import { Li, Hr } from "@smui/common/dom";

	export let group: boolean = false;
	export let nav: boolean = false;
	export let padded: boolean = false;
	export let inset: boolean = false;

	const component = group || nav ? Hr : Li;
</script>

<svelte:component
	this={component}
	bind:dom
	props={{ ...props, role: component === Li ? 'separator' : null }}
	on:domEvent={forwardDOMEvents}
	class=" mdc-list-divider {className}
  {padded ? 'mdc-list-divider--padded' : ''}
  {inset ? 'mdc-list-divider--inset' : ''}"
	{style} />

<!-- {#if group || nav}
  <hr
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-divider {className}
    {padded ? 'mdc-list-divider--padded' : ''}
    {inset ? 'mdc-list-divider--inset' : ''}
    "
    {...props} />
{:else}
  <li
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-divider {className}
    {padded ? 'mdc-list-divider--padded' : ''}
    {inset ? 'mdc-list-divider--inset' : ''}
    "
    role="separator"
    {...props} />
{/if} -->
