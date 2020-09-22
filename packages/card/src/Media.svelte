<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // PrimaryAction
  export let aspectRatio = null;
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-card__media {className}
    {aspectRatio === 'square' ? 'mdc-card__media--square' : ''}
    {aspectRatio === '16x9' ? 'mdc-card__media--16-9' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</div>
