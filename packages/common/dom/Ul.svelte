<script lang="ts">
import { createEventDispatcher } from "svelte";

  import { forwardAllDOMEvents } from "../forwardEvents";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLUListElement = null;
  let className: string = "";
  export { className as class };
  export let style: string = "";
</script>

<ul bind:this={dom} use:forwardAllDOMEvents={dispatcher} class={className} {style}>
  <slot />
</ul>
