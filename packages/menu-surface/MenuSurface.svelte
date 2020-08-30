<script context="module">
  import { Corner, CornerBit, MDCMenuDistance } from "@material/menu-surface";

  export { Corner, CornerBit };
</script>

<script lang="ts">
  import { MDCMenuSurface } from "@material/menu-surface";
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { forwardAllDOMEvents } from "../common/forwardEvents";
  import { exclude } from "../common/exclude.js";
  import { useActions } from "../common/useActions.js";
  import { listenCustomEvents, ListenerOpt } from "../common/mdcEvents";

  export let use = [];
  let className = "";
  export { className as class };
  let isStatic = false;
  export { isStatic as static };
  export let anchor = true;
  export let fixed = false;
  export let open = isStatic;
  export let quickOpen = false;
  export let anchorElement: HTMLElement;
  export let anchorCorner: Corner = null;

  export let dom: HTMLDivElement; // This is exported because Menu needs it.
  let menuSurface: MDCMenuSurface;
  let instantiate = getContext("SMUI:menu-surface:instantiate");
  let getInstance = getContext("SMUI:menu-surface:getInstance");

  setContext("SMUI:list:role", "menu");
  setContext("SMUI:list:item:role", "menuitem");

  $: if (
    dom &&
    anchor &&
    anchorElement &&
    !anchorElement.classList.contains("mdc-menu-surface--anchor")
  ) {
    anchorElement.classList.add("mdc-menu-surface--anchor");
  }

  $: if (menuSurface && menuSurface.isOpen() !== open) {
    if (open) {
      menuSurface.open();
    } else {
      menuSurface.close();
    }
  }

  $: if (menuSurface && menuSurface.quickOpen !== quickOpen) {
    menuSurface.quickOpen = quickOpen;
  }

  $: if (menuSurface && menuSurface.anchorElement !== anchorElement) {
    menuSurface.anchorElement = anchorElement;
  }

  let oldFixed = null;
  $: if (menuSurface && oldFixed !== fixed) {
    menuSurface.setFixedPosition(fixed);
    oldFixed = fixed;
  }

  $: if (menuSurface && anchorCorner != null) {
    if (Corner.hasOwnProperty(anchorCorner)) {
      menuSurface.setAnchorCorner(anchorCorner);
    } else if (CornerBit.hasOwnProperty(anchorCorner)) {
      menuSurface.setAnchorCorner(anchorCorner);
    } else {
      menuSurface.setAnchorCorner(anchorCorner);
    }
  }

  onMount(async () => {
    // if (instantiate !== false) {
      menuSurface = new MDCMenuSurface(dom);
    // } else {
    //   menuSurface = await getInstance();
    // }

    anchorElement = dom.parentElement;
  });

  onDestroy(() => {
    if (anchor) {
      dom &&
        dom.parentElement.classList.remove("mdc-menu-surface--anchor");
    }
    // let isHoisted = false;
    // if (menuSurface) {
    //   isHoisted = menuSurface.foundation_.isHoistedElement_;
    //   if (instantiate !== false) {
    //     menuSurface.destroy();
    //   }
    // }
    // if (isHoisted) {
    //   dom.parentNode.removeChild(dom);
    // }
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
  bind:this={dom}
  use:useActions={use}
  class=" mdc-menu-surface {className}
  {fixed ? 'mdc-menu-surface--fixed' : ''}
  {isStatic ? 'mdc-menu-surface--open' : ''}
  {isStatic ? 'smui-menu-surface--static' : ''}
  "
  use:listenCustomEvents={[{ eventName: 'MDCMenuSurface:closed', listener: updateOpen }, { eventName: 'MDCMenuSurface:opened', listener: updateOpen }]}
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
</div>
