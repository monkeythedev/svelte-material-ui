<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  import A from "@smui/common/dom/A.svelte";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLLabelElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Label
  import { getFormFieldContext } from "@smui/form-field";
  
  let _for: string = "";
  export { _for as for };

  const formFieldContext$ = getFormFieldContext();
</script>

<label
  bind:this={dom}
  {...props}
  {id}
  class="mdc-list-item__text {className}"
  {style}
  use:forwardDOMEvents
  for={formFieldContext$ ? $formFieldContext$.inputId : _for}><slot /></label>
