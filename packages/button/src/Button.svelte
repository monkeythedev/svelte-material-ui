<script lang="ts" context="module">
  import { A, Button } from "@smui/common/dom";
  export type ButtonComponent = typeof Button | typeof A;
  export type ButtonVariant = "raised" | "unelevated" | "outlined";
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLButtonElement | HTMLAnchorElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Button
  import { getButtonBehaviour } from "./ButtonContextProps";
  import { Ripple3 } from "@smui/ripple";
  import { UseState } from "@smui/common/hooks";

  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = "primary";
  export let variant: ButtonVariant = undefined;
  export let href: string = null;
  export let action: string = "close";
  let defaultAction: boolean = false;
  export { defaultAction as default };
  export let disabled: boolean = false;
  export let target: string = null;
  export let density: number = undefined;

  let rippleInstance: Ripple3;

  $: {
    if (density > 3) density = 3;
    else if (density < 0) density = 0;
  }

  let behaviour = getButtonBehaviour();

  let actionProps: any = {};
  $: if (behaviour === "dialog:action") {
    if (defaultAction) {
      actionProps["data-mdc-dialog-button-default"] = "";
    }

    if (action !== null) {
      actionProps["data-mdc-dialog-action"] = action;
    }

    console.log(actionProps);
  }

  function onVariantUpdated() {
    if (rippleInstance) {
      rippleInstance.reinstantiate();
    }
  }
</script>

<svelte:options immutable={true} />

<UseState value={variant} onUpdate={onVariantUpdated} />

<svelte:component
  this={href == null || disabled ? Button : A}
  bind:dom
  props={{ ...props, ...actionProps, disabled, target, href }}
  {id}
  class="mdc-button {className}
    {variant ? `mdc-button--${variant}` : ''}
    {color === 'secondary' ? 'smui-button--color-secondary' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action--button' : ''}
    {behaviour === 'dialog:action' ? 'mdc-dialog__button' : ''}
    {behaviour === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {behaviour === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
    {density != null ? `smui-button--dense--${density}` : ''}"
  {style}
  on:domEvent={forwardDOMEvents}>
  {#if ripple}
    <Ripple3
      bind:this={rippleInstance}
      rippleElement="mdc-button__ripple"
      target={dom} />
  {/if}
  <slot />
</svelte:component>
