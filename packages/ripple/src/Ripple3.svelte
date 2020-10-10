<script lang="ts">
  import { Use } from "@smui/common/hooks";
  import { UseRipple } from ".";
  import { RippleProps } from "./Ripple";

  export let target: HTMLElement;
  export let unbounded: RippleProps["unbounded"] = undefined;
  export let color: RippleProps["color"] = undefined;
  export let classForward: RippleProps["classForward"] = undefined;
  export let keyboardEvents: RippleProps["keyboardEvents"] = undefined;
  export let rippleElement: RippleProps["rippleElement"] = undefined;
  let className = "";
  export { className as class };

  let dom: HTMLSpanElement;
  let rippleInstance: UseRipple;

  function init() {
    if (!target) {
      target = dom.parentElement;
    }
  }

  export function reinstantiate() {
    rippleInstance.reinstantiate();
  }
</script>

<style>
  .smui-ripple-ghost {
    display: none;
  }
</style>

<svelte:options immutable={true} />

<Use effect once hook={init} when={!!dom} />

<UseRipple
  bind:this={rippleInstance}
  bind:target
  bind:unbounded
  bind:color
  bind:classForward
  bind:keyboardEvents
  bind:class={className} />

{#if !rippleElement}<span bind:this={dom} class="smui-ripple-ghost" />{/if}
{#if target}
  {#if rippleElement}<span bind:this={dom} class={rippleElement} />{/if}
{/if}
