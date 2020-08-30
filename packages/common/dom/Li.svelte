<script lang="ts">
import { Ripple, RippleProps } from "@smui/ripple";

import { createEventDispatcher } from "svelte";

  // import { get_current_component } from "svelte/internal";
  import { forwardAllDOMEvents } from "../forwardEvents";
  // import { exclude } from "./exclude.js";
  // import { useActions } from "./useActions.js";

  const dispatcher = createEventDispatcher();

  // export let use = [];
  export let dom: HTMLLIElement = null;
  let className: string = "";
  export { className as class };
  export let style: string = "";

  export let useRipple: RippleProps = null;
</script>

<li bind:this={dom} use:forwardAllDOMEvents={dispatcher} use:Ripple={useRipple} class={className} {style}>
  <slot />
</li>

<!-- <li
  use:useActions={use}
  use:forwardAllDOMEvents
  {...exclude($$props, ['use'])}
><slot></slot></li> -->
