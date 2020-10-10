<script lang="ts">
  import { Button, Label, ButtonVariant } from "@smui/button";
  import { Checkbox } from "@smui/checkbox";
  import { FormField } from "@smui/form-field";
  import { Option, Select } from "@smui/select";
  import { Slider } from "@smui/slider";
  import { Configurator } from "src/components/configurator";

  let disabled: boolean = false;
  let ripple: boolean = true;
  let variant: ButtonVariant = undefined;
  let density: number = 0;
  let link: boolean = false;

  function getDensity(density: number): number {
    return density ? density : null;
  }

  function getCodeProps(disabled, ripple, variant, density, link) {
    let props = [];
    if (disabled) props.push("disabled");
    if (ripple) props.push("ripple");
    if (variant) props.push(`variant="${variant}"`);
    if (density) props.push(`density={${getDensity(density)}}`);
    if (link) props.push(`href="javascript:void(0)"`);
    let result = props.join(" ");
    if (result.length > 0) result = " " + result;
    return result;
  }
</script>

<style lang="scss">
  .options-sidebar {
    display: grid;
    grid-template:
      "left right"
      / auto auto;
    gap: 0.6em;

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.6em;
    }
  }

  .left {
    grid-area: left;
  }

  .right {
    grid-area: right;
  }

  .slider-with-value {
    display: flex;
    align-items: center;
    gap: 1em;
  }
</style>

<Configurator>
  <div slot="preview">
    <Button
      {disabled}
      {ripple}
      {variant}
      density={getDensity(density)}
      href={link ? 'javascript:void(0)' : null}>
      <Label>Default</Label>
    </Button>
  </div>
  <div slot="options-sidebar" class="options-sidebar">
    <div class="left">
      <FormField>
        <Select bind:value={variant} style="width: 100%">
          <span slot="label">Variant</span>
          <Option value="" />
          <Option value="raised">Raised</Option>
          <Option value="unelevated">Unelevated</Option>
          <Option value="outlined">Outlined</Option>
        </Select>
      </FormField>
      <FormField align="end" vertical>
        <div class="slider-with-value">
          <span> {density} </span>
          <Slider bind:value={density} min={0} max={3} step={1} />
        </div>
        <span slot="label">Density</span>
      </FormField>
    </div>
    <div class="right">
      <FormField>
        <Checkbox bind:checked={disabled} />
        <span slot="label">Disabled</span>
      </FormField>
      <FormField>
        <Checkbox bind:checked={ripple} />
        <span slot="label">Ripple</span>
      </FormField>
      <FormField>
        <Checkbox bind:checked={link} />
        <span slot="label">Link</span>
      </FormField>
    </div>
  </div>
  <div slot="code">
    {`
      <Button${getCodeProps(disabled, ripple, variant, density, link)}>
        <Label>Button</Label>
      </Button>
    `}
  </div>
</Configurator>
