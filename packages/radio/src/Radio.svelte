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

  // Radio
  import { MDCRadio } from "@material/radio";
  import { onMount, onDestroy, getContext } from "svelte";
  import { getItemContext } from "@smui/list";
  import { RadioContext } from "./RadioContext";
  import { getRadioGroupContext } from "./RadioGroupContext";
  import { getFormFieldContext } from "@smui/form-field/src/FormFieldContext";
  import { getSelectableContext } from "@smui/common/hoc";

  export let disabled: boolean = false;
  export let value: any = null;
  export let checked: boolean = false;
  export let input$class: string = "";
  export let input$props: BaseProps = {};

  // let formField = getContext('SMUI:form-field');

  //#region Init contexts
  //let itemContext$ = getItemContext();
  let radioGroupContext$ = getRadioGroupContext();
  let formFieldContext$ = getFormFieldContext();
  const selectable$ = getSelectableContext();

  const context = {
    setSelected(selected) {
      checked = selected;
    },
  } as RadioContext;
  $: Object.assign(context, {
    value,
  } as RadioContext);

  $: if (radioGroupContext$) {
    checked = $radioGroupContext$.value === value;
  }

  $: if (selectable$) {
    $selectable$.setValue(value);
  }

  $: if (selectable$ && $selectable$.selected !== checked) {
    checked = $selectable$.selected;
    if (checked) {
      notifySelectionToParents();
    } else {
      notifyDeselectionToParents();
    }
  }
  //#endregion

  let radio;
  onMount(() => {
    radio = new MDCRadio(dom);

    if (radioGroupContext$) {
      $radioGroupContext$;
    }
  });

  $: if (radio) {
    if (radio.checked !== checked) {
      radio.checked = checked;
    }

    if (radio.disabled !== disabled) {
      radio.disabled = disabled;
    }

    if (radio.value !== value) {
      radio.value = value;
    }
  }

  $: if (radio && $formFieldContext$?.instance) {
    $formFieldContext$.instance.input = radio;
  }

  onDestroy(() => {
    radio && radio.destroy();
  });

  function notifySelectionToParents() {
    $selectable$?.setSelected(true);
    $radioGroupContext$?.notifySelected(context);
  }

  function notifyDeselectionToParents() {
    $selectable$?.setSelected(false);

    if (radioGroupContext$ && $radioGroupContext$.value === value)
      $radioGroupContext$?.notifyUnselected(context);
  }

  function handleChange() {
    if (radio.checked) {
      notifySelectionToParents();
    }
  }
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-radio {className} {disabled ? 'mdc-radio--disabled' : ''}"
  {style}>
  <input
    {...input$props}
    class="mdc-radio__native-control {input$class}"
    use:forwardDOMEvents
    id={formFieldContext$ && $formFieldContext$.inputId}
    type="radio"
    {disabled}
    {value}
    {checked}
    on:change={handleChange} />
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle" />
    <div class="mdc-radio__inner-circle" />
  </div>
</div>

<!-- <div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="
    mdc-radio
    {className}
    {disabled ? 'mdc-radio--disabled' : ''}
  "
  {...exclude($$props, ['use', 'class', 'disabled', 'group', 'value', 'valueKey', 'input$'])}
>
  <input
    use:useActions={input$use}
    class="mdc-radio__native-control {input$class}"
    type="radio"
    {...inputProps}
    {disabled}
    value={valueKey === uninitializedValue ? value : valueKey}
    {checked}
    on:change={handleChange}
    on:change on:input
    {...exclude(prefixFilter($$props, 'input$'), ['use', 'class'])}
  />
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle"></div>
    <div class="mdc-radio__inner-circle"></div>
  </div>
</div> -->
