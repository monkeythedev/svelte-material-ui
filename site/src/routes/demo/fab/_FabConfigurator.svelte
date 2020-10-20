<script lang="ts">
  import { Fab, Icon, Label, FabVariant } from "@smui/fab";
  import { Checkbox } from "@smui/checkbox";
  import { FormField } from "@smui/form-field";
  import { Configurator } from "src/components/configurator";
	import { Option, Select } from "@smui/select";
	import IconTypeOption, {
    IconType,
  } from "src/components/configurator/common-options/IconTypeOption.svelte";
import { StringListToFilter } from "@smui/common/functions";

  let show: boolean = true;
  let primary: boolean = false;
  let variant: FabVariant = "";
	let ripple: boolean = true;
  let iconType: IconType = "material-icon";

  let configurator: Configurator;

  $: configurator?.svelte(() => {
    return {
      tag: "IconButton",
      props: props(show, ripple, primary, variant),
      content: `
				${getIconCode(iconType)}
				${variant === "extended" ? "<Label>Label</Label>" : ""}
			`,
    };
  });

  function props(
    showValue: typeof show,
    rippleValue: typeof ripple,
    primaryValue: typeof primary,
    variantValue: typeof variant
  ): StringListToFilter {
    return [
      `aria-label="fab"`,
      [rippleValue, `ripple`],
      [!showValue, `show={false}`],
      [primaryValue, `color="primary"`],
      [variantValue === "extended", `variant="extended"`],
      [variantValue === "mini", `variant="mini"`],
    ];
  }

  function getIconCode(selectedIconType: typeof iconType) {
    if (selectedIconType === "material-icon") {
      return `<Icon>favorite</Icon>`;
    } else if (selectedIconType === "svg") {
      return `
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
					<circle cx="12" cy="12" r="12" />
				</Icon>
			`;
    } else {
      return `
				<Icon
					type="img"
					props={{ src: '/icons/emojis/grinning-face.png', alt: 'Grinning face' }}/>
			`;
    }
  }
</script>

<style lang="scss">
  .options-sidebar {
    grid-template: auto / auto auto;
  }
</style>

<Configurator bind:this={configurator}>
  <div slot="preview">
    <Fab color={primary ? 'primary' : undefined} {variant} {show} {ripple}>
			{#if iconType === 'material-icon'}
        <Icon>favorite</Icon>
      {:else if iconType === 'svg'}
        <Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
          <circle cx="12" cy="12" r="12" />
        </Icon>
      {:else if iconType === 'img'}
        <Icon
          type="img"
          props={{ src: '/icons/emojis/grinning-face.png', alt: 'Grinning face' }} />
      {/if}
      {#if variant === 'extended'}
        <Label>Label</Label>
      {/if}
    </Fab>
  </div>
  <div slot="optionsSidebar" class="options-sidebar">
    <div>
      <FormField>
        <Select bind:value={variant}>
          <span slot="label">Variant</span>
          <Option value="" />
          <Option value="extended">Extended</Option>
          <Option value="mini">Mini</Option>
        </Select>
      </FormField>
		</div>
		<div>
			<IconTypeOption bind:value={iconType} />
		</div>
    <div>
      <FormField>
        <Checkbox bind:checked={show} />
        <span slot="label">Show</span>
      </FormField>
      <FormField>
        <Checkbox bind:checked={ripple} />
        <span slot="label">Ripple</span>
      </FormField>
    </div>
    <div style="justify-content: initial;">
      <FormField>
        <Checkbox bind:checked={primary} />
        <span slot="label">Primary</span>
      </FormField>
    </div>
  </div>
</Configurator>
