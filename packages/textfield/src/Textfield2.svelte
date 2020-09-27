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
  export let id: string = `SMUI-TextField-${count++}`;

  export let dom: HTMLLabelElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // TextField
  import { TextFieldVariant } from "./types";
  import FloatingLabel from "@smui/floating-label/FloatingLabel.svelte";
  import LineRipple from "@smui/line-ripple/src/LineRipple.svelte";
  import { createInputFieldContext } from "./TextFieldContext";
  import { NotchedOutline } from "@smui/notched-outline";
  import UseTextField from "./hooks/UseTextField.svelte";
  import { onMount } from "svelte";
  import { RippleProps, Ripple3 } from "@smui/ripple";

  //#region UseTextField params
  export let ripple: boolean = true;
  export let value: any = undefined;
  export let invalid: boolean = false;
  export let disabled: boolean = false;
  export let label: string = undefined;
  export let fullWidth: boolean = false;
  export let color: RippleProps["color"] = undefined;
  export let variant: TextFieldVariant = "filled";

  let nativeInputInvalid: boolean = false;
  export let customValidation: (
    value: any,
    nativeInputInvalid: boolean
  ) => boolean = undefined;

  let textFieldClassList: string = "";
  //#endregion

  export let type: "text" | "file" | "range" | "number" = "text";
  export let files = null;
  export let dirty: boolean = false;
  export let autocomplete: string = null;
  export let maxLength: number = null;

  let withLeadingIcon = false;
  let withTrailingIcon = false;
  let helperTextId: string;
  let inputElement: HTMLInputElement;

  createInputFieldContext({
    setLeadingIcon(value) {
      withLeadingIcon = value;
    },
    setTrailingIcon(value) {
      withTrailingIcon = value;
    },
    setHelperTextId(id: string) {
      helperTextId = id;
    },
  });

  onMount(() => {
    invalid = inputElement.matches(":invalid");
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
      case "range":
        value = toNumber(e.target.value);
        break;
      case "file":
        files = e.target.files;
      // Fall through.
      default:
        value = e.target.value;
        break;
    }
  }

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
    class="{textFieldClassList}
      {className}
      {withLeadingIcon ? 'mdc-text-field--with-leading-icon' : ''}
      {withTrailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}"
    {style}>
    {#if ripple}
      <Ripple3
        target={dom}
        unbounded={false}
        {color}
        rippleElement="mdc-text-field__ripple" />
    {/if}
    <slot />
    <input
      bind:this={inputElement}
      {...props}
      {id}
      class="mdc-text-field__input"
      {type}
      maxlength={maxLength}
      {autocomplete}
      on:change={(e) => (type === 'file' || type === 'range') && valueUpdater(e)}
      on:input={(e) => type !== 'file' && valueUpdater(e)}
      on:change={changeHandler}
      aria-controls={helperTextId}
      aria-describedby={helperTextId}
      use:forwardDOMEvents />
    {#if variant === 'filled'}
      {#if label != null}
        <FloatingLabel wrapped>
          {label}
          <slot name="label" />
        </FloatingLabel>
      {/if}
      {#if ripple}
        <LineRipple />
      {/if}
    {:else if variant === 'outlined'}
      <NotchedOutline noLabel={label == null}>
        {#if label != null}
          <FloatingLabel wrapped>
            {label}
            <slot name="label" />
          </FloatingLabel>
        {/if}
      </NotchedOutline>
    {/if}
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
  {nativeInputInvalid}
  {customValidation}
  {color}
  {variant}
  bind:classList={textFieldClassList}
  {dom} />
