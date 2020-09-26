<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLLabelElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // TextField
  import { MDCTextField } from "@material/textfield";
  import { onMount, onDestroy, getContext } from "svelte";
  import { TextFieldVariant } from "./types";
  import FloatingLabel from "@smui/floating-label/FloatingLabel.svelte";
  import LineRipple from "@smui/line-ripple/src/LineRipple.svelte";
  import Input from "./Input.svelte";
  import { createTextFieldContext } from "./TextFieldContext";
  import { NotchedOutline } from "@smui/notched-outline";
  import Use from "@smui/common/src/hooks/Use.svelte";

  export let ripple: boolean = true;
  export let disabled: boolean = false;
  export let fullwidth: boolean = false;
  export let variant: TextFieldVariant = "filled";
  export let label: string = undefined;
  export let type: "text" = "text";
  export let value: any = undefined;
  export let files = null;
  export let dirty: boolean = false;
  export let invalid = null;
  export let autocomplete: string = null;
  export let maxLength: number = null;
  export let customValidation: (
    value: any,
    nativeInputInvalid: boolean
  ) => boolean = undefined;
  export let input$props: BaseProps = {};

  let withLeadingIcon = false;
  let withTrailingIcon = false;
  let nativeInputInvalid = false;
  let helperTextId: string;

  const context$ = createTextFieldContext({
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

  $: $context$ = { ...$context$, helperTextId };

  $: invalid = customValidation
    ? !customValidation(value, nativeInputInvalid)
    : nativeInputInvalid;

  let textField: MDCTextField;
  function init() {
    textField = new MDCTextField(dom);
    textField.useNativeValidation = false;

    if (!ripple) {
      textField.ripple && textField.ripple.destroy();
    }
  }

  $: if (textField) {
    if (textField.disabled !== disabled) {
      textField.disabled = disabled;
    }

    if (value != undefined && textField.value !== value) {
      textField.value = value;
    }

    if (textField.valid !== !invalid) {
      textField.valid = !invalid;
    }
  }

  onDestroy(() => {
    textField && textField.destroy();
  });
</script>

<label
  bind:this={dom}
  {...props}
  for=""
  class="mdc-text-field {className}
    {disabled ? 'mdc-text-field--disabled' : ''}
    {fullwidth ? 'mdc-text-field--fullwidth' : ''}
    {variant === 'filled' ? 'mdc-text-field--filled' : ''}
    {variant === 'outlined' ? 'mdc-text-field--outlined' : ''}
    {label == null ? 'mdc-text-field--no-label' : ''}
    {withLeadingIcon ? 'mdc-text-field--with-leading-icon' : ''}
    {withTrailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}
    {invalid ? 'mdc-text-field--invalid' : ''}">
  <slot />
  <Input
    props={input$props}
    {type}
    {disabled}
    {autocomplete}
    {maxLength}
    bind:value
    bind:files
    bind:dirty
    bind:invalid={nativeInputInvalid}
    on:change
    on:input />
  {#if variant !== 'outlined'}
    {#if label != null}
      <FloatingLabel wrapped>
        {label}
        <slot name="label" />
      </FloatingLabel>
    {/if}
    {#if ripple}
      <LineRipple />
    {/if}
  {/if}
  {#if variant === 'outlined'}
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

<Use effect once hook={init} />
