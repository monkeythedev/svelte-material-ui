<script lang="ts">
  import { MDCTextField } from "@material/textfield";
  import Use from "@smui/common/src/hooks/Use.svelte";
  import { onDestroy } from "svelte";
  import { TextFieldVariant } from "../types";
  import UseClassList, { ClassListToParse } from "./UseClassList.svelte";

  export let dom: HTMLLabelElement = null;
  export let ripple: boolean = true;
  export let value: any = undefined;
  export let invalid: boolean = false;
  export let disabled: boolean = false;
  export let nativeInputInvalid: boolean = false;
  export let label: boolean = false;
  export let fullWidth: boolean = false;
  export let variant: TextFieldVariant = "filled";

  export let customValidation: (
    value: any,
    nativeInputInvalid: boolean
  ) => boolean = undefined;
  export let classList: string = "";

  let textField: MDCTextField;
  function init() {
    textField = new MDCTextField(dom);
    textField.useNativeValidation = false;

    if (!ripple) {
      textField.ripple && textField.ripple.destroy();
    }
  }

  $: if (textField) {
    if (textField.disabled !== disabled) {
      textField.disabled = disabled;
    }

    if (value != undefined && textField.value !== value) {
      textField.value = value;
    }

    if (textField.valid !== !invalid) {
      textField.valid = !invalid;
    }
  }

  $: invalid = customValidation
    ? !customValidation(value, nativeInputInvalid)
    : nativeInputInvalid;

  onDestroy(() => {
    textField && textField.destroy();
  });

  let classListToParse: ClassListToParse;
  $: classListToParse = [
    "mdc-text-field",
    [disabled, "mdc-text-field--disabled"],
    [!label, "mdc-text-field--no-label"],
    [invalid, "mdc-text-field--invalid"],
    [fullWidth, "mdc-text-field--fullwidth"],
    [variant === "filled", "mdc-text-field--filled"],
    [variant === "outlined", "mdc-text-field--outlined"],
  ];
</script>

<UseClassList toParse={classListToParse} bind:parsed={classList} />
<Use effect once hook={init} />
