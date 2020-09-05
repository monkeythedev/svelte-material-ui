<script lang="ts">
  import { createEventDispatcher } from "svelte";
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLDivElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
</script>

<nav bind:this={dom} {...props} class={className} {style} use:forwardDOMEvents >
  <slot />
</nav>
