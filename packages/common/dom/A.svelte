<script lang="ts">
import { Ripple, RippleProps } from "@smui/ripple";

  import {
    createEventDispatcher,
    get_current_component,
  } from "svelte/internal";
  import { forwardAllDOMEvents } from "../forwardEvents";
  // import { exclude } from ".../exclude.js";
  // import { useActions } from ".../useActions.js";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLAnchorElement = null;
  export let href = "javascript:void(0);";
  let className: string = "";
  export {className as class};
  export let style: string = "";
  export let target: string = "";

  export let disabled: boolean = null;
  
  export let useRipple: RippleProps = null;
</script>

<a
  bind:this={dom}
  use:forwardAllDOMEvents={dispatcher}
  {href}
  class={className}
  use:Ripple={useRipple}
  {style}
  {target}
  {disabled}>
  <slot />
</a>

<!-- <a
  bind:this={dom}
  use:useActions={use}
  use:listenAllDOMEvents={eventsForward}
  {href}
  {...exclude($$props, ['use', 'href'])}>
  <slot />
</a> -->
