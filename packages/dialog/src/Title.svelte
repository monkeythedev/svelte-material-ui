<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Title
  import {H2} from "@smui/common/dom";
</script>

<H2
  bind:dom
  {...props}
  {id}
  class="mdc-dialog__title {className}"
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</H2>
