<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Item
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-image-list__supporting {className}"
  {style}
  use:forwardDOMEvents>
  <slot />
</div>
