<script lang="ts" context="module">
  export interface ButtonProps {
    disabled?: boolean;
  }
</script>

<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLButtonElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  export let props: ButtonProps = {};

  // Button
  import { Ripple, RippleProps } from "@smui/ripple/bare";
  export let useRipple: RippleProps = null;
</script>

<button
  {...props}
  bind:this={dom}
  class="{className}"
  {style}
  use:forwardDOMEvents
  use:Ripple={useRipple}>
  <slot />
</button>