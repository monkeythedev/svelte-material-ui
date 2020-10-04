<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
  //#endregion

  // H4
</script>

<h4
  bind:this={dom}
  {...props}
  {id}
  class={className}
  {style}
  use:forwardDOMEvents>
  <slot />
</h4>