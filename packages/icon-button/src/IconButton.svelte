<script context="module" lang="ts">
  export type IconButtonColor = "primary" | "secondary";
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLAnchorElement | HTMLButtonElement = undefined;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // IconButton
  //#region imports
  import { Button, A } from "@smui/common/dom";
  import { getIconButtonBehaviour } from "./IconButtonContextProps";
  import { UseState } from "@smui/common/hooks";
  import { UseRipple } from "@smui/ripple";
  import { tick } from "svelte";
  import { parseClassList } from "@smui/common/functions";
  //#endregion

  //#region exports
  export let ripple: boolean = true;
  export let color: IconButtonColor = undefined;
  export let href: string = undefined;
  export let disabled: boolean = false;
  export let target: string = undefined;
  export let title: string = undefined;
  // export let variant: TODO: allow support of variants, using Button underneath
  //#endregion

  //#region Internal variables
  const behaviour = getIconButtonBehaviour();
  let rippleInstance: UseRipple;
  let component: typeof Button | typeof A;

  $: {
    // Set component
    component = href == null || disabled ? Button : A;
  }
  //#endregion

  function onComponentChanged() {
    tick().then(() => {
      rippleInstance.reinstantiate();
    });
  }

  $: props = {
    ...props,
    disabled,
    href,
    target,
    title,
    "aria-label": props["aria-label"] || title,
  };
</script>

<svelte:options immutable={true} />

<UseState value={component} onUpdate={onComponentChanged} />

<svelte:component
  this={href ? A : Button}
  bind:dom
  {props}
  {id}
  class={parseClassList([
    className,
    'mdc-icon-button',
    [behaviour === 'card:action', 'mdc-card__action mdc-card__action--icon'],
    [
      behaviour === 'top-app-bar:navigation',
      'mdc-top-app-bar__navigation-icon',
    ],
    [behaviour === 'top-app-bar:action', 'mdc-top-app-bar__action-item'],
  ])}
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</svelte:component>

{#if ripple}
  <UseRipple bind:this={rippleInstance} target={dom} {color} unbounded={true} />
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
