<script lang="ts">
  import { domEventsForwarder } from "@smui/common/events/forwardEvents";
  import Li from "@smui/common/Li.svelte";
  import Hr from "@smui/common/dom/Hr.svelte";
  import { get_current_component } from "svelte/internal";
  import { forwardEventsBuilder } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { useActions } from "@smui/common/useActions.js";

  const forwardDOMEvents = domEventsForwarder();

  let className = "";
  export { className as class };
  export let dom: HTMLLIElement | HTMLHRElement;
  export let group = false;
  export let nav = false;
  export let padded = false;
  export let inset = false;

  const component = group || nav ? Hr : Li;

  $: props = exclude($$props, [
    "use",
    "class",
    "group",
    "nav",
    "padded",
    "inset",
  ]);
</script>

<svelte:component
  this={component}
  bind:dom
  on:domEvent={forwardDOMEvents}
  class=" mdc-list-divider {className}
  {padded ? 'mdc-list-divider--padded' : ''}
  {inset ? 'mdc-list-divider--inset' : ''}"
  role={component === Li ? 'separator' : null} />

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
