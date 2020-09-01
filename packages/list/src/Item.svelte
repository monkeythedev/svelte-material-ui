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
  import { Ripple, RippleProps } from "@smui/ripple/bare";
  import Li from "@smui/common/dom/Li.svelte";
  import A from "@smui/common/dom/A.svelte";
  import Span from "@smui/common/dom/Span.svelte";
  import { getListContext } from "./ListContext";
  import { createItemContext, ItemContext } from "./ItemContext";

  const listContext = getListContext();

  const dispatch = createEventDispatcher();
  let checked = false;

  export let ripple: boolean = true;
  export let color = null;
  export let nonInteractive = getContext("SMUI:list:nonInteractive");
  export let activated: boolean = false;
  export let role = getContext("SMUI:list:item:role");
  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let tabindex: "0" | "-1" =
    (!nonInteractive && !disabled && (selected || checked) && "0") || "-1";
  export let href: string = null;
  export let inputId: string = "SMUI-form-field-list-" + counter++;

  $: props = exclude($$props, [
    "use",
    "class",
    "ripple",
    "color",
    "nonInteractive",
    "activated",
    "selected",
    "disabled",
    "tabindex",
    "href",
    "inputId",
  ]);

  let addTabindexIfNoItemsSelectedRaf;
  let nav = getContext("SMUI:list:item:nav");

  let component: typeof Li | typeof A | typeof Span;
  if (nav && href) {
    component = A;
  } else if (nav && !href) {
    component = Span;
  } else {
    component = Li;
  }

  let useRipple: RippleProps;
  $: useRipple = ripple
    ? {
        color,
      }
    : null;

  setContext("SMUI:generic:input:props", { id: inputId });
  setContext("SMUI:generic:input:setChecked", setChecked);

  function setTabIndex(newTabindex: "0" | "-1") {
    tabindex = newTabindex;
  }

  const setItemContext = createItemContext();
  let context: ItemContext = {} as ItemContext;
  $: context = setItemContext({...context, tabindex})
  $: {context = setItemContext({
    ...context,
    disabled,
    selected,
    setTabIndex
  }); listContext.listItems$.update(context);}

  onMount(() => {
    listContext.listItems$.add(context);

    // Tabindex needs to be '0' if this is the first non-disabled list item, and
    // no other item is selected.

    // if (!selected && !nonInteractive) {
    //   let first = true;
    //   let el = dom;
    //   while (el.previousElementSibling) {
    //     el = el.previousElementSibling as typeof dom;
    //     if (
    //       el.nodeType === 1 &&
    //       el.classList.contains("mdc-list-item") &&
    //       !el.classList.contains("mdc-list-item--disabled")
    //     ) {
    //       first = false;
    //       break;
    //     }
    //   }
    //   if (first) {
    //     // This is first, so now set up a check that no other items are
    //     // selected.
    //     addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(
    //       addTabindexIfNoItemsSelected
    //     );
    //   }
    // }
  });

  onDestroy(() => {
    listContext.listItems$.remove(context);

    if (addTabindexIfNoItemsSelectedRaf) {
      window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    }
  });

  // function addTabindexIfNoItemsSelected() {
  //   // Look through next siblings to see if none of them are selected.
  //   let noneSelected = true;
  //   let el = dom;
  //   while (el.nextElementSibling) {
  //     el = el.nextElementSibling as typeof dom;
  //     if (
  //       el.nodeType === 1 &&
  //       el.classList.contains("mdc-list-item") &&
  //       el.attributes["tabindex"] &&
  //       el.attributes["tabindex"].value === "0"
  //     ) {
  //       noneSelected = false;
  //       break;
  //     }
  //   }
  //   if (noneSelected) {
  //     // This is the first element, and no other element is selected, so the
  //     // tabindex should be '0'.
  //     tabindex = "0";
  //   }
  // }

  function handleSubmit({ detail: event }: CustomEvent<KeyboardEvent>) {
    const isEnter = event.key === "Enter" || event.keyCode === 13;
    const isSpace = event.key === "Space" || event.keyCode === 32;
    if (isEnter || isSpace) {
      dispatch("submit", event);
    }
  }

  function setChecked(isChecked) {
    checked = isChecked;
    // tabindex =
    //   (!nonInteractive && !disabled && (selected || checked) && "0") || "-1";
  }
</script>

<svelte:component
  this={component}
  props={{ ...props, tabindex, href, 'aria-current': activated ? 'page' : null, useRipple }}
  bind:dom
  class="mdc-list-item {className}
    {disabled ? 'mdc-list-item--disabled' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {role === 'menuitem' && selected ? 'mdc-menu-item--selected' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}
  on:keydown={handleSubmit}>
  {#if useRipple}<span class="mdc-list-item__ripple" />{/if}
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
