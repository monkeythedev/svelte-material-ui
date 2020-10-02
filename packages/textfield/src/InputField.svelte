<script context="module" lang="ts">
  let count = 0;
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = `SMUI-TextField-${count++}`;

  export let dom: HTMLLabelElement = undefined;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // TextField
  import { InputFieldType, TextFieldVariant } from "./types";
  import { FloatingLabel } from "@smui/floating-label";
  import { LineRipple } from "@smui/line-ripple";
  import { createInputFieldContext } from "./TextFieldContext";
  import { NotchedOutline } from "@smui/notched-outline";
  import UseTextField from "./hooks/UseTextField.svelte";
  import { onMount } from "svelte";
  import { RippleProps, Ripple3 } from "@smui/ripple";
  import ExtractNamedSlot from "@smui/common/src/components/ExtractNamedSlot.svelte";
  import { Span } from "@smui/common/dom";

  //#region UseTextField params
  export let ripple: boolean = true;
  export let value: any = undefined;
  export let invalid: boolean = false;
  export let disabled: boolean = false;
  export let color: RippleProps["color"] = undefined;
  export let variant: TextFieldVariant = "filled";

  let nativeInputInvalid: boolean = false;
  export let customValidation: (
    value: any,
    nativeInputInvalid: boolean
  ) => boolean = undefined;

  let textFieldClassList: string = "";
  //#endregion

  export let name: string = undefined;

  export let prefix: string = undefined;
  export let suffix: string = undefined;

  export let type: InputFieldType = "text";

  export let dirty: boolean = false;

  export let autocomplete: string = undefined;
  export let required: boolean = undefined;
  export let pattern: string = undefined;
  export let readonly: boolean = undefined;
  export let multiple: boolean = undefined;

  export let maxlength: number = undefined;

  export let step: number = undefined;
  export let min: number = undefined;
  export let max: number = undefined;

  //#region internal props
  let helperTextId: string;
  let labelId: string;
  let inputElement: HTMLInputElement;
  //#endregion

  createInputFieldContext({
    setHelperTextId(id: string) {
      helperTextId = id;
    },
    setLabelId(id: string) {
      labelId = id;
    },
  });

  onMount(() => {
    updateNativeInputInvalid();
  });

  function toNumber(value) {
    if (value === "") {
      return Number.NaN;
    }
    return +value;
  }

  function valueUpdater(e) {
    switch (type) {
      case "number":
        value = toNumber(e.target.value);
        break;
      default:
        value = e.target.value;
        break;
    }
  }

  function changeHandler(e) {
    dirty = true;
    updateNativeInputInvalid();
  }

  function updateNativeInputInvalid() {
    nativeInputInvalid = inputElement.matches(":invalid");
  }
</script>

<div class="smui-text-field__wrapper">
  <label
    bind:this={dom}
    for={id}
    class="{textFieldClassList}
      {className}
      {$$slots.leadingIcon ? 'mdc-text-field--with-leading-icon' : ''}
      {$$slots.trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}"
    {style}>
    {#if ripple}
      <Ripple3
        target={dom}
        unbounded={false}
        {color}
        rippleElement="mdc-text-field__ripple" />
    {/if}
    {#if $$slots.leadingIcon}
      <ExtractNamedSlot>
        <slot name="leadingIcon" class="mdc-text-field__icon--leading" />
      </ExtractNamedSlot>
    {/if}
    {#if prefix}
      <span
        class="mdc-text-field__affix mdc-text-field__affix--prefix">{prefix}</span>
    {/if}
    <input
      bind:this={inputElement}
      {...props}
      {id}
      class="mdc-text-field__input"
      {type}
      {name}
      {maxlength}
      {step}
      {min}
      {max}
      {autocomplete}
      {pattern}
      {required}
      {readonly}
      {multiple}
      on:input={(e) => valueUpdater(e)}
      on:change={changeHandler}
      aria-controls={helperTextId}
      aria-describedby={helperTextId}
      aria-labelledby={labelId}
      use:forwardDOMEvents />
    {#if suffix}
      <span
        class="mdc-text-field__affix mdc-text-field__affix--suffix">{suffix}</span>
    {/if}
    {#if $$slots.trailingIcon}
      <ExtractNamedSlot>
        <slot name="trailingIcon" class="mdc-text-field__icon--trailing" />
      </ExtractNamedSlot>
    {/if}
    {#if variant === 'filled'}
      {#if $$slots.label}
        <FloatingLabel component={Span}>
          <ExtractNamedSlot>
            <slot name="label" />
          </ExtractNamedSlot>
        </FloatingLabel>
      {/if}
      {#if ripple}
        <LineRipple />
      {/if}
    {:else if variant === 'outlined'}
      <NotchedOutline noLabel={!$$slots.label}>
        {#if $$slots.label}
          <FloatingLabel component={Span}>
            <slot name="label" />
          </FloatingLabel>
        {/if}
      </NotchedOutline>
    {/if}
  </label>
  {#if $$slots.helperText}
    <ExtractNamedSlot>
      <slot name="helperText" />
    </ExtractNamedSlot>
  {/if}
</div>

<UseTextField
  bind:value
  bind:invalid
  {ripple}
  {disabled}
  label={$$slots.label}
  fullWidth={false}
  {nativeInputInvalid}
  {customValidation}
  {variant}
  bind:classList={textFieldClassList}
  {dom} />
