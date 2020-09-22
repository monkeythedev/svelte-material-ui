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

  // Actions
  import { setButtonBehaviour } from "@smui/button";
  import { setIconButtonBehaviour } from "@smui/icon-button";

  export let fullBleed: boolean = false;

  setButtonBehaviour("card:action");
  setIconButtonBehaviour("card:action");
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-card__actions {className}
    {fullBleed ? 'mdc-card__actions--full-bleed' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</div>
