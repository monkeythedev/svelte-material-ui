<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLInputElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // Radio
  import { MDCRadio } from "@material/radio";
  import { onMount, onDestroy, getContext } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { forwardEventsBuilder } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { prefixFilter } from "@smui/common/prefixFilter.js";
  import { useActions } from "@smui/common/useActions.js";
  import { getItemContext, getListContext } from "@smui/list";
  import { RadioContext } from "./RadioContext";

  const forwardEvents = forwardEventsBuilder(get_current_component());

  export let disabled: boolean = false;
  export let value: any = null;
  export let checked: boolean = false;
  export let input$class: string = "";
  export let input$props: BaseProps = {};

  // let formField = getContext('SMUI:form-field');

  //#region Init contexts
  let itemContext$ = getItemContext();
  let listContext$ = getListContext();

  const context = {} as RadioContext;
  $: Object.assign(context, {
    value
  });

  $: if (itemContext$) {
    $itemContext$.setValue(value);
  }

  $: if ($itemContext$.selected !== checked) {
    checked = $itemContext$.selected;
    if (checked) {
      $itemContext$.setSelected(true);
    } else {
      $itemContext$.setSelected(false);
    }
  }
  //#endregion

  let radio;
  onMount(() => {
    radio = new MDCRadio(dom);

    // if (formField && formField()) {
    //   formField().input = radio;
    // }
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

  onDestroy(() => {
    radio && radio.destroy();
  });

  function handleChange(e) {
    if (radio.checked && itemContext$) {
      $itemContext$.setSelected(true);
    }
  }
</script>

<div
  bind:this={dom}
  {...props}
  class="mdc-radio {className} {disabled ? 'mdc-radio--disabled' : ''}"
  {style}>
  <input
    class="mdc-radio__native-control {input$class}"
    use:forwardDOMEvents
    type="radio"
    {...input$props}
    {disabled}
    {value}
    {checked}
    on:change={handleChange}
    on:change
    on:input />
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle" />
    <div class="mdc-radio__inner-circle" />
  </div>
</div>
