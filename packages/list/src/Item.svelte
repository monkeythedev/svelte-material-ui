<script context="module" lang="ts">
  let counter = 0;
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = ""

  import { ItemRole, ListItemDOMElement } from "./types";
  export let dom: ListItemDOMElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Item
  //#region import
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
  import { RippleLi, RippleA } from "@smui/ripple/dom";
  import { getListContext } from "./ListContext";
  import { createItemContext, ItemContext } from "./ItemContext";
  import { getMenuSurfaceContext } from "@smui/menu-surface/src/MenuSurfaceContext";
  import { memo } from "@smui/common/utils";
  import { Selectable, OnSelectableChange } from "@smui/common/hoc";
  //#endregion

  export let ripple: boolean = true;
  export let color = null;
  export let activated: boolean = false;
  export let role: ItemRole = null; //TODO: forse si può togliere dagli export
  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let tabindex: number = -1;
  export let href: string = null;
  export let value: any = null;

  const dispatch = createEventDispatcher();

  let selectable: Selectable;

  const listContext$ = getListContext();
  const menuSurfaceContext$ = getMenuSurfaceContext();
  const context$ = createItemContext({
    sendOnSelected() {
      dispatch("selected", dom);
    }
  });

  $: if ($listContext$.role === "radiogroup") {
    role = "radio";
  } else if ($listContext$.role === "menu" || menuSurfaceContext$) {
    role = "menuitem"
  } else if ($listContext$.role === "listbox") {
    role = "option"
  } else if ($listContext$.role === "group") {
    role = "checkbox"
  }

  $: if (disabled && selected) selected = false;

  let component: typeof Li | typeof A | typeof Span;

  $: if ($listContext$.isNav && href) {
    component = ripple ? RippleA : A;
  } else {
    component = ripple ? RippleLi : Li;
  }

  const context = {} as ItemContext;
  $: $context$ = Object.assign(context, {
    ...$context$,
    disabled,
    selected,
    tabindex,
    dom,
    value
  });

  function handleChange(event: CustomEvent<OnSelectableChange>) {
    if (event.detail.selected) {
      dispatch("selected", dom);
    }
  }

  function onFocus() {
    selectable.notifyFocus();
  }

  onMount(() => {
    $listContext$.registerItem(context);

    $context$ = Object.assign(context, {
      ...$context$,
      setSelected: selectable?.setSelected,
      setValue: selectable?.setValue,
    });
  });

  onDestroy(() => {
    $listContext$.unregisterItem(context);
  });

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
    // "aria-checked":
    //   $listContext$.role === "group" || $listContext$.role === "radiogroup"
    //     ? `${selected}`
    //     : null,
    role
  };
</script>

<Selectable bind:this={selectable} bind:value bind:selected on:change={handleChange} bind:tabindex>
  <svelte:component
    this={component}
    bind:dom
    props={{ ...props }}
    {id}
    class="mdc-list-item {className}
      {disabled ? 'mdc-list-item--disabled' : ''}
      {role === 'option' && selected ? 'mdc-list-item--selected' : ''}
      {role === 'menuitem' && selected ? 'mdc-menu-item--selected' : ''}"
    {style}
    on:domEvent={forwardDOMEvents}
    on:focus={onFocus}
    {rippleProps}>
    <slot />
  </svelte:component>
</Selectable>

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
