<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

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
  import { CheckboxContext } from "./CheckboxContext";
  //#endregion

  //#region exports
  export let disabled: boolean = false;
  export let indeterminate: boolean = false;
  export let checked: boolean = false;
  export let value: any = null;
  // export let input$use = [];
  export let input$class: string = "";
  export let input$props: BaseProps = {};
  //#endregion

  //#region Init contexts
  let itemContext$ = getItemContext();
  let listContext$ = getListContext();
  let dataTableContext$ = null;
  let dataTableHeaderContext$ = null;

  const context = {} as CheckboxContext;
  $: Object.assign(context, {
    value,
  });

  $: if (itemContext$) {
    $itemContext$.setValue(value);

    if ($itemContext$.selected !== checked) {
      checked = $itemContext$.selected;
    }
  }
  //#endregion

  // let formField = getContext("SMUI:form-field");
  // let addChangeHandler = g etContext("SMUI:generic:input:addChangeHandler");
  // let context = getContext("SMUI:checkbox:context");
  // let dataTableHeader = getContext("SMUI:data-table:row:header");
  // let getDataTableRowIndex = getContext("SMUI:data-table:row:getIndex");
  // let instantiate = getContext("SMUI:checkbox:instantiate");
  // let getInstance = getContext("SMUI:checkbox:getInstance");
  
  //#region MDC init/destroy
  let checkbox;
  onMount(async () => {
    checkbox = new MDCCheckbox(dom);

    // if (formField && formField()) {
    //   formField().input = checkbox;
    // }
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

  onDestroy(() => {
    checkbox && checkbox.destroy();
  });
  //#endregion

  function handleChange() {
    checked = checkbox.checked;

    if (itemContext$) {
      $itemContext$.setSelected(checked);
    }
  }
</script>

<div
  bind:this={dom}
  {...props}
  class="mdc-checkbox {className}
    {disabled ? 'mdc-checkbox--disabled' : ''}
    {dataTableContext$ && dataTableHeaderContext$ ? 'mdc-data-table__header-row-checkbox' : ''}
    {dataTableContext$ && !dataTableHeaderContext$ ? 'mdc-data-table__row-checkbox' : ''}"
  {style}
  use:forwardDOMEvents>
  <input
    class="mdc-checkbox__native-control {input$class}"
    use:forwardDOMEvents
    type="checkbox"
    {...input$props}
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
