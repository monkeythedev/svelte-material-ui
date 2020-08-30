<script lang="ts">
  import { DefaultFocusState, MDCMenu, MDCMenuFoundation } from "@material/menu";
  import { onMount, onDestroy, getContext, setContext, createEventDispatcher } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { forwardAllDOMEvents } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { useActions } from "@smui/common/useActions.js";
  import MenuSurface, {
    Corner,
    CornerBit,
  } from "@smui/menu-surface/MenuSurface.svelte";
import { domEventsForwarder } from "@smui/common/events/forwardEvents";
import { MDCMenuDistance } from "@material/menu-surface";

  // export let use = [];
  let className = "";
  export { className as class };
  let isStatic = false;
  export { isStatic as static }; // Purposely omitted from the exclude call above.
  export let open = isStatic; // Purposely omitted from the exclude call above.
  export let quickOpen = false; // Purposely omitted from the exclude call above.
  export let anchorCorner: Corner = null; // Purposely omitted from the exclude call above.
  export let wrapFocus = false;

  const forwardDOMEvents = domEventsForwarder();

  let dom: HTMLDivElement;
  let menu: MDCMenu;
  // let instantiate = getContext("SMUI:menu:instantiate");
  // let getInstance = getContext("SMUI:menu:getInstance");
  // let menuSurfacePromiseResolve;
  // let menuSurfacePromise = new Promise(
  //   (resolve) => (menuSurfacePromiseResolve = resolve)
  // );
  // let listPromiseResolve;
  // let listPromise = new Promise((resolve) => (listPromiseResolve = resolve));

  // setContext("SMUI:menu-surface:instantiate", false);
  // setContext("SMUI:menu-surface:getInstance", getMenuSurfaceInstancePromise);
  // setContext("SMUI:list:instantiate", false);
  // setContext("SMUI:list:getInstance", getListInstancePromise);

  $: if (menu && menu.open !== open) {
    if (isStatic) {
      open = true;
    }
    menu.open = open;
  }

  $: if (menu && menu.wrapFocus !== wrapFocus) {
    menu.wrapFocus = wrapFocus;
  }

  $: if (menu) {
    menu.quickOpen = quickOpen;
  }

  $: if (menu && anchorCorner != null) {
    if (Corner.hasOwnProperty(anchorCorner)) {
      menu.setAnchorCorner(anchorCorner);
    } else if (CornerBit.hasOwnProperty(anchorCorner)) {
      menu.setAnchorCorner(anchorCorner);
    } else {
      menu.setAnchorCorner(anchorCorner);
    }
  }

  onMount(async () => {
    // if (instantiate !== false) {
      menu = new MDCMenu(dom);
      menu.listen("MDCMenu:selected", updateOpen);
      menu.listen("MDCMenuSurface:closed", updateOpen);
      menu.listen("MDCMenuSurface:opened", updateOpen);
    // } else {
    //   menu = await getInstance();
    // }
    // menuSurfacePromiseResolve(menu.menuSurface_);
    // listPromiseResolve(menu.list_);
  });

  onDestroy(() => {
    // if (instantiate !== false) {
      menu && menu.destroy();
    // }
  });

  // function getMenuSurfaceInstancePromise() {
  //   return menuSurfacePromise;
  // }

  // function getListInstancePromise() {
  //   return listPromise;
  // }

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

<MenuSurface bind:dom on:domEvent={forwardDOMEvents} class="mdc-menu {className}">
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
