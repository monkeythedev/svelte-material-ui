<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // LineRipple
  import { MDCLineRipple } from "@material/line-ripple";
  import { onMount, onDestroy } from "svelte";

  export let active = false;

  let lineRipple: MDCLineRipple;
  onMount(() => {
    lineRipple = new MDCLineRipple(dom);
  });

  onDestroy(() => {
    lineRipple && lineRipple.destroy();
  });

  export function activate() {
    return lineRipple.activate();
  }

  export function deactivate() {
    return lineRipple.deactivate();
  }

  export function setRippleCenter(xCoordinate: number) {
    return lineRipple.setRippleCenter(xCoordinate);
  }
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-line-ripple {className} {active ? 'mdc-line-ripple--active' : ''}"
  {style}
  use:forwardDOMEvents />
