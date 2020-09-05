<script context="module" lang="ts">
  let counter = 0;
</script>

<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;

  import { ListItemDOMElement } from "./types";
  export let dom: ListItemDOMElement = null;
  export let props: any = {};

  // Item
  import {
    onMount,
    onDestroy,
    getContext,
    setContext,
    createEventDispatcher,
  } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { forwardEventsBuilder } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { useActions } from "@smui/common/useActions.js";
  import { RippleProps } from "@smui/ripple/src";
  import { Li, A, Span } from "@smui/common/dom";
  import { RippleLi } from "@smui/ripple/dom";
  import { getListContext } from "./ListContext";
  import { createItemContext, ItemContext } from "./ItemContext";
  import { getMenuSurfaceContext } from "@smui/menu-surface/src/MenuSurfaceContext";

  export let ripple: boolean = true;
  export let color = null;
  export let activated: boolean = false;
  export let role = getContext("SMUI:list:item:role");
  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let tabindex: "0" | "-1" = "-1";
  export let href: string = null;
  export let inputId: string = "SMUI-form-field-list-" + counter++;

  const listContext$ = getListContext();
  const menuSurfaceContext$ = getMenuSurfaceContext();

  const dispatch = createEventDispatcher();

  $: if (disabled && tabindex === "0") tabindex = "-1";
  $: if (disabled && selected) selected = false;
  $: if ($listContext$.list) {
    if (selected) {
      $listContext$.notifySelected(context, true);
      dispatch("selected", dom);
    } else {
      $listContext$.notifySelected(context, false);
    }
  }

  let nav = false;
  $: nav = $listContext$.isNav;

  let component: typeof Li | typeof A | typeof Span;
  $: if (nav && href) {
    component = A;
  } else if (nav && !href) {
    component = Span;
  } else {
    component = ripple ? RippleLi : Li;
  }

  $: if (menuSurfaceContext$) {
    role = "menuitem";
  }

  setContext("SMUI:generic:input:props", { id: inputId });
  setContext("SMUI:generic:input:setChecked", setChecked);

  const context = {} as ItemContext;
  $: Object.assign(context, {
    disabled,
    selected,
    setTabIndex(newTabindex: "0" | "-1") {
      tabindex = newTabindex;
    },
    setDisabled(_disabled: boolean) {
      disabled = _disabled;
    },
    setSelected(_selected: boolean) {
      selected = _selected;
    },
    sendOnSelected() {
      dispatch("selected", dom);
    },
    tabindex,
    dom,
  });

  function onFocus() {
    $listContext$.notifyFocus(context);
  }

  onMount(() => {
    $listContext$.listItems.add(context);
    $listContext$ = { ...$listContext$ };
  });

  onDestroy(() => {
    $listContext$.listItems.delete(context);
    $listContext$ = { ...$listContext$ };
  });

  let checked = false;
  function setChecked(isChecked) {
    checked = isChecked;
    $listContext$.notifySelected(context, true);
  }

  let rippleProps: RippleProps;
  $: rippleProps = ripple
    ? {
        color,
        component,
        rippleElement: "mdc-list-item__ripple",
        keyboardEvents: true,
      }
    : null;

  $: props = {
    ...props,
    tabindex,
    href,
    "aria-current": activated ? "page" : null,
    //"aria-selected": $listContext$.role === "listbox" ? selected : null, Lo setta MDC
    "aria-checked":
      $listContext$.role === "group" || $listContext$.role === "radiogroup"
        ? `${checked}`
        : null,
    role
  };
</script>

<svelte:component
  this={component}
  props={{ ...props }}
  {rippleProps}
  bind:dom
  class="mdc-list-item {className}
    {disabled ? 'mdc-list-item--disabled' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {role === 'menuitem' && selected ? 'mdc-menu-item--selected' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}
  on:focus={onFocus}>
  <slot />
</svelte:component>

<!-- 
{#if nav && href}
  <a
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-item {className}
    {activated ? 'mdc-list-item--activated' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {disabled ? 'mdc-list-item--disabled' : ''}
    "
    use:Ripple={{ ripple, unbounded: false, color }}
    {href}
    {...activated ? { 'aria-current': 'page' } : {}}
    {tabindex}
    on:click={action}
    on:keydown={handleKeydown}
    {...props}>
    <slot />
  </a>
{:else if nav && !href}
  <span
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-item {className}
    {activated ? 'mdc-list-item--activated' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {disabled ? 'mdc-list-item--disabled' : ''}
    "
    use:Ripple={{ ripple, unbounded: false, color }}
    {...activated ? { 'aria-current': 'page' } : {}}
    {tabindex}
    on:click={action}
    on:keydown={handleKeydown}
    {...props}>
    <slot />
  </span>
{:else}
  <li
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-item {className}
    {activated ? 'mdc-list-item--activated' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {disabled ? 'mdc-list-item--disabled' : ''}
    {role === 'menuitem' && selected ? 'mdc-menu-item--selected' : ''}
    "
    use:Ripple={{ ripple, unbounded: false, color }}
    {role}
    {...role === 'option' ? { 'aria-selected': selected ? 'true' : 'false' } : {}}
    {...role === 'radio' || role === 'checkbox' ? { 'aria-checked': checked ? 'true' : 'false' } : {}}
    {tabindex}
    on:click={action}
    on:keydown={handleKeydown}
    {...props}>
    <slot />
  </li>
{/if} -->
