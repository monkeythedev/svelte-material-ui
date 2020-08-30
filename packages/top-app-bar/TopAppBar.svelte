<script lang="ts">
  import { MDCTopAppBar } from "@material/top-app-bar";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { forwardAllDOMEvents } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { useActions } from "@smui/common/useActions.js";

  const dispatch = createEventDispatcher();

  export let use = [];
  let className = "";
  export { className as class };
  export let variant = "standard";
  export let color = "primary";
  export let collapsed = false;
  export let prominent = false;
  export let dense = false;

  let dom;
  let topAppBar;

  onMount(() => {
    topAppBar = new MDCTopAppBar(dom);
  });

  onDestroy(() => {
    topAppBar && topAppBar.destroy();
  });
</script>

<header
  bind:this={dom}
  use:useActions={use}
  use:forwardAllDOMEvents={dispatch}
  class=" mdc-top-app-bar {className}
  {variant === 'short' ? 'mdc-top-app-bar--short' : ''}
  {collapsed ? 'mdc-top-app-bar--short-collapsed' : ''}
  {variant === 'fixed' ? 'mdc-top-app-bar--fixed' : ''}
  {variant === 'static' ? 'smui-top-app-bar--static' : ''}
  {color === 'secondary' ? 'smui-top-app-bar--color-secondary' : ''}
  {prominent ? 'mdc-top-app-bar--prominent' : ''}
  {dense ? 'mdc-top-app-bar--dense' : ''}
  ">
  <slot />
</header>
