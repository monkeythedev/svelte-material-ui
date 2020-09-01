<script lang="ts" context="module">
  import { BaseProps, RippleableComponentProps } from "./Props";

  export interface ButtonProps extends RippleableComponentProps, BaseProps {
    disabled?: boolean;
  }

  export type XXX = "";
  export interface ASD {};
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
  import { Ripple } from "@smui/ripple/bare";
</script>

<button
  {...props}
  bind:this={dom}
  class="{className}"
  {style}
  use:forwardDOMEvents
  use:Ripple={props.useRipple}>
  <slot />
</button>