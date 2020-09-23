<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = null;

  export let dom: HTMLAnchorElement | HTMLButtonElement = null;
  
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // IconButton
  import { RippleProps } from "@smui/ripple";
  import { Button, A, setIconStyle } from "@smui/common/dom";
  import { RippleButton, RippleA } from "@smui/ripple/dom";
  import { getIconButtonBehaviour } from "./IconButtonContextProps";

  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = null;
  export let pressed: boolean = false;
  export let href: string = null;
  export let disabled: boolean = false;
  export let target: string = "";
  export let title: string = "";

  const behaviour = getIconButtonBehaviour();

  let component = getComponent(ripple);
  
  //let context = getContext("SMUI:icon-button:context");

  setIconStyle("icon-button");

  let rippleProps: RippleProps;
  $: rippleProps =
    ripple
      ? {
          unbounded: true,
          color,
          component: getComponent()
        }
      : null;

  function getComponent(
    ripple?: boolean
  ): typeof RippleA | typeof RippleButton | typeof A | typeof Button {
    if (ripple) {
      return href ? RippleA : RippleButton;
    } else {
      return href ? A : Button;
    }
  }

  $: props = {
    ...props,
    disabled,
    href,
    target,
    title,
    "aria-pressed": pressed,
    "aria-hidden": true,
    "aria-label": props["aria-label"] || title
  };
</script>

<svelte:component
  this={component}
  bind:dom
  {props}
  {id}
  class="mdc-icon-button {className}
    {pressed ? 'mdc-icon-button--on' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action--icon' : ''}
    {behaviour === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {behaviour === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
    {behaviour === 'snackbar' ? 'mdc-snackbar__dismiss' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}
  {rippleProps}>
  <slot />
</svelte:component>

<!-- {#if href}
  <a
    bind:this={dom}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-icon-button {className}
    {pressed ? 'mdc-icon-button--on' : ''}
    {context === 'card:action' ? 'mdc-card__action' : ''}
    {context === 'card:action' ? 'mdc-card__action--icon' : ''}
    {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
    {context === 'snackbar' ? 'mdc-snackbar__dismiss' : ''}
    "
    use:Ripple={{ ripple: ripple && !toggle, unbounded: true, color }}
    aria-hidden="true"
    aria-pressed={pressed}
    {href}
    on:MDCIconButtonToggle:change={handleChange}
    {...props}>
    <slot />
  </a>
{:else}
  <button
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-icon-button {className}
    {pressed ? 'mdc-icon-button--on' : ''}
    {context === 'card:action' ? 'mdc-card__action' : ''}
    {context === 'card:action' ? 'mdc-card__action--icon' : ''}
    {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
    {context === 'snackbar' ? 'mdc-snackbar__dismiss' : ''}
    "
    use:Ripple={{ ripple: ripple && !toggle, unbounded: true, color }}
    aria-hidden="true"
    aria-pressed={pressed}
    on:MDCIconButtonToggle:change={handleChange}
    {...props}>
    <slot />
  </button>
{/if} -->
