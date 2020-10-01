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
  import { onMount, onDestroy } from "svelte";
  import { RadioContext } from "./RadioContext";
  import { getFormFieldContext } from "@smui/form-field/src/FormFieldContext";
  import { Selectable } from "@smui/common/hoc";

  export let disabled: boolean = false;
  export let value: any = undefined;
  export let checked: boolean = false;
  export let input$class: string = "";
  export let input$props: BaseProps = {};

  //#region Init contexts
  //let itemContext$ = getItemContext();
  let formFieldContext$ = getFormFieldContext();

  const context = {
    setSelected(selected) {
      checked = selected;
    },
  } as RadioContext;
  $: Object.assign(context, {
    value,
  } as RadioContext);
  //#endregion

  let radio;
  onMount(() => {
    radio = new MDCRadio(dom);
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

  function handleChange() {
    checked = radio.checked;
  }
</script>

<Selectable bind:value bind:selected={checked}>
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
</Selectable>

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
