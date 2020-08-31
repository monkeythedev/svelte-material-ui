<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLDivElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  export let props: any = {};

  // Group
  export let variant = "";
</script>

<div
  {...props}
  bind:this={dom}
  class="smui-button__group {className}
  {variant === 'raised' ? 'smui-button__group--raised' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</div>