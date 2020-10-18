<script lang="ts">
  import { IconButton, IconButtonColor } from "@smui/icon-button";
  import { Checkbox } from "@smui/checkbox";
  import { FormField } from "@smui/form-field";
  import { Option, Select } from "@smui/select";
  import { Configurator } from "src/components/configurator";

  let disabled: boolean = false;
  let ripple: boolean = true;
  let color: IconButtonColor = undefined;
  let link: boolean = false;

  let svelteCode: string = "";
  $: svelteCode = `
      <IconButton${getCodeProps(color, disabled, ripple, link, "        ")}>
        build
      </IconButton>
    `;

  function getCodeProps(
    selectedColor: typeof color,
    disabledValue: typeof disabled,
    rippleValue: typeof ripple,
    linkValue: typeof link,
    space: string
  ) {
    let props = [];
    props.push(`title="button"`);
    if (selectedColor) props.push(`color="${selectedColor}"`);
    if (disabledValue) props.push("disabled");
    if (rippleValue) props.push("ripple");
    if (linkValue) {
      props.push(`href="javascript:void(0)"`);
      props.push(`target="_blank"`);
    }
    let result = props.join(" \n" + space);
    if (result.length > 0) result = " " + result;
    return result;
  }
</script>

<style lang="scss">
  .options-sidebar {
    display: grid;
    grid-template: auto / auto auto;
    gap: 0.6em;
    align-items: center;
  }
</style>

<Configurator svelte={svelteCode}>
  <div slot="preview">
    <IconButton
      title="button"
      {color}
      {disabled}
      {ripple}
      href={link ? 'javascript:void(0)' : undefined}
      target={link ? '_blank' : undefined}>
      build
    </IconButton>
  </div>
  <div slot="optionsSidebar" class="options-sidebar">
    <div>
      <FormField>
        <Select bind:value={color} style="width: 100%">
          <span slot="label">Color</span>
          <Option value="" />
          <Option value="primary">Primary</Option>
          <Option value="secondary">Secondary</Option>
        </Select>
      </FormField>
    </div>
    <div>
      <FormField>
        <Checkbox bind:checked={disabled} />
        <span slot="label">Disabled</span>
      </FormField>
    </div>
    <div>
      <FormField>
        <Checkbox bind:checked={ripple} />
        <span slot="label">Ripple</span>
      </FormField>
    </div>
    <div>
      <FormField>
        <Checkbox bind:checked={link} />
        <span slot="label">Link</span>
      </FormField>
    </div>
  </div>
</Configurator>
