<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLAnchorElement | HTMLButtonElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // IconButton
  import { Button, A, setIconBehaviour } from "@smui/common/dom";
  import { getIconButtonBehaviour } from "./IconButtonContextProps";
  import { UseRipple } from "@smui/ripple";

  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = null;
  export let pressed: boolean = false;
  export let href: string = null;
  export let disabled: boolean = false;
  export let target: string = "";
  export let title: string = "";

  const behaviour = getIconButtonBehaviour();

  setIconBehaviour("icon-button");

  $: props = {
    ...props,
    disabled,
    href,
    target,
    title,
    "aria-pressed": pressed,
    "aria-hidden": true,
    "aria-label": props["aria-label"] || title,
  };
</script>

<svelte:component
  this={href ? A : Button}
  bind:dom
  {props}
  {id}
  class="mdc-icon-button {className}
    {pressed ? 'mdc-icon-button--on' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action' : ''}
    {behaviour === 'card:action' ? 'mdc-card__action--icon' : ''}
    {behaviour === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
    {behaviour === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</svelte:component>

{#if ripple}
  <UseRipple target={dom} {color} unbounded={true} />
{/if}

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
