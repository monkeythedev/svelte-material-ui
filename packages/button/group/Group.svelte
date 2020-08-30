<script lang="ts">
  import { forwardAllDOMEvents } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { useActions } from "@smui/common/useActions.js";
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLDivElement = null;
  export let use = [];
  let className = "";
  export { className as class };
  export let variant = "text";
</script>

<div
  bind:this={dom}
  use:useActions={use}
  use:forwardAllDOMEvents={dispatcher}
  class=" smui-button__group {className}
  {variant === 'raised' ? 'smui-button__group--raised' : ''}
  "
  {...exclude($$props, ['use', 'class', 'variant'])}>
  <slot />
</div>
