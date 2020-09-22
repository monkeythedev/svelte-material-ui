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

  // Card
  export let variant: "raised" | "outlined" = "raised";
  export let padded: boolean = false;
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-card {className}
    {variant === 'outlined' ? 'mdc-card--outlined' : ''}
    {padded ? 'smui-card--padded' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</div>
