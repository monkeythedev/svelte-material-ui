<script lang="ts" context="module">
  let counter: number = 0;

  export type FormFieldLabelAlign = "start" | "end";
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // FormField
  import { MDCFormField } from "@material/form-field";
  import { onMount, onDestroy, setContext } from "svelte";
  import { createFormFieldContext } from "./FormFieldContext";

  export let align: FormFieldLabelAlign = "start";
  export let inputId: string = `SMUI-form-field-${counter}`;
  export let noWrap: boolean = false;
  export let vertical: boolean = false;

  counter++;

  createFormFieldContext({
    inputId,
    setInput(input) {
      formField.input = input;
    },
  });

  let formField: MDCFormField;
  onMount(() => {
    formField = new MDCFormField(dom);
  });

  onDestroy(() => {
    formField && formField.destroy();
  });
</script>

<style lang="scss">
  .smui-form-field--vertical {
    display: flex;
    flex-direction: column;

    &.mdc-form-field--align-end {
      > label {
        margin-left: 0;
        margin-right: auto;
      }
    }
  }
</style>

<div
  bind:this={dom}
  {...props}
  class="mdc-form-field {className}
    {align === 'end' ? 'mdc-form-field--align-end' : ''}
    {noWrap ? 'mdc-form-field--nowrap' : ''}
    {vertical ? 'smui-form-field--vertical' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
  {#if $$slots.label}
    <label for={inputId}>
      <slot name="label" />
    </label>
  {/if}
</div>

<!-- <div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="
    mdc-form-field
    {className}
    {align === 'end' ? 'mdc-form-field--align-end' : ''}
  "
  {...exclude($$props, ['use', 'class', 'alignEnd', 'inputId', 'label$'])}
>
  <slot></slot>
  <label
    use:useActions={label$use}
    for={inputId}
    {...exclude(prefixFilter($$props, 'label$'), ['use'])}
  ><slot name="label"></slot></label>
</div> -->
