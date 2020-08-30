<script lang="ts">
  import {
    setContext,
    getContext,
    onMount,
    createEventDispatcher,
  } from "svelte";
  import { exclude } from "../common/exclude.js";
  import { useActions } from "../common/useActions.js";
  import A from "../common/dom/A.svelte";
  import Button from "../common/dom/Button.svelte";
  import { RippleProps } from "../ripple/bare";
  import { domEventsForwarder } from "../common/events/forwardEvents";

  export let dom: HTMLElement = null;
  export let use = [];
  let className: string = "";
  export { className as class };
  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = "primary";
  export let variant: "raised" | "unelevated" | "outlined" = null;
  export let dense: boolean = false;
  // Purposely left out of props exclude.
  export let href: string = null;
  export let action = "close";
  let defaultAction: boolean = false;
  export { defaultAction as default };
  export let component = href == null ? Button : A;
  export let disabled: boolean = false;
  export let style: string = "";
  export let target: string = null;

  const forwardDomEvents = domEventsForwarder();

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

  let useRipple: RippleProps;
  $: useRipple = ripple ? {
    classForward: (classes) => (rippleClasses = classes)
  } : null;
  ///
</script>

<svelte:component
  this={component}
  bind:dom
  on:domEvent={forwardDomEvents}
  use={[...use]}
  class="mdc-button {className}
  {rippleClasses.join(' ')}
  {variant ? `mdc-button--${variant}` : ''}
  {dense ? 'mdc-button--dense' : ''}
  {color === 'secondary' ? 'smui-button--color-secondary' : ''}
  {context === 'card:action' ? 'mdc-card__action' : ''}
  {context === 'card:action' ? 'mdc-card__action--button' : ''}
  {context === 'dialog:action' ? 'mdc-dialog__button' : ''}
  {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
  {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
  {context === 'snackbar' ? 'mdc-snackbar__action' : ''}"
  {...actionProp}
  {...defaultProp}
  {disabled}
  {useRipple}
  {style}
  {target}>
  <div class="mdc-button__ripple" />
  <slot />
</svelte:component>
