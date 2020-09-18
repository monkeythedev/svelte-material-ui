<script lang="ts"> 
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
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
  import { Ripple2 } from "@smui/ripple";

  export let ripple = true;
  export let color = "secondary";
  export let mini = false;
  export let exited = false;
  export let extended = false;

  // setContext("SMUI:label:context", "fab");
  // setContext("SMUI:icon:context", "fab");
</script>

{#if ripple}
 <Ripple2 target={dom} unbounded={false} rippleElement="mdc-fab__ripple"/>
{/if}

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
  <slot />
</button>
