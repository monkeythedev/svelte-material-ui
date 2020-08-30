<script lang="ts">
import { createEventDispatcher } from "svelte";

  import { forwardAllDOMEvents } from "../forwardEvents";
  // import { useActions } from "./useActions";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLDivElement = null;
  let className: string = "";
  export { className as class };
  export let style: string = "";
</script>

<span bind:this={dom} use:forwardAllDOMEvents={dispatcher} class={className} {style}>
  <slot />
</span>

<!-- <span bind:this={dom} use:useActions={use} use:forwardEvents {...exclude($$props, ['use'])}>
  <slot />
</span> -->
