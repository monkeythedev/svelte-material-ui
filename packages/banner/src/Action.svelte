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
  import { Button, setButtonBehaviour } from "@smui/button";

  export let ripple: boolean = true;
  export let type: "primary" | "secondary" = "primary";

  setButtonBehaviour("banner:action");
</script>

<Button
  bind:dom
  {props}
  {id}
  class="{type === 'primary' ? 'mdc-banner__primary-action' : 'mdc-banner__secondary-action'} {className}"
  {style}
  {ripple}
  on:domEvent={forwardDOMEvents}>
  <slot />
</Button>
