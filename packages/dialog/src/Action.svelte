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
  
  export let action: string = "close";
  let defaultAction: boolean = false;
  export { defaultAction as default };
  //#endregion

  let actionProps: {
    "data-mdc-dialog-button-default"?: "",
    "data-mdc-dialog-action"?: string
  } = {};
  $: {
    actionProps = {};

    if (defaultAction) {
      actionProps["data-mdc-dialog-button-default"] = "";
    }

    if (action !== null) {
      actionProps["data-mdc-dialog-action"] = action;
    }
  }
</script>

<svelte:options immutable={true} />

<Button
  bind:dom
  props={{...props, ...actionProps}}
  {id}
  class="{className || ''} mdc-dialog__button"
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
