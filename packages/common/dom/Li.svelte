<script lang="ts" context="module">
  import { RippleableComponentProps, BaseProps } from "./Props";
  export interface LiProps extends RippleableComponentProps, BaseProps {}
</script>

<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLLIElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  export let props: LiProps = {};

  // Li
  import { Ripple } from "@smui/ripple";

  console.log(props);
</script>

<li
  {...props}
  bind:this={dom}
  class={className}
  {style}
  use:forwardDOMEvents
  use:Ripple={props.useRipple}>
  <slot />
</li>
