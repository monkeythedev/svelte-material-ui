<script context="module" lang="ts">
  export type GraphicType = "icon" | "svg" | "img";
  export type GraphicElement =
    | HTMLSpanElement
    | SVGSVGElement
    | HTMLImageElement;
</script>

<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: GraphicElement = undefined;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // Icon
  import { parseClassList } from "../functions";

  export let type: GraphicType = "icon";
  export let ariaHidden: boolean = undefined;

  $: props = { ...props, "aria-hidden": ariaHidden };
</script>

<svelte:options immutable={true} />

{#if type === 'svg'}
  <svg
    bind:this={dom}
    {...props}
    {id}
    class={className}
    {style}
    xmlns="http://www.w3.org/2000/svg"
    use:forwardDOMEvents>
    <slot />
  </svg>
{:else if type === 'icon'}
  <i
    bind:this={dom}
    {...props}
    {id}
    class={parseClassList([
      [className === undefined, 'material-icons'],
      className,
    ])}
    {style}
    use:forwardDOMEvents>
    <slot />
  </i>
{:else if type === 'img'}
  <img
    bind:this={dom}
    {...props}
    alt={props.alt}
    {id}
    class={className}
    {style}
    use:forwardDOMEvents />
{/if}
