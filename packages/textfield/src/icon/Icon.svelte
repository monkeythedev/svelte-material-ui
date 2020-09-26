<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLLabelElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Icon
  import { MDCTextFieldIcon } from "@material/textfield/icon";
  import { onMount, onDestroy } from "svelte";
  import { getTextFieldContext } from "../TextFieldContext";
  import UseState from "@smui/common/src/hooks/UseState.svelte";

  export let role: "button" = undefined;
  export let tabindex = role === "button" ? "0" : "-1";
  export let position: "trailing" | "leading";

  const textFieldContext$ = getTextFieldContext();

  onPositionUpdate();

  let icon: MDCTextFieldIcon;
  onMount(() => {
    icon = new MDCTextFieldIcon(dom);
  });

  onDestroy(() => {
    icon && icon.destroy();

    switch (position) {
      case "trailing": $textFieldContext$.setTrailingIcon(false); break;
      case "leading": $textFieldContext$.setLeadingIcon(false); break;
    }
  });

  function onPositionUpdate(oldPosition?: typeof position) {
    switch (position) {
      case "trailing": $textFieldContext$.setTrailingIcon(true); break;
      case "leading": $textFieldContext$.setLeadingIcon(true); break;
    }

    switch (oldPosition) {
      case "trailing": $textFieldContext$.setTrailingIcon(false); break;
      case "leading": $textFieldContext$.setLeadingIcon(false); break;
    }
  }
</script>

<UseState bind:value={position} onUpdate={onPositionUpdate}></UseState>

<i
  bind:this={dom}
  {...props}
  class="mdc-text-field__icon {className}
    {position === 'trailing' ? 'mdc-text-field__icon--trailing' : 'mdc-text-field__icon--leading'}"
  {style}
  {tabindex}
  aria-hidden={tabindex === '-1' ? 'true' : 'false'}
  use:forwardDOMEvents><slot /></i>
