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
  import { getInputFieldContext } from "../TextFieldContext";

  export let role: "button" = undefined;
  export let tabindex: number = role === "button" ? 0 : -1;
  export let ariaLabel: string = undefined;

  const inputFieldContext$ = getInputFieldContext();

  let icon: MDCTextFieldIcon;
  onMount(() => {
    if (!inputFieldContext$) icon = new MDCTextFieldIcon(dom);
  });

  onDestroy(() => {
    icon && icon.destroy();
  });
</script>

<i
  bind:this={dom}
  {id}
  {...props}
  class="mdc-text-field__icon {className}"
  {style}
  {tabindex}
  aria-hidden={tabindex === -1 ? 'true' : 'false'}
  aria-label={ariaLabel}
  use:forwardDOMEvents><slot /></i>
