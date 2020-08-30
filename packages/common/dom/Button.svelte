<script lang="ts">
  import { forwardAllDOMEvents } from "../forwardEvents";
  import { Ripple, RippleProps } from "@smui/ripple/bare";
import { createEventDispatcher } from "svelte";
  // import { exclude } from "./exclude.js";
  // import { useActions } from "./useActions.js";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLButtonElement = null;
  let className: string = "";
  export { className as class };
  export let style: string = "";

  export let disabled: boolean = null;

  export let useRipple: RippleProps = null;
</script>

<button
  bind:this={dom}
  use:forwardAllDOMEvents={dispatcher}
  class={className}
  use:Ripple={useRipple}
  {style}
  {disabled}>
  <slot />
</button>

<!-- <button bind:this={dom} use:useActions={use} use:forwardAllDOMEvents {...exclude($$props, ['use'])}>
  <slot />
</button> -->
