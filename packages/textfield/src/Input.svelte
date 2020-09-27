<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLInputElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Input
  import { onMount } from "svelte";
  import { getTextFieldContext } from "./TextFieldContext";

  export let type: "text" | "file" | "range" | "number" = "text";
  export let value: any = undefined;
  export let files = undefined;
  export let dirty: boolean = false;
  export let invalid: boolean = false;
  export let autocomplete: string = undefined;
  export let maxLength: number = undefined;

  const textFieldContext$ = getTextFieldContext();

  onMount(() => {
    invalid = dom.matches(":invalid");
  });

  function toNumber(value) {
    if (value === "") {
      return Number.NaN;
    }
    return +value;
  }

  function valueUpdater(e) {
    switch (type) {
      case "number":
      case "range":
        value = toNumber(e.target.value);
        break;
      case "file":
        files = e.target.files;
      // Fall through.
      default:
        value = e.target.value;
        break;
    }
  }

  function changeHandler(e) {
    dirty = true;
    invalid = dom.matches(":invalid");
  }
</script>

<input
  bind:this={dom}
  {...props}
  {id}
  class="mdc-text-field__input {className}"
  {style}
  {type}
  maxlength={maxLength}
  {autocomplete}
  on:change={(e) => (type === 'file' || type === 'range') && valueUpdater(e)}
  on:input={(e) => type !== 'file' && valueUpdater(e)}
  on:change={changeHandler}
  aria-controls={$textFieldContext$.helperTextId}
  aria-describedby={$textFieldContext$.helperTextId}
  use:forwardDOMEvents />
