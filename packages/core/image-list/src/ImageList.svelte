<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  import { setLabelBehaviour } from "@smui/common/dom/LabelContext";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLUListElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // IconButton
  export let masonry: boolean = false;
  export let withTextProtection: boolean = false;

  setLabelBehaviour("image-list");
</script>

<ul
  bind:this={dom}
  {...props}
  {id}
  class="mdc-image-list {className}
    {masonry ? 'mdc-image-list--masonry' : ''}
    {withTextProtection ? 'mdc-image-list--with-text-protection' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</ul>
