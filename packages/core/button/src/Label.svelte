<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = undefined;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Label
</script>

<svelte:options immutable={true} />

<span
  bind:this={dom}
  {...props}
  {id}
  class="{className || ''} mdc-button__label"
  {style}
  use:forwardDOMEvents>
  <slot />
</span>
