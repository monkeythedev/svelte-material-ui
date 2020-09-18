<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLButtonElement = null;
  let className = "";
  export { className as class };
  export let style: string = null;

  export let props: BaseProps = {};
  export let id: string = null;

  // Label
  import { getLabelBehaviour } from "./LabelContext";
  import { BaseProps } from "./Props";

  //const context = getContext("SMUI:label:context");
  const behaviour = getLabelBehaviour();
</script>

<span
  bind:this={dom}
  role={behaviour === "snackbar" ? "status" : null}
  aria-live={behaviour === "snackbar" ? "polite" : null}
  {...props}
  {id}
  class="{className}
    {behaviour === 'button' ? 'mdc-button__label' : ''}
    {behaviour === 'fab' ? 'mdc-fab__label' : ''}
    {behaviour === 'chip' ? 'mdc-chip__text' : ''}
    {behaviour === 'tab' ? 'mdc-tab__text-label' : ''}
    {behaviour === 'image-list' ? 'mdc-image-list__label' : ''}
    {behaviour === 'snackbar' ? 'mdc-snackbar__label' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</span>
