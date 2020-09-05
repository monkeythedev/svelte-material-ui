<script context="module">
  import { Corner, CornerBit, MDCMenuDistance } from "@material/menu-surface";

  export { Corner, CornerBit };
</script>

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

  // MenuSurface
  import { MDCMenuSurface } from "@material/menu-surface";
  import { onMount, onDestroy } from "svelte";
  import { getMenuContext } from "@smui/menu/src/MenuContext";
  import { createMenuSurfaceContext } from "./MenuSurfaceContext";

  let isStatic: boolean = false as boolean;
  export { isStatic as static };
  export let anchor: boolean = true;
  export let fixed: boolean = false;
  export let open: boolean = false;
  export let quickOpen: boolean = false;
  export let anchorElement: HTMLElement;
  export let anchorCorner: Corner = null;

  let menuSurface: MDCMenuSurface;
  const menuContext$ = getMenuContext();
  const context$ = createMenuSurfaceContext();

  $: $context$.open = open;

  onMount(async () => {
    if (!menuContext$) {
      menuSurface = new MDCMenuSurface(dom);
      menuSurface.listen("MDCMenuSurface:closed", updateOpen);
      menuSurface.listen("MDCMenuSurface:opened", updateOpen);
    }

    anchorElement = dom.parentElement;
  });

  $: if (menuSurface) {
    if (menuSurface.isOpen() !== open) {
      if (open) {
        menuSurface.open();
      } else {
        menuSurface.close();
      }
    }

    if (menuSurface.quickOpen !== quickOpen) {
      menuSurface.quickOpen = quickOpen;
    }

    if (menuSurface.anchorElement !== anchorElement) {
      menuSurface.anchorElement = anchorElement;
    }
  }

  $: if (menuSurface && fixed != null) {
    menuSurface.setFixedPosition(fixed);
  }

  if (menuSurface && ~anchorCorner) {
    menuSurface.setAnchorCorner(anchorCorner);
  }

  $: if (
    dom &&
    anchor &&
    anchorElement &&
    !anchorElement.classList.contains("mdc-menu-surface--anchor")
  ) {
    anchorElement.classList.add("mdc-menu-surface--anchor");
  }

  onDestroy(() => {
    if (anchor) {
      dom && dom.parentElement.classList.remove("mdc-menu-surface--anchor");
    }
  });

  function updateOpen() {
    if (menuSurface) {
      if (isStatic) {
        open = true;
      } else {
        open = menuSurface.isOpen();
      }
    }
  }

  export function setOpen(value) {
    open = value;
  }

  export function setAnchorCorner(corner: Corner) {
    return menuSurface.setAnchorCorner(corner);
  }

  export function setAnchorMargin(margin: Partial<MDCMenuDistance>) {
    return menuSurface.setAnchorMargin(margin);
  }

  export function setFixedPosition(isFixed) {
    fixed = isFixed;
    return menuSurface.setFixedPosition(isFixed);
  }

  export function setAbsolutePosition(x: number, y: number) {
    return menuSurface.setAbsolutePosition(x, y);
  }

  export function setMenuSurfaceAnchorElement(element: Element) {
    return menuSurface.setMenuSurfaceAnchorElement(element);
  }

  export function setIsHoisted(isHoisted: boolean) {
    return menuSurface.setIsHoisted(isHoisted);
  }

  export function getDefaultFoundation() {
    return menuSurface.getDefaultFoundation();
  }
</script>

<div
  {...props}
  bind:this={dom}
  class="mdc-menu-surface {className}
    {fixed ? 'mdc-menu-surface--fixed' : ''}
    {isStatic ? 'mdc-menu-surface--open' : ''}
    {isStatic ? 'smui-menu-surface--static' : ''}"
  {style}>
  <slot />
</div>

<!-- <div
  bind:this={dom}
  use:useActions={use}
  class="mdc-menu-surface {className}
    {fixed ? 'mdc-menu-surface--fixed' : ''}
    {isStatic ? 'mdc-menu-surface--open' : ''}
    {isStatic ? 'smui-menu-surface--static' : ''}"
  use:listenEvents={[{ eventName: 'MDCMenuSurface:closed', listener: updateOpen }, { eventName: 'MDCMenuSurface:opened', listener: updateOpen }]}
  {...exclude($$props, [
    'use',
    'class',
    'static',
    'anchor',
    'fixed',
    'open',
    'quickOpen',
    'anchorElement',
    'anchorCorner',
    'element',
  ])}>
  <slot />
</div> -->
