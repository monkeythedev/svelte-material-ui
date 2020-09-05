<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;

  export let dom: HTMLButtonElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // MenuButton
  import { Button } from "@smui/button";
  import { Menu } from "@smui/menu";
  import { DefaultFocusState } from "@material/menu";

  export let ripple: boolean = true;
  export let color: "primary" | "secondary" = "primary";
  export let variant: "raised" | "unelevated" | "outlined" = null;
  export let dense: boolean = false;
  export let disabled: boolean = false;

  export let menu: Menu;

  function handleKey(event: CustomEvent<KeyboardEvent>) {
    if (!menu) return;

    if (
      event.detail.key === " " ||
      event.detail.key === "ArrowDown" ||
      event.detail.key === "Enter"
    ) {
      menu.setDefaultFocusState(DefaultFocusState.FIRST_ITEM);
      menu.setOpen(true);
    }

    if (event.detail.key === "ArrowUp") {
      menu.setDefaultFocusState(DefaultFocusState.LAST_ITEM);
      menu.setOpen(true);
    }
  }

  function handleClick(event: CustomEvent<MouseEvent>) {
    if (!menu) return;

    menu.setDefaultFocusState(DefaultFocusState.LIST_ROOT);
    menu.setOpen(true);
  }
</script>

<Button
  props={{ ...props }}
  bind:dom
  class={className}
  {style}
  on:domEvent={forwardDOMEvents}
  on:keyup={handleKey}
  on:click={handleClick}
  {ripple}
  {color}
  {variant}
  {dense}
  {disabled}>
  <slot />
</Button>

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
