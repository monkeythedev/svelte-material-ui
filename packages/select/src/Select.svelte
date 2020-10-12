<script context="module" lang="ts">
  let count = 0;
</script>

<script lang="ts">
  let _count = count++;

  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = `SMUI-Select-${_count}`;

  export let dom: HTMLDivElement = undefined;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Select
  import { MDCSelect, MDCSelectEvent } from "@material/select";
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import { Menu } from "@smui/menu";
  import { List } from "@smui/list";
  import { FloatingLabel } from "@smui/floating-label";
  import { LineRipple } from "@smui/line-ripple";
  import { NotchedOutline } from "@smui/notched-outline";
  import { setCreateMDCMenuInstance } from "@smui/menu/src/MenuContext";
  import { Span } from "@smui/common/dom";
  import { ExtractNamedSlot } from "@smui/common/components";
  import { createInputFieldContext } from "@smui/textfield/src/TextFieldContext";
  import { SelectVariant } from "./types";
  import { UseState } from "@smui/common/hooks";

  export let ripple: boolean = true;
  export let disabled: boolean = false;
  export let variant: SelectVariant = "filled";
  export let value: any = null;
  export let dirty = false;
  export let customValidation: (value: any, init?: true) => boolean = undefined;
  export let required: boolean = false;

  let helperTextId: string;
  let labelId: string;
  let invalid = customValidation ? !customValidation(value, true) : false;
  const selectedTextId = `SMUI-Select-SelectedText-${_count}`;

  createInputFieldContext({
    setHelperTextId(id: string) {
      helperTextId = id;
    },
    setLabelId(id: string) {
      labelId = id;
    },
  });

  setCreateMDCMenuInstance(false);
  setContext("SMUI:list:role", "listbox");

  let select: MDCSelect;
  onMount(async () => {
    select = new MDCSelect(dom);

    select.listen("MDCSelect:change", (event: MDCSelectEvent) => {
      changeHandler(event);
    });
  });

  $: if (select) {
    if (select.value !== value) {
      select.value = value;
    }

    if (select.disabled !== disabled) {
      select.disabled = disabled;
    }

    if (select.required !== required) {
      select.required = required;
    }
  }

  onDestroy(() => {
    select && select.destroy();
  });

  function changeHandler(e: MDCSelectEvent) {
    value = e.detail.value;
    dirty = true;
  }

  function onValueChange(oldValue: any) {
    if (value !== oldValue && customValidation) {
      invalid = !customValidation(value);
    }
  }
</script>

<UseState {value} onUpdate={onValueChange} />

{""+value}
<div
  bind:this={dom}
  class="mdc-select {className}
  {variant === 'filled' ? 'mdc-select--filled' : ''}
  {variant === 'outlined' ? 'mdc-select--outlined' : ''}
  {disabled ? 'mdc-select--disabled' : ''}
  {required ? 'mdc-select--required' : ''}
  {$$slots.leadingIcon ? 'mdc-select--with-leading-icon' : ''}
  {invalid ? 'mdc-select--invalid' : ''}"
  {style}
  use:forwardDOMEvents>
  <div
    class="mdc-select__anchor"
    role="button"
    aria-haspopup="listbox"
    aria-labelledby="{labelId} {selectedTextId}"
    aria-required={required || null}
    aria-disabled={disabled || null}
    aria-controls={helperTextId}
    aria-describedby={helperTextId}>
    {#if ripple && variant === 'filled'}<span class="mdc-select__ripple" />{/if}
    {#if $$slots.leadingIcon}
      <ExtractNamedSlot>
        <slot name="leadingIcon" />
      </ExtractNamedSlot>
    {/if}
    <span id={selectedTextId} class="mdc-select__selected-text">{value}</span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
        <polygon
          class="mdc-select__dropdown-icon-inactive"
          stroke="none"
          fill-rule="evenodd"
          points="7 10 12 15 17 10" />
        <polygon
          class="mdc-select__dropdown-icon-active"
          stroke="none"
          fill-rule="evenodd"
          points="7 15 12 10 17 15" />
      </svg>
    </span>
    {#if variant === 'filled'}
      {#if $$slots.label}
        <FloatingLabel component={Span}>
          <ExtractNamedSlot>
            <slot name="label" />
          </ExtractNamedSlot>
        </FloatingLabel>
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
  </div>

  {#if ripple && variant === 'filled'}
    <LineRipple />
  {/if}

  <Menu class="mdc-select__menu" fullWidth>
    <List bind:value>
      <slot />
    </List>
  </Menu>
</div>
{#if $$slots.helperText}
  <ExtractNamedSlot>
    <slot name="helperText" />
  </ExtractNamedSlot>
{/if}

<!-- <div
  bind:this={dom}
  class="
    mdc-select
    {className}
    {disabled ? 'mdc-select--disabled' : ''}
    {variant === 'outlined' ? 'mdc-select--outlined' : ''}
    {variant === 'standard' ? 'smui-select--standard' : ''}
    {withLeadingIcon ? 'mdc-select--with-leading-icon' : ''}
    {invalid ? 'mdc-select--invalid' : ''}
  "
  use:forwardDOMEvents>
  <slot name="icon" />
  <i class="mdc-select__dropdown-icon" />
  {#if enhanced}
    <input
      bind:this={inputElement}
      type="hidden"
      {disabled}
      {required}
      id={inputId}
      {value}
      on:blur
      on:change
      on:input />
    <div
      id={inputId + '-smui-selected-text'}
      class="mdc-select__selected-text"
      role="button"
      aria-haspopup="listbox"
      aria-labelledby="{inputId + '-smui-label'} {inputId + '-smui-selected-text'}"
      aria-required={required ? 'true' : 'false'}>
      {selectedText}
    </div>
    <Menu
      class="mdc-select__menu {menu$class}"
      role="listbox"
      anchor={false}
      bind:anchorElement={dom}>
      <List>
        <slot />
      </List>
    </Menu>
  {:else}
    <select
      bind:this={inputElement}
      class="mdc-select__native-control {input$class}"
      {disabled}
      {required}
      id={inputId}
      on:blur
      on:change
      on:input><slot /></select>
  {/if}
  {#if variant !== 'outlined'}
    {#if !noLabel && label != null}
      <FloatingLabel
        for={inputId}
        id={inputId + '-smui-label'}
        class="{value !== '' ? 'mdc-floating-label--float-above' : ''} {label$class}">
        {label}
        <slot name="label" />
      </FloatingLabel>
    {/if}
    {#if ripple}
      <LineRipple />
    {/if}
  {/if}
  {#if variant === 'outlined'}
    <NotchedOutline noLabel={noLabel || label == null}>
      {#if !noLabel && label != null}
        <FloatingLabel
          for={inputId}
          class="{value !== '' ? 'mdc-floating-label--float-above' : ''} {label$class}">
          {label}
          <slot name="label" />
        </FloatingLabel>
      {/if}
    </NotchedOutline>
  {/if}
</div> -->
