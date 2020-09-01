<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLSpanElement = null;
  export let props: any = {};

  // Graphic
  import { Span } from "@smui/common/dom";
  export let icon: boolean = false;
</script>

<Span
  {...props}
  bind:dom
  class="mdc-list-item__graphic {icon ? "material-icons" : ""} {className}"
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</Span>
