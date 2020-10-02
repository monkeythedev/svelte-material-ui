<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLOptionElement = undefined;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  export let value: string;
</script>

<option
  bind:this={dom}
  {...props}
  {id}
  class={className}
  {style}
  use:forwardDOMEvents
  {value}>
  <slot></slot>
</option>