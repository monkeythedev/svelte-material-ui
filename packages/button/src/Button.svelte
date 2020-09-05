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
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLElement = null;
  export let props: any = {};

  // Button
  import { ButtonProps } from "@smui/common/dom";
  import {
    setContext,
    getContext,
    onMount,
    createEventDispatcher,
  } from "svelte";
  import { RippleProps } from "@smui/ripple/src";

  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = "primary";
  export let variant: "raised" | "unelevated" | "outlined" = null;
  export let dense: boolean = false;
  // Purposely left out of props exclude.
  export let href: string = null;
  export let action = "close";
  let defaultAction: boolean = false;
  export { defaultAction as default };
  export let disabled: boolean = false;
  export let target: string = null;

  let context = getContext("SMUI:button:context");
  let rippleClasses = [];

  $: dialogExcludes = context === "dialog:action" ? ["action", "default"] : [];

  $: actionProp =
    context === "dialog:action" && action !== null
      ? { "data-mdc-dialog-action": action }
      : {};
  $: defaultProp =
    context === "dialog:action" && defaultAction
      ? { "data-mdc-dialog-button-default": "" }
      : {};

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
    : null;
  ///
</script>

<svelte:component
  this={component}
  {rippleProps}
  bind:dom
  on:domEvent={forwardDOMEvents}
  class="mdc-button {className}
    {variant ? `mdc-button--${variant}` : ''}
    {dense ? 'mdc-button--dense' : ''}
    {color === 'secondary' ? 'smui-button--color-secondary' : ''}
    {context === 'card:action' ? 'mdc-card__action' : ''}
    {context === 'card:action' ? 'mdc-card__action--button' : ''}
    {context === 'dialog:action' ? 'mdc-dialog__button' : ''}
    {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
    {context === 'snackbar' ? 'mdc-snackbar__action' : ''}"
  {style}
  {...actionProp}
  {...defaultProp}
  props={{ ...props, disabled, target, href }}>
  <slot />
</svelte:component>
