<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // PrimaryAction
  import { Ripple2, RippleProps } from '@smui/ripple';

  export let ripple: boolean = true;
  export let color: RippleProps["color"] = null;
  export let padded: boolean = false;
  export let tabindex: number = 0;
</script>

{#if ripple}
  <Ripple2 target={dom} unbounded={false} {color}></Ripple2>
{/if}

<div
  bind:this={dom}
  {...props}
  {id}
  class="
    mdc-card__primary-action
    {className}
    {padded ? 'smui-card__primary-action--padded' : ''}
  "
  {style}
  {tabindex}
  use:forwardDOMEvents
><slot></slot></div>