<script context="module" lang="ts">
  let count = 0;
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = `SMUI-HelperText-${count++}`;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // HelperText
  import { MDCTextFieldHelperText } from "@material/textfield/helper-text";
  import { onMount, onDestroy } from "svelte";
  import { getInputFieldContext, getTextAreaContext } from "../TextFieldContext";

  export let persistent = false;
  export let validationMsg = false;
  export let line$use = [];
  export let line$class = "";

  const inputFieldContext$ = getInputFieldContext();
  const textAreaContext$ = getTextAreaContext();
  $: $inputFieldContext$?.setHelperTextId(id);
  $: $textAreaContext$?.setHelperTextId(id);

  let helperText: MDCTextFieldHelperText;
  onMount(() => {
    helperText = new MDCTextFieldHelperText(dom);
  });

  onDestroy(() => {
    helperText && helperText.destroy();
  });
</script>

<div
  {...props}
  {id}
  class="mdc-text-field-helper-line {line$class}"
  {style}
  use:forwardDOMEvents>
  <div
    bind:this={dom}
    class="mdc-text-field-helper-text {className}
      {persistent ? 'mdc-text-field-helper-text--persistent' : ''}
      {validationMsg ? 'mdc-text-field-helper-text--validation-msg' : ''}"
    aria-hidden="true">
    <slot />
  </div>
  <slot name="character-counter" />
</div>
