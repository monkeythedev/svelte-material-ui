<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLLabelElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Textarea
  import { onMount } from "svelte";
  import UseTextField from "./hooks/UseTextField.svelte";
  import { createTextAreaContext } from "./TextFieldContext";
  import FloatingLabel from "@smui/floating-label/FloatingLabel.svelte";
  import { NotchedOutline } from "@smui/notched-outline";
  import { RippleProps, Ripple3 } from "@smui/ripple";

  //#region UseTextField params
  export let ripple: boolean = true;
  export let value: string = undefined;
  export let invalid: boolean = false;
  export let disabled: boolean = false;
  export let label: string = undefined;
  export let fullWidth: boolean = false;
  export let color: RippleProps["color"] = undefined;

  let textFieldClassList: string = "";
  //#endregion

  export let dirty: boolean = false;
  export let maxLength: number = undefined;

  let helperTextId: string;
  let textareaElement: HTMLTextAreaElement;
  let rows: number = undefined;
  let cols: number = undefined;

  createTextAreaContext({
    setHelperTextId(id: string) {
      helperTextId = id;
    },
  });

  onMount(() => {
    invalid = dom.matches(":invalid");
  });

  function changeHandler(e) {
    dirty = true;
    invalid = dom.matches(":invalid");
  }
</script>

<div
  class="smui-text-field__wrapper {fullWidth ? 'smui-text-field__wrapper--fullwidth' : ''}">
  <label
    bind:this={dom}
    for={id}
    class="{textFieldClassList} mdc-text-field--textarea {className}"
    {style}>
    {#if ripple}
      <Ripple3
        target={dom}
        unbounded={false}
        {color}
        rippleElement="mdc-text-field__ripple" />
    {/if}
    <span class="mdc-text-field__resizer">
      <textarea
        bind:this={textareaElement}
        {...props}
        {id}
        class="mdc-text-field__input {className}"
        {style}
        maxlength={maxLength}
        on:change={changeHandler}
        aria-controls={helperTextId}
        aria-describedby={helperTextId}
        aria-label={label}
        {rows}
        {cols}
        use:forwardDOMEvents />
    </span>
    <NotchedOutline noLabel={label == null}>
      {#if label != null}
        <FloatingLabel wrapped>
          {label}
          <slot name="label" />
        </FloatingLabel>
      {/if}
    </NotchedOutline>
  </label>
  <slot name="helperText" />
</div>

<UseTextField
  bind:value
  bind:invalid
  {ripple}
  {disabled}
  {label}
  {fullWidth}
  {color}
  variant="outlined"
  bind:classList={textFieldClassList}
  {dom} />
