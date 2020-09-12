<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLInputElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Checkbox
  //#region  imports
  import { MDCCheckbox } from "@material/checkbox";
  import { onMount, onDestroy, getContext } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { prefixFilter } from "@smui/common/prefixFilter.js";
  import { getItemContext, getListContext } from "@smui/list";
  import {
    CheckboxContext,
    getCheckboxBehaviour,
    getDisableCheckboxMDCIstance,
  } from "./CheckboxContext";
  import { getFormFieldContext } from "@smui/form-field/src/FormFieldContext";
  import { getDataTableContext } from "@smui/data-table/src/DataTableContext";
  import { getSelectableContext } from "@smui/common/hoc";
  //#endregion

  //#region exports
  export let disabled: boolean = false;
  export let indeterminate: boolean = false;
  export let checked: boolean = false;
  export let value: any = null;
  export let input$class: string = "";
  export let input$props: BaseProps = {};
  //#endregion

  const behaviour = getCheckboxBehaviour();
  const disableMDC = getDisableCheckboxMDCIstance();

  //#region Init contexts
  //const itemContext$ = getItemContext();
  const listContext$ = getListContext();
  const formFieldContext$ = getFormFieldContext();
  const dataTableContext$ = getDataTableContext();
  const selectable$ = getSelectableContext();

  const context = {} as CheckboxContext;
  $: Object.assign(context, {
    value,
  });

  $: if (selectable$) {
    $selectable$.setValue(value);

    if ($selectable$.selected !== checked) {
      checked = $selectable$.selected;
    }
  }
  //#endregion

  // let addChangeHandler = getContext("SMUI:generic:input:addChangeHandler");
  // let context = getContext("SMUI:checkbox:context");
  // let getDataTableRowIndex = getContext("SMUI:data-table:row:getIndex");
  // let instantiate = getContext("SMUI:checkbox:instantiate");
  // let getInstance = getContext("SMUI:checkbox:getInstance");

  //#region MDC init/destroy
  let checkbox;
  onMount(async () => {
    if (!disableMDC) checkbox = new MDCCheckbox(dom);
  });

  $: if (checkbox) {
    if (checkbox.indeterminate !== indeterminate) {
      checkbox.indeterminate = indeterminate;
    }

    if (checkbox.checked !== checked) {
      checkbox.checked = checked;
    }

    if (checkbox.disabled !== disabled) {
      checkbox.disabled = disabled;
    }

    if (checkbox.value !== value) {
      checkbox.value = value;
    }
  }

  $: if (checkbox && $formFieldContext$?.instance) {
    $formFieldContext$.instance.input = checkbox;
  }

  onDestroy(() => {
    checkbox && checkbox.destroy();
  });
  //#endregion

  function handleChange(event: Event) {
    if (checkbox) {
      checked = checkbox?.checked;

      if (selectable$) {
        $selectable$.setSelected(checked);
      }
    }
  }
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-checkbox {className}
    {disabled ? 'mdc-checkbox--disabled' : ''}
    {behaviour === 'data-table-header' ? 'mdc-data-table__header-row-checkbox' : ''}
    {behaviour === 'data-table-row' ? 'mdc-data-table__row-checkbox' : ''}"
  {style}
  use:forwardDOMEvents>
  <input
    {...input$props}
    class="mdc-checkbox__native-control {input$class}"
    use:forwardDOMEvents
    id={formFieldContext$ && $formFieldContext$.inputId}
    type="checkbox"
    {disabled}
    {checked}
    {value}
    on:change={handleChange}
    on:input={handleChange} />
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
      <path
        class="mdc-checkbox__checkmark-path"
        fill="none"
        d="M1.73,12.91 8.1,19.28 22.79,4.59" />
    </svg>
    <div class="mdc-checkbox__mixedmark" />
  </div>
</div>

<!-- <div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="mdc-checkbox {className}
    {disabled ? 'mdc-checkbox--disabled' : ''}
    {context === 'data-table' && dataTableHeader ? 'mdc-data-table__header-row-checkbox' : ''}
    {context === 'data-table' && !dataTableHeader ? 'mdc-data-table__row-checkbox' : ''}"
  {...exclude($$props, [
    'use',
    'class',
    'disabled',
    'indeterminate',
    'group',
    'checked',
    'value',
    'valueKey',
    'input$',
  ])}>
  <input
    use:useActions={input$use}
    class="mdc-checkbox__native-control {input$class}"
    type="checkbox"
    {...inputProps}
    {disabled}
    bind:checked={nativeChecked}
    value={valueKey === uninitializedValue ? value : valueKey}
    on:change={handleChange}
    on:input={handleChange}
    on:change
    on:input
    {...exclude(prefixFilter($$props, 'input$'), ['use', 'class'])} />
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
      <path
        class="mdc-checkbox__checkmark-path"
        fill="none"
        d="M1.73,12.91 8.1,19.28 22.79,4.59" />
    </svg>
    <div class="mdc-checkbox__mixedmark" />
  </div>
</div> -->
