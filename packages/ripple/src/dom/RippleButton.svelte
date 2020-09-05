<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLLIElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps;

  // RippleButton
  import { RippleProps } from "../Ripple";
  import Ripple from "../Ripple.svelte";
  import { Button } from "@smui/common/dom";

  export let rippleProps: Omit<RippleProps, "component">;
</script>

<Ripple
  props={{ ...props }}
  bind:dom
  on:domEvent={forwardDOMEvents}
  class={className}
  {style}
  rippleProps={{...rippleProps, component: Button}}>
  <slot />
</Ripple>