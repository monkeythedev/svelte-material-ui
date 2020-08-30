<script lang="ts">
import { createEventDispatcher } from "svelte";

  import { forwardAllDOMEvents } from "../forwardEvents";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLHRElement = null;
  let className: string = "";
  export { className as class };
  export let style: string = "";
</script>

<hr bind:this={dom} use:forwardAllDOMEvents={dispatcher} class={className} {style} />
