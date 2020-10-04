<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  import { setLabelBehaviour } from "@smui/common/dom/LabelContext";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLInputElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Fab
  import { Ripple3, RippleProps } from "@smui/ripple";

  export let ripple: boolean = true;
  export let color: RippleProps["color"] = "secondary";
  export let mini: boolean = false;
  export let exited: boolean = false;
  export let extended: boolean = false;

  setLabelBehaviour("fab");
  // setContext("SMUI:icon:context", "fab");
</script>

<button
  bind:this={dom}
  {...props}
  {id}
  class="mdc-fab {className}
    {mini ? 'mdc-fab--mini' : ''}
    {exited ? 'mdc-fab--exited' : ''}
    {extended ? 'mdc-fab--extended' : ''}
    {color === 'primary' ? 'smui-fab--color-primary' : ''}"
  {style}
  use:forwardDOMEvents>
  {#if ripple}
    <Ripple3 rippleElement="mdc-fab__ripple" target={dom} {color} />
  {/if}
  <slot />
</button>
