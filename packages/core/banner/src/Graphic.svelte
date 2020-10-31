<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Graphic
  export let alt: string = "";
</script>

<svelte:options immutable={true} />

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-banner__graphic {className}"
  {style}
  role="img"
  {alt}
  use:forwardDOMEvents>
  <slot />
</div>
