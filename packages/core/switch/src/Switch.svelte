<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Switch
  import { MDCSwitch } from "@material/switch";
  import {
    onMount,
    onDestroy,
    getContext,
    createEventDispatcher,
  } from "svelte";
  import { Selectable } from "@smui/common/hoc";
  import { getFormFieldContext } from "@smui/form-field/src";
import { Use } from "@smui/common/hooks";

  export let disabled: boolean = false;
  export let checked: boolean = null;
  export let value: any = null;
  export let input$class: string = "";

  const dispatch = createEventDispatcher<{
    change: Event;
  }>();

  const formFieldContext$ = getFormFieldContext();

  let mdcSwitch: MDCSwitch;
  onMount(() => {
    mdcSwitch = new MDCSwitch(dom);
  });

  $: if (mdcSwitch) {
    if (mdcSwitch.checked !== checked) {
      mdcSwitch.checked = checked;
    }

    if (mdcSwitch.disabled !== disabled) {
      mdcSwitch.disabled = disabled;
    }

    if (mdcSwitch.checked !== checked) {
      mdcSwitch.checked = checked;
    }
  }

  onDestroy(() => {
    mdcSwitch && mdcSwitch.destroy();
  });

  function setFormFieldInput() {
    $formFieldContext$?.setInput(mdcSwitch);
  }

  function handleChange(event: Event) {
    dispatch("change", event);
  }
</script>

<Use effect once hook={setFormFieldInput}></Use>

<Selectable bind:selected={checked} bind:value>
  <div
    bind:this={dom}
    {...props}
    {id}
    class="mdc-switch {className}
      {disabled ? 'mdc-switch--disabled' : ''}
      {checked ? 'mdc-switch--checked' : ''}"
    {style}
    use:forwardDOMEvents>
    <div class="mdc-switch__track" />
    <div class="mdc-switch__thumb-underlay">
      <div class="mdc-switch__thumb">
        <input
          class="mdc-switch__native-control {input$class}"
          type="checkbox"
          role="switch"
          {disabled}
          bind:checked
          aria-checked={checked ? 'true' : 'false'}
          {value}
          on:change={handleChange} />
      </div>
    </div>
  </div>
</Selectable>
