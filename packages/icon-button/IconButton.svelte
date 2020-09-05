<script lang="ts">
  import { MDCIconButtonToggle } from "@material/icon-button";
  import { onDestroy, getContext, setContext } from "svelte";
  // import { get_current_component } from "svelte/internal";
  // import { forwardEventsBuilder } from "@smui/common/forwardEvents";
  // import { exclude } from "@smui/common/exclude.js";
  // import { useActions } from "@smui/common/useActions.js";
  import { Ripple, RippleProps } from "../ripple/src";
  import A from "@smui/common/dom/A.svelte";
  import Button from "@smui/common/dom/Button.svelte";
  import { DOMEventsForwarder } from "../common/events/DOMEventsForwarder";

  const forwardDOMEvents = DOMEventsForwarder();

  export let use = [];
  let className = "";
  export { className as class };
  export let ripple = true;
  export let color = null;
  export let toggle = false;
  export let pressed = false;
  export let href = null;
  export let disabled = false;
  export let style = "";
  export let target = "";
  export let title = "";

  // $: props = exclude($$props, [
  //   "use",
  //   "class",
  //   "ripple",
  //   "color",
  //   "toggle",
  //   "pressed",
  //   "href",
  // ]);

  let dom: HTMLAnchorElement | HTMLButtonElement;
  let toggleButton;
  let context = getContext("SMUI:icon-button:context");

  let component = href ? A : Button;

  setContext("SMUI:icon:context", "icon-button");

  let oldToggle = null;
  $: if (dom && toggle !== oldToggle) {
    if (toggle) {
      toggleButton = new MDCIconButtonToggle(dom);
      if (!ripple) {
        toggleButton.ripple.destroy();
      }
      toggleButton.on = pressed;
    } else if (oldToggle) {
      toggleButton && toggleButton.destroy();
      toggleButton = null;
    }
    oldToggle = toggle;
  }

  $: if (toggleButton && toggleButton.on !== pressed) {
    toggleButton.on = pressed;
  }

  let useRipple: RippleProps;
  $: useRipple =
    ripple && !toggle
      ? {
          unbounded: true,
          color,
        }
      : null;

  onDestroy(() => {
    toggleButton && toggleButton.destroy();
  });

  function handleChange(e) {
    pressed = e.detail.isOn;
  }
</script>

<svelte:component
  this={component}
  bind:dom
  on:domEvent={forwardDOMEvents}
  use={[...use]}
  class="mdc-icon-button {className}
  {pressed ? 'mdc-icon-button--on' : ''}
  {context === 'card:action' ? 'mdc-card__action' : ''}
  {context === 'card:action' ? 'mdc-card__action--icon' : ''}
  {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}
  {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}
  {context === 'snackbar' ? 'mdc-snackbar__dismiss' : ''}"
  {disabled}
  {useRipple}
  {style}
  {target}
  aria-hidden="true"
  aria-pressed={pressed}
  {href}
  {title}>
  <div class="mdc-button__ripple" />
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
