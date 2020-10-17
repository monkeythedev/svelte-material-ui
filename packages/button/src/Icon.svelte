<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLSpanElement | SVGSVGElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // Icon
  export let svg: boolean = false;

  $: props = { ...props, "aria-hidden": true };
</script>

<svelte:options immutable={true} />

{#if svg}
  <svg
    bind:this={dom}
    {...props}
    {id}
    class="mdc-button__icon {className}"
    {style}
    xmlns="http://www.w3.org/2000/svg"
    use:forwardDOMEvents>
    <slot />
  </svg>
{:else}
  <i
    bind:this={dom}
    {...props}
    {id}
    class="{className || 'material-icons'} mdc-button__icon"
    {style}
    use:forwardDOMEvents>
    <slot />
  </i>
{/if}
