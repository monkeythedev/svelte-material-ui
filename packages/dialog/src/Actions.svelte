<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Actions
  import { Footer } from "@smui/common/dom";
</script>

<Footer
  bind:dom
  {...props}
  class="mdc-dialog__actions {className}"
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</Footer>
