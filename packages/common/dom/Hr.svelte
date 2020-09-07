<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLElement = null;
  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
</script>

<hr bind:this={dom} {...props} class={className} {style} use:forwardDOMEvents />
