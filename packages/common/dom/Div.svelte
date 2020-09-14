<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  export let dom: HTMLDivElement = null;
  let className = "";
  export { className as class };
  export let style: string = "";

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
  //#endregion
</script>

<div bind:this={dom} {...props} class={className} {style} use:forwardDOMEvents>
  <slot />
</div>
