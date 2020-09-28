<script lang="ts" context="module">
  import { A, Button } from "@smui/common/dom";
  import { RippleButton, RippleA } from "@smui/ripple/dom";
  export type ButtonComponent =
    | typeof Button
    | typeof A
    | typeof RippleButton
    | typeof RippleA;
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLButtonElement | HTMLAnchorElement = null;
  
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Button
  import {
    setContext,
  } from "svelte";
  import { RippleProps } from "@smui/ripple/src";
  import { getButtonBehaviour } from "./ButtonContextProps";

  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = "primary";
  export let variant: "raised" | "unelevated" | "outlined" = null;
  export let dense: boolean = false;
  export let href: string = null;
  export let action: string = "close";
  let defaultAction: boolean = false;
  export {defaultAction as default}
  export let disabled: boolean = false;
  export let target: string = null;

  let behaviour = getButtonBehaviour();

  let actionProps: any = {};
  $: if ( behaviour === "dialog:action") {
    if (defaultAction) {
      actionProps["data-mdc-dialog-button-default"] = ""
    }

    if (action !== null) {
      actionProps["data-mdc-dialog-action"] = action
    }

    console.log(actionProps)
  }

  setContext("SMUI:label:context", "button");
  setContext("SMUI:icon:context", "button");

  export let component: ButtonComponent = Button;
  function getComponent(ripple = false) {
    if (ripple) return href == null ? RippleButton : RippleA;
    else return href == null ? Button : A;
  }
  $: component = getComponent(ripple);

  let rippleProps: RippleProps;
  $: rippleProps = ripple
    ? {
        rippleElement: "mdc-button__ripple",
        component: getComponent(),
      }
    : undefined;
</script>

<svelte:component
  this={component}
  bind:dom
  props={{ ...props, ...actionProps, disabled, target, href }}
  {id}
  class="mdc-button {className}
    {variant ? `mdc-button--${variant}` : ''}
    {dense ? 'mdc-button--dense' : ''}
    {color === 'secondary' ? 'smui-button--color-secondary' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action--button' : ''}
    {behaviour === 'dialog:action' ? 'mdc-dialog__button' : ''}
    {behaviour === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {behaviour === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
    {behaviour === 'snackbar' ? 'mdc-snackbar__action' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}
  {rippleProps}>
  <slot />
</svelte:component>
