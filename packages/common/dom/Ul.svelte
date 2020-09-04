<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLUListElement = null;
  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
</script>

<ul {...props} bind:this={dom} class={className} {style} use:forwardDOMEvents>
  <slot />
</ul>
