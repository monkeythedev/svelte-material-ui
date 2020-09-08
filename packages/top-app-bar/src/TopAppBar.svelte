<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // TopAppBar
  import { MDCTopAppBar } from "@material/top-app-bar";
  import { onMount, onDestroy } from "svelte";

  export let variant: "standard" | "short" | "fixed" | "static" = "standard" ;
  export let color: "primary" | "secondary" = "primary";
  export let collapsed: boolean = false;
  export let prominent: boolean = false;
  export let dense: boolean = false;

  let topAppBar: MDCTopAppBar;

  onMount(() => {
    topAppBar = new MDCTopAppBar(dom);
  });

  onDestroy(() => {
    topAppBar && topAppBar.destroy();
  });
</script>

<header
  bind:this={dom}
  {...props}
  class=" mdc-top-app-bar {className}
    {variant === 'short' ? 'mdc-top-app-bar--short' : ''}
    {collapsed ? 'mdc-top-app-bar--short-collapsed' : ''}
    {variant === 'fixed' ? 'mdc-top-app-bar--fixed' : ''}
    {variant === 'static' ? 'smui-top-app-bar--static' : ''}
    {color === 'secondary' ? 'smui-top-app-bar--color-secondary' : ''}
    {prominent ? 'mdc-top-app-bar--prominent' : ''}
    {dense ? 'mdc-top-app-bar--dense' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</header>

<!-- <header
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
</header> -->
