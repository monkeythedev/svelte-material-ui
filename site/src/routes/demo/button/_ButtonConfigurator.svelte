<script lang="ts">
  import { Button, Label, ButtonVariant, Icon } from "@smui/button";
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
  let leadingIcon: "material-icon" | "svg" | "" = "";
  let trailingIcon: "material-icon" | "svg" | "" = "";
  let customStyle: "mdc-mixins" | "custom-css" | "" = "";

  function getDensity(density: number): number {
    return density ? density : null;
  }

  let svelteCode: string = "";
  $: svelteCode = `
      <Button${getCodeProps(disabled, ripple, variant, density, link)}>
        ${getLeadingIconCode(leadingIcon)}
        <Label>Button</Label>
        ${getTrailingIconCode(trailingIcon)}
      </Button>
    `;

  let scssCode: string = "";
  $: scssCode = customStyle ? `
      .buttonShapedRound {
        @include button.shape-radius(999px);
      }
    ` : "";

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

  function getLeadingIconCode(
    leadingIcon: "material-icon" | "svg" | ""
  ): string {
    if (leadingIcon === "material-icon") {
      return "<Icon>favorite</Icon>";
    } else if (leadingIcon === "svg") {
      return `
        <Icon svg props={{viewBox: "0 0 24 24"}}>
          <circle cx="12" cy="12" r="12">
        </Icon>
      `;
    } else {
      return "";
    }
  }

  function getTrailingIconCode(
    leadingIcon: "material-icon" | "svg" | ""
  ): string {
    if (leadingIcon === "material-icon") {
      return "<Icon>play_circle_filled</Icon>";
    } else if (leadingIcon === "svg") {
      return `
        <Icon svg props={{viewBox: "0 0 24 24"}}>
          <polygon points="0,24 12,0 24,24" />
        </Icon>
      `;
    } else {
      return "";
    }
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

{""+variant}
<Configurator svelte={svelteCode} scss={scssCode}>
  <div slot="preview">
    <Button
      {disabled}
      {ripple}
      {variant}
      density={getDensity(density)}
      href={link ? 'javascript:void(0)' : null}>
      {#if leadingIcon === 'material-icon'}
        <Icon>favorite</Icon>
      {:else if leadingIcon === 'svg'}
        <Icon svg props={{ viewBox: '0 0 24 24' }}>
          <circle cx="12" cy="12" r="12" />
        </Icon>
      {/if}
      <Label>Button</Label>
      {#if trailingIcon === 'material-icon'}
        <Icon>play_circle_filled</Icon>
      {:else if trailingIcon === 'svg'}
        <Icon svg props={{ viewBox: '0 0 24 24' }}>
          <polygon points="0,24 12,0 24,24" />
        </Icon>
      {/if}
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
      <FormField>
        <Select bind:value={leadingIcon} style="width: 100%">
          <span slot="label">Leading icon</span>
          <Option value="" />
          <Option value="material-icon">Material icon</Option>
          <Option value="svg">SVG</Option>
        </Select>
      </FormField>
      <FormField>
        <Select bind:value={customStyle} style="width: 100%">
          <span slot="label">Custom style</span>
          <Option value="" />
          <Option value="mdc-mixins">MDC Mixins</Option>
          <Option value="custom-css">Custom CSS</Option>
        </Select>
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
      <FormField>
        <Select bind:value={trailingIcon} style="width: 100%">
          <span slot="label">Trailing icon</span>
          <Option value="" />
          <Option value="material-icon">Material icon</Option>
          <Option value="svg">SVG</Option>
        </Select>
      </FormField>
    </div>
  </div>
</Configurator>
