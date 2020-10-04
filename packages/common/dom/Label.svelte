<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
  //#endregion

  // Label
  import { getLabelBehaviour } from "./LabelContext";

  const behaviour = getLabelBehaviour();
</script>

<span
  bind:this={dom}
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
  role={behaviour === "snackbar" ? "status" : null}
  aria-live={behaviour === "snackbar" ? "polite" : null}
  use:forwardDOMEvents>
  <slot />
</span>