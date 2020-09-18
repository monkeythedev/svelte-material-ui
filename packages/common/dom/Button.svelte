<script lang="ts" context="module">
  import { BaseProps } from "./Props";

  export interface ButtonProps extends BaseProps {
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
  export let id: string = "";

  // Button
</script>

<button
  bind:this={dom}
  {...props}
  {id}
  class={className}
  {style}
  use:forwardDOMEvents>
  <slot />
</button>
