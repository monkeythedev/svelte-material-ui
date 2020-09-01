<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLHeadingElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
</script>

<div {...props} bind:this={dom} class={className} {style} use:forwardDOMEvents>
  <slot />
</div>
