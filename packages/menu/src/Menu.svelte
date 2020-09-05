<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;

  export let dom: HTMLDivElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // Menu
  import {
    Corner,
    DefaultFocusState,
    MDCMenu,
    MDCMenuFoundation,
  } from "@material/menu";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { MenuSurface } from "@smui/menu-surface";
  import { MDCMenuDistance } from "@material/menu-surface";
  import { createMenuContext } from "./MenuContext";

  let isStatic: boolean = false;
  export { isStatic as static };
  export let open: boolean = false;
  export let quickOpen: boolean = false;
  export let anchorCorner: Corner = null;
  export let wrapFocus: boolean = false;

  const dispatch = createEventDispatcher();
  const context$ = createMenuContext({});

  let menu: MDCMenu;
  onMount(async () => {
    menu = new MDCMenu(dom);
    menu.listen("MDCMenu:selected", handleSelected);
    menu.listen("MDCMenuSurface:closed", updateOpen);
    menu.listen("MDCMenuSurface:opened", updateOpen);
  });

  $: if (menu) {
    if (isStatic) {
      open = true;
    }

    if (menu.open !== open) {
      menu.open = open;
    }

    if (menu.wrapFocus !== wrapFocus) {
      menu.wrapFocus = wrapFocus;
    }

    if (menu.quickOpen !== quickOpen) {
      menu.wrapFocus = quickOpen;
    }
  }

  if (menu && ~anchorCorner) {
    menu.setAnchorCorner(anchorCorner);
  }

  onDestroy(() => {
    menu && menu.destroy();
  });

  function handleSelected(
    event: CustomEvent<{ detail: { item: Element; index: number } }>
  ) {
    dispatch("selected", event.detail);
    updateOpen();
  }

  function updateOpen() {
    open = menu.open;
  }

  export function setOpen(value) {
    open = value;
  }

  export function getItems() {
    return menu.items;
  }

  export function setDefaultFocusState(focusState: DefaultFocusState) {
    return menu.setDefaultFocusState(focusState);
  }

  export function setAnchorCorner(corner: Corner) {
    return menu.setAnchorCorner(corner);
  }

  export function setAnchorMargin(margin: Partial<MDCMenuDistance>) {
    return menu.setAnchorMargin(margin);
  }

  export function setSelectedIndex(index: number) {
    return menu.setSelectedIndex(index);
  }

  export function setEnabled(index: number, isEnabled: boolean) {
    return menu.setEnabled(index, isEnabled);
  }

  export function getOptionByIndex(index: number): Element {
    return menu.getOptionByIndex(index);
  }

  export function setFixedPosition(isFixed: boolean) {
    return menu.setFixedPosition(isFixed);
  }

  export function setIsHoisted(isHoisted: boolean) {
    return menu.setIsHoisted(isHoisted);
  }

  export function setAbsolutePosition(x: number, y: number) {
    return menu.setAbsolutePosition(x, y);
  }

  export function setAnchorElement(element: Element) {
    return menu.setAnchorElement(element);
  }

  export function getDefaultFoundation(): MDCMenuFoundation {
    return menu.getDefaultFoundation();
  }
</script>

<MenuSurface
  props={{ ...props }}
  bind:dom
  class="mdc-menu {className}"
  {style}
  on:domEvent={forwardDOMEvents}
  static={isStatic}
  {open}
  {quickOpen}
  {anchorCorner}>
  <slot />
</MenuSurface>

<!-- <MenuSurface
  bind:element
  use={[...use]}
  class="mdc-menu {className}"
  on:MDCMenu:selected={updateOpen}
  on:MDCMenuSurface:closed={updateOpen}
  on:MDCMenuSurface:opened={updateOpen}
  {...exclude($$props, ['use', 'class', 'wrapFocus'])}>
  <slot />
</MenuSurface> -->
