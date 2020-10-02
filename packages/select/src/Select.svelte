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
  import ExtractNamedSlot from "@smui/common/src/components/ExtractNamedSlot.svelte";
  import { createInputFieldContext } from "@smui/textfield/src/TextFieldContext";

  export let ripple = true;
  export let disabled = false;
  export let enhanced = false;
  export let variant: "filled" | "outlined" = "filled";
  export let withLeadingIcon = false;
  export let value = "";
  export let selectedIndex = undefined;
  // Only needed for enhanced select and only needed on initialization.
  export let selectedText = "";
  export let dirty = false;
  export let invalid = undefined;
  export let updateInvalid = invalid === undefined;
  export let required = false;
  export let inputId = "SMUI-select-" + _count;
  export let input$use = [];
  export let input$class = "";
  export let label$class = "";
  export let menu$class = "";

  let inputElement;
  let helperTextId: string;
  let labelId: string;
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
  setContext("SMUI:select:option:enhanced", enhanced);

  let select: MDCSelect;
  onMount(async () => {
    select = new MDCSelect(dom);

    if (!ripple && select.ripple) {
      select.ripple.destroy();
    }

    if (updateInvalid) {
      invalid = inputElement.matches(":invalid");
    }

    select.listen("MDCSelect:change", (event: MDCSelectEvent) => {
      changeHandler(event);
    });
  });

  $: if (select && select.value !== value) {
    select.value = value;
  }

  $: if (select && select.selectedIndex !== selectedIndex) {
    if (selectedIndex === undefined) {
      selectedIndex = select.selectedIndex;
    } else {
      select.selectedIndex = selectedIndex;
    }
  }

  $: if (select && select.disabled !== disabled) {
    select.disabled = disabled;
  }

  $: if (select && select.valid !== !invalid) {
    if (updateInvalid) {
      invalid = !select.valid;
    } else {
      select.valid = !invalid;
    }
  }

  $: if (select && select.required !== required) {
    select.required = required;
  }

  onDestroy(() => {
    select && select.destroy();
  });

  function changeHandler(e: MDCSelectEvent) {
    value = e.detail.value;
    selectedIndex = e.detail.index;
    dirty = true;
    if (updateInvalid) {
      invalid = inputElement.matches(":invalid");
    }
  }
</script>

<div bind:this={dom}
  class="mdc-select
  {variant === "filled" ? "mdc-select--filled" : "mdc-select--outlined"}"
  {style}
  use:forwardDOMEvents>
  <div class="mdc-select__anchor" role="button" aria-haspopup="listbox" aria-labelledby="{labelId} {selectedTextId}">
    <span class="mdc-select__ripple"></span>
    <span id={selectedTextId} class="mdc-select__selected-text"></span>
    <span class="mdc-select__dropdown-icon">
      <svg
          class="mdc-select__dropdown-icon-graphic"
          viewBox="7 10 10 5">
        <polygon
            class="mdc-select__dropdown-icon-inactive"
            stroke="none"
            fill-rule="evenodd"
            points="7 10 12 15 17 10">
        </polygon>
        <polygon
            class="mdc-select__dropdown-icon-active"
            stroke="none"
            fill-rule="evenodd"
            points="7 15 12 10 17 15">
        </polygon>
      </svg>
    </span>
    {#if $$slots.label}
      <FloatingLabel component={Span}>
        <ExtractNamedSlot>
          <slot name="label" />
        </ExtractNamedSlot>
      </FloatingLabel>
    {/if}
    <span class="mdc-line-ripple"></span>
  </div>

  <Menu
    class="mdc-select__menu"
    fullWidth>
    <List role="listbox">
      <slot />
    </List>
  </Menu>
</div>

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
