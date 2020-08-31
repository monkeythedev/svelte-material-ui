<script lang="ts">
  // Base component
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLHeadingElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";
  export let props: any = {};
</script>

<h4
  bind:this={dom}
  class="{className}"
  {style}
  use:forwardDOMEvents
  {...props}>
  <slot />
</h4>
