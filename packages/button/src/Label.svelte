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

  // Label
</script>

<svelte:options immutable={true} />

<span
  bind:this={dom}
  {...props}
  {id}
  class="mdc-button__label {className}"
  {style}
  use:forwardDOMEvents>
  <slot />
</span>
