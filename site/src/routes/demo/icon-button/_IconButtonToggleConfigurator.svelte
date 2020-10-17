<script lang="ts">
  import { IconButtonColor, IconButtonToggle, Icon } from "@smui/icon-button";
  import { Checkbox } from "@smui/checkbox";
  import { FormField } from "@smui/form-field";
  import { Option, Select } from "@smui/select";
  import { Configurator } from "src/components/configurator";

  type IconType = "material-icon" | "svg" | "img";

  let disabled: boolean = false;
  let ripple: boolean = true;
  let iconType: IconType = "material-icon";
  let active: boolean = false;

  let svelteCode: string = "";
  $: svelteCode = `
      <IconButtonToggle${getCodeProps(disabled, ripple, "        ")}>
        ${getOnIconCode(iconType)}
      </IconButtonToggle>
    `;

  function getCodeProps(
    disabledValue: typeof disabled,
    rippleValue: typeof ripple,
    space: string
  ) {
    let props = [];
    props.push(`title={{on: 'button-toggle-on', off: 'button-toggle-off'}}`);
    props.push(`bind:active`);
    if (disabledValue) props.push("disabled");
    if (rippleValue) props.push("ripple");
    let result = props.join(" \n" + space);
    if (result.length > 0) result = " " + result;
    return result;
  }

  function getOnIconCode(selectedIconType: typeof iconType) {
    if (selectedIconType === "material-icon") {
      return `<Icon on>star</Icon>`
    } else if (selectedIconType === "svg") {
      return `
        <Icon type="svg" props={{ viewBox: '0 0 24 24' }} on>
          <circle cx="12" cy="12" r="12" />
        </Icon>
      `
    } else {
      return `
        <Icon
          type="img"
          props={{ src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/263/grinning-face_1f600.png', alt: 'on' }}
          on />
      `
    }
  }
</script>

<style lang="scss">
  .options-sidebar {
    display: grid;
    grid-template: auto;
    gap: 0.6em;
    align-items: center;
  }
</style>

<Configurator svelte={svelteCode}>
  <div slot="preview">
    <IconButtonToggle
      bind:active
      title={{ on: 'button-toggle-on', off: 'button-toggle-off' }}
      {disabled}
      {ripple}>
      {#if iconType === 'material-icon'}
        <Icon on>star</Icon>
      {:else if iconType === 'svg'}
        <Icon type="svg" props={{ viewBox: '0 0 24 24' }} on>
          <circle cx="12" cy="12" r="12" />
        </Icon>
      {:else if iconType === 'img'}
        <Icon
          type="img"
          props={{ src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/263/grinning-face_1f600.png', alt: 'on' }}
          on />
      {/if}
      {#if iconType === 'material-icon'}
        <Icon>star_border</Icon>
      {:else if iconType === 'svg'}
        <Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
          <polygon points="0,24 12,0 24,24" />
        </Icon>
      {:else if iconType === 'img'}
        <Icon
          type="img"
          props={{ src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/263/upside-down-face_1f643.png', alt: 'off' }} />
      {/if}
    </IconButtonToggle>
  </div>
  <div slot="values">active: {active}</div>
  <div slot="options-sidebar" class="options-sidebar">
    <div>
      <FormField>
        <Select bind:value={iconType} style="width: 100%">
          <span slot="label">Icons type</span>
          <Option value="material-icon">Material Icon</Option>
          <Option value="svg">SVG</Option>
          <Option value="img">Image</Option>
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
  </div>
</Configurator>
