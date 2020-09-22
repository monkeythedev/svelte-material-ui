<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLAnchorElement | HTMLButtonElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // IconButton
  import { MDCIconButtonToggle } from "@material/icon-button";
  import { onDestroy, onMount } from "svelte";
  import IconButton from "./IconButton.svelte";

  export let color: "primary" | "secondary" = null;
  export let ripple: boolean = true;
  export let pressed: boolean = false;
  export let href: string = null;
  export let disabled: boolean = false;
  export let target: string = "";
  export let title: string = "";

  let toggleButton: MDCIconButtonToggle;
  onMount(() => {
    toggleButton = new MDCIconButtonToggle(dom);
    if (!ripple) {
      toggleButton.ripple.destroy();
    }

    toggleButton.listen(
      "MDCIconButtonToggle:change",
      (event: CustomEvent<{ isOn: boolean }>) => {
        pressed = event.detail.isOn;
      }
    );
  });

  $: if (toggleButton && toggleButton.on !== pressed) {
    toggleButton.on = pressed;
  }

  onDestroy(() => {
    toggleButton && toggleButton.destroy();
  });
</script>

<IconButton
  bind:dom
  {props}
  class={className}
  {style}
  on:domEvent={forwardDOMEvents}
  {disabled}
  {href}
  {target}
  {title}
  {pressed}
  {color}
  ripple={false}>
  <slot />
</IconButton>
