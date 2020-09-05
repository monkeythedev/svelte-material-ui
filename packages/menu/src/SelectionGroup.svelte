<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLLIElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // Selection group
  export let list$class: string = "";
  export let list$style: string = "";
</script>

<li
  {...props}
  class={className}
  {style}
  bind:this={dom}
  use:forwardDOMEvents>
  <ul class="mdc-menu__selection-group {list$class}" style={list$style}>
    <slot />
  </ul>
</li>
