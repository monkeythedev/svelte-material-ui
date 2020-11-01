<script lang="ts">
	import { Button, Label, ButtonVariant, Icon } from "@smui/core/button";
	import { Checkbox } from "@smui/core/checkbox";
	import { StringListToFilter } from "@smui/core/common/functions";
	import { FormField } from "@smui/core/form-field";
	import { Option, Select } from "@smui/core/select";
	import { Slider } from "@smui/core/slider";
	import {
		Configurator,
		generateSvelteCode,
		generateSCSSCode,
	} from "src/components/configurator";
	import IconTypeOption, {
		IconType,
	} from "src/components/configurator/common-options/IconTypeOption.svelte";
	import classes from "./button.module.scss";

	let disabled: boolean = false;
	let ripple: boolean = true;
	let variant: ButtonVariant = undefined;
	let density: number = 0;
	let link: boolean = false;
	let secondary: boolean = false;
	let iconOnly: boolean = false;
	let leadingIcon: IconType = undefined;
	let trailingIcon: IconType = undefined;
	let customStyle: "mdc-mixins" | "custom-css" | "" = "";

	let svelteCode: string;
	let scssCode: string;

	$: svelteCode = generateSvelteCode({
		tag: "Button",
		props: props(
			customStyle,
			disabled,
			ripple,
			variant,
			density,
			link,
			iconOnly
		),
		content: `
			${getLeadingIconCode(leadingIcon, iconOnly)}
			${iconOnly ? "" : `<Label>Button</Label>`}
			${getTrailingIconCode(trailingIcon)}
		`,
	});

	$: {
		let content: string = "";

		if (customStyle === "mdc-mixins") {
			content = `
				@use "@material/button";
				
				.${getCustomStyleClass(customStyle)} {
					@include button.shape-radius(999px);
				}
			`;
		} else if (customStyle === "custom-css") {
			content = `
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
		}

		scssCode = generateSCSSCode({ content });
	}

	function props(
		selectedCustomStyle: typeof customStyle,
		disabledValue: typeof disabled,
		rippleValue: typeof ripple,
		selectedVariant: typeof variant,
		densityValue: typeof density,
		linkValue: typeof link,
		iconOnlyValue: typeof iconOnly
	): StringListToFilter {
		return [
			[iconOnlyValue, `style="padding: 0;"`],
			[
				selectedCustomStyle,
				`class="${getCustomStyleClass(selectedCustomStyle)}"`,
			],
			[disabledValue, `disabled`],
			[rippleValue, `ripple`],
			[selectedVariant, `variant="${selectedVariant}"`],
			[densityValue, `density={${getDensity(densityValue)}}`],
			[linkValue, `href="javascript:void(0)"`],
			[linkValue, `target="_blank"`],
			[secondary, `props="javascript:void(0)"`],
		];
	}

	function getDensity(density: number): number {
		return density ? density : null;
	}

	function getCustomStyleClass(selectedCustomStyle: typeof customStyle) {
		if (selectedCustomStyle === "mdc-mixins") return "button-shaped-round";
		else if (selectedCustomStyle === "custom-css") return "button-shaped-notch";
		else return null;
	}

	function getLeadingIconCode(
		selectedLeadingIcon: typeof leadingIcon,
		iconOnlyValue: boolean
	): string {
		if (selectedLeadingIcon === "material-icon") {
			return `<Icon${
				iconOnlyValue ? ` style="margin: 0"` : ""
			}>favorite</Icon>`;
		} else if (selectedLeadingIcon === "svg") {
			return `
				<Icon${
					iconOnlyValue ? ` style="margin: 0"` : ""
				} type="svg" props={{viewBox: "0 0 24 24"}}>
					<circle cx="12" cy="12" r="12">
				</Icon>
			`;
		} else if (selectedLeadingIcon === "img") {
			return `
				<Icon${iconOnlyValue ? ` style="margin: 0"` : ""}
						type="img"
						props={{ src: '/icons/emojis/grinning-face.png', alt: 'Grinning face' }}/>
			`;
		} else {
			return "";
		}
	}

	function getTrailingIconCode(
		selectedTrailingIcon: typeof trailingIcon
	): string {
		if (iconOnly) {
			return "";
		}

		if (selectedTrailingIcon === "material-icon") {
			return "<Icon>play_circle_filled</Icon>";
		} else if (selectedTrailingIcon === "svg") {
			return `
				<Icon svg props={{viewBox: "0 0 24 24"}}>
					<polygon points="0,24 12,0 24,24" />
				</Icon>
			`;
		} else if (selectedTrailingIcon === "img") {
			return `
				<Icon
						type="img"
						props={{ src: '/icons/emojis/upside-down-face.png', alt: 'on' }}
						on />
			`;
		} else {
			return "";
		}
	}
</script>

<Configurator {svelteCode} {scssCode}>
	<div slot="preview">
		<Button
			style={iconOnly ? 'padding: 0;' : undefined}
			class={classes[getCustomStyleClass(customStyle)]}
			{disabled}
			{ripple}
			{variant}
			density={getDensity(density)}
			href={link ? 'javascript:void(0)' : undefined}
			target={link ? '_blank' : undefined}
			color={secondary ? 'secondary' : undefined}>
			{#if leadingIcon === 'material-icon'}
				<Icon style={iconOnly ? 'margin: 0;' : undefined}>favorite</Icon>
			{:else if leadingIcon === 'svg'}
				<Icon
					style={iconOnly ? 'margin: 0;' : undefined}
					type="svg"
					props={{ viewBox: '0 0 24 24' }}>
					<circle cx="12" cy="12" r="12" />
				</Icon>
			{:else if leadingIcon === 'img'}
				<Icon
					style={iconOnly ? 'margin: 0;' : undefined}
					type="img"
					props={{ src: '/icons/emojis/upside-down-face.png', alt: 'Upside down face' }} />
			{/if}
			{#if !iconOnly}
				<Label>Button</Label>
			{/if}
			{#if trailingIcon === 'material-icon'}
				<Icon>play_circle_filled</Icon>
			{:else if trailingIcon === 'svg'}
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
					<polygon points="0,24 12,0 24,24" />
				</Icon>
			{:else if trailingIcon === 'img'}
				<Icon
					type="img"
					props={{ src: '/icons/emojis/grinning-face.png', alt: 'grinning-face' }} />
			{/if}
		</Button>
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
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
		<div style="grid-row: span 3">
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
			<FormField>
				<Checkbox bind:checked={iconOnly} />
				<span slot="label">Icon only</span>
			</FormField>
		</div>
		<div>
			<FormField align="end" vertical>
				<Slider bind:value={density} min={0} max={3} step={1} />
				<span slot="label">Density: {density}</span>
			</FormField>
		</div>
		<div>
			<IconTypeOption
				allowEmpty={!iconOnly}
				bind:value={leadingIcon}
				label="Leading icon" />
		</div>
		<div>
			<IconTypeOption
				allowEmpty={!iconOnly}
				disabled={iconOnly}
				bind:value={trailingIcon}
				label="Trailing icon" />
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
	</div>
</Configurator>
