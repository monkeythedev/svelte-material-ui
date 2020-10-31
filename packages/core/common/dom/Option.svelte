<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLOptionElement = null;

  import { BaseProps } from "./Props";
  export let props: BaseProps = {};
  //#endregion

  // Option

  export let value: string;

  // A svelte bug thorw error "not implemented empty" when this is used ?
</script>

<option
  bind:this={dom}
  {...props}
  {id}
  class={className}
  {style}
  {value}
  use:forwardDOMEvents>
  <slot />
</option>