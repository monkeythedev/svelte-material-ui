<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLHeadingElement = null;
  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
  //#endregion
</script>

<span bind:this={dom} {...props} class={className} {style} use:forwardDOMEvents>
  <slot />
</span>
