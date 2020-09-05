<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLLIElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
</script>

<li bind:this={dom} {...props} class={className} {style} use:forwardDOMEvents>
  <slot />
</li>
