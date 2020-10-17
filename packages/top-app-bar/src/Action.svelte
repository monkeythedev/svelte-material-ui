<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLButtonElement | HTMLAnchorElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Action
  import { Button, ButtonVariant, ButtonColors } from "@smui/button";

  //#region exports
  export let ripple: boolean = undefined;
  export let color: ButtonColors = undefined;
  export let variant: ButtonVariant = undefined;
  export let disabled: boolean = undefined;
  export let density: number = undefined;
  export let href: string = undefined;
  export let target: string = undefined;
  //#endregion
</script>

<svelte:options immutable={true} />

<Button
  bind:dom
  {props}
  {id}
  class="{className || ''} mdc-top-app-bar__action-item"
  {style}
  {ripple}
  {color}
  {variant}
  {href}
  {disabled}
  {target}
  {density}
  on:domEvent={forwardDOMEvents}>
  <slot />
</Button>
