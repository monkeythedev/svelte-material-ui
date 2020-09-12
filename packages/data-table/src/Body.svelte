<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  import { setRowBehaviour } from "./RowContext";

  setRowBehaviour(null);
</script>

<tbody
  bind:this={dom}
  {...props}
  class="mdc-data-table__content {className}"
  {style}
  use:forwardDOMEvents>
  <slot />
</tbody>
