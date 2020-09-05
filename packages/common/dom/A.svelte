<script lang="ts" context="module">
  export interface AProps {
    target?: string;
    href?: string;
  }
</script>

<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLAnchorElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  export let props: AProps = {
    href: "javascript:void(0)"
  };

  // Button
  import { Ripple, RippleProps } from "@smui/ripple/src";
  export let useRipple: RippleProps = null;
</script>

<a
  {...props}
  href={props.href}
  bind:this={dom}
  class="{className}"
  {style}
  use:forwardDOMEvents
  use:Ripple={useRipple}>
  <slot />
</a>