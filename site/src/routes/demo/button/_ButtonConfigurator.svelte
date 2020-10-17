<script lang="ts">
  import { Button, Label, ButtonVariant, Icon } from "@smui/button";
  import { Checkbox } from "@smui/checkbox";
  import { FormField } from "@smui/form-field";
  import { Option, Select } from "@smui/select";
  import { Slider } from "@smui/slider";
  import { Configurator } from "src/components/configurator";
  import classes from "./button.module.scss";

  let disabled: boolean = false;
  let ripple: boolean = true;
  let variant: ButtonVariant = undefined;
  let density: number = 0;
  let link: boolean = false;
  let secondary: boolean = false;
  let leadingIcon: "material-icon" | "svg" | "" = "";
  let trailingIcon: "material-icon" | "svg" | "" = "";
  let customStyle: "mdc-mixins" | "custom-css" | "" = "";

  function getDensity(density: number): number {
    return density ? density : null;
  }

  let svelteCode: string = "";
  $: svelteCode = `
      <Button${getCodeProps(
        customStyle,
        disabled,
        ripple,
        variant,
        density,
        link,
        "        "
      )}>
        ${getLeadingIconCode(leadingIcon)}
        <Label>Button</Label>
        ${getTrailingIconCode(trailingIcon)}
      </Button>
    `;

  let scssCode: string = "";
  $: if (customStyle === "mdc-mixins") {
    scssCode = `
      @use "@material/button";
       
      .${getCustomStyleClass(customStyle)} {
        @include button.shape-radius(999px);
      }
    `;
  } else if (customStyle === "custom-css") {
    scssCode = `
      .${getCustomStyleClass(customStyle)} {
        --notchSize: #{shape.$small-component-radius * 2};

        // source: https://css-tricks.com/notched-boxes/
        -webkit-clip-path: polygon(
          0% var(--notchSize),
          var(--notchSize) 0%,
          calc(100% - var(--notchSize)) 0%,
          100% var(--notchSize),
          100% calc(100% - var(--notchSize)),
          calc(100% - var(--notchSize)) 100%,
          var(--notchSize) 100%,
          0% calc(100% - var(--notchSize))
        );
        clip-path: polygon(
          0% var(--notchSize),
          var(--notchSize) 0%,
          calc(100% - var(--notchSize)) 0%,
          100% var(--notchSize),
          100% calc(100% - var(--notchSize)),
          calc(100% - var(--notchSize)) 100%,
          var(--notchSize) 100%,
          0% calc(100% - var(--notchSize))
        );
      }
    `;
  } else {
    scssCode = "";
  }

  function getCustomStyleClass(selectedCustomStyle: typeof customStyle) {
    if (selectedCustomStyle === "mdc-mixins") return "button-shaped-round";
    else if (selectedCustomStyle === "custom-css") return "button-shaped-notch";
    else return null;
  }

  function getCodeProps(
    selectedCustomStyle: typeof customStyle,
    disabled: boolean,
    ripple: boolean,
    selectedVariant: typeof variant,
    density: number,
    link: boolean,
    space: string
  ) {
    let props = [];
    if (selectedCustomStyle)
      props.push(`class="${getCustomStyleClass(selectedCustomStyle)}"`);
    if (disabled) props.push("disabled");
    if (ripple) props.push("ripple");
    if (selectedVariant) props.push(`variant="${selectedVariant}"`);
    if (density) props.push(`density={${getDensity(density)}}`);
    if (link) {
      props.push(`href="javascript:void(0)"`);
      props.push(`target="_blank"`);
    }
    if (secondary) {
      props.push(`props="javascript:void(0)"`);
    }
    let result = props.join(" \n" + space);
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
      ". checkboxes"
      ". checkboxes"
      ". checkboxes"
      ". ."
      / auto auto;
    gap: 0.6em;
  }

  .checkboxes {
    grid-area: checkboxes;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

<Configurator svelte={svelteCode} scss={scssCode}>
  <div slot="preview">
    <Button
      class={classes[getCustomStyleClass(customStyle)]}
      {disabled}
      {ripple}
      {variant}
      density={getDensity(density)}
      href={link ? 'javascript:void(0)' : undefined}
      target={link ? '_blank' : undefined}
      color={secondary ? 'secondary' : undefined}>
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
    <div>
      <FormField>
        <Select bind:value={variant} style="width: 100%">
          <span slot="label">Variant</span>
          <Option value="" />
          <Option value="raised">Raised</Option>
          <Option value="unelevated">Unelevated</Option>
          <Option value="outlined">Outlined</Option>
        </Select>
      </FormField>
    </div>
    <div>
      <FormField align="end" vertical>
        <Slider bind:value={density} min={0} max={3} step={1} />
        <span slot="label">Density: {density}</span>
      </FormField>
    </div>
    <div>
      <FormField>
        <Select bind:value={leadingIcon} style="width: 100%">
          <span slot="label">Leading icon</span>
          <Option value="" />
          <Option value="material-icon">Material icon</Option>
          <Option value="svg">SVG</Option>
        </Select>
      </FormField>
    </div>
    <div>
      <FormField>
        <Select bind:value={customStyle} style="width: 100%">
          <span slot="label">Custom style</span>
          <Option value="" />
          <Option value="mdc-mixins">MDC Mixins</Option>
          <Option value="custom-css">Custom CSS</Option>
        </Select>
      </FormField>
    </div>
    <div class="checkboxes">
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
        <Checkbox bind:checked={secondary} />
        <span slot="label">Secondary color</span>
      </FormField>
    </div>
    <div>
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
