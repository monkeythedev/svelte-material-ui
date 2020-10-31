<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLImageElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Image
  export let src: string;
  export let alt: string = null;
</script>

<img
  bind:this={dom}
  {...props}
  {id}
  {src}
  {alt}
  class="mdc-image-list__image {className}"
  {style}
  use:forwardDOMEvents />
