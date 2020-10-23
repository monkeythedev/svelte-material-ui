<script lang="ts">
	import { Button, Label, ButtonVariant } from "@smui/button";
	import { Checkbox } from "@smui/checkbox";
	import { Chip, ChipSet, Text, Icon, ChipSetVariant } from "@smui/chips";
	import { StringListToFilter } from "@smui/common/functions";
	import { FormField } from "@smui/form-field";
	import { Select, Option } from "@smui/select";
	import { Configurator } from "src/components/configurator";
	import IconTypeOption, {
		IconType,
	} from "src/components/configurator/common-options/IconTypeOption.svelte";

	let variant: ChipSetVariant = null;

	let ripple: boolean = true;
	let leadingIcon: IconType = undefined;
	let trailingIcon: IconType = undefined;
	let customStyle: "mdc-mixins" | "custom-css" | "" = "";

	let selected: boolean = false;
	let shouldRemoveOnTrailingIconClick: boolean = false;

	let configurator: Configurator;

	$: configurator?.svelte(() => {
		return {
			tag: "Button",
			props: props(ripple),
			content: `
				${getLeadingIconCode(leadingIcon)}
				<Text>Chip</Text>
				${getTrailingIconCode(trailingIcon)}
			`,
		};
	});

	function props(rippleValue: typeof ripple): StringListToFilter {
		return [`value="value"`, [rippleValue, `ripple`]];
	}

	function getDensity(density: number): number {
		return density ? density : null;
	}

	function getCustomStyleClass(selectedCustomStyle: typeof customStyle) {
		if (selectedCustomStyle === "mdc-mixins") return "button-shaped-round";
		else if (selectedCustomStyle === "custom-css") return "button-shaped-notch";
		else return null;
	}

	function getLeadingIconCode(selectedLeadingIcon: typeof leadingIcon): string {
		if (selectedLeadingIcon === "material-icon") {
			return `<Icon>favorite</Icon>`;
		} else if (selectedLeadingIcon === "svg") {
			return `
				<Icon type="svg" props={{viewBox: "0 0 24 24"}}>
					<circle cx="12" cy="12" r="12">
				</Icon>
			`;
		} else if (selectedLeadingIcon === "img") {
			return `
				<Icon	type="img"
						props={{ src: '/icons/emojis/grinning-face.png', alt: 'Grinning face' }}/>
			`;
		} else {
			return "";
		}
	}

	function getTrailingIconCode(
		selectedTrailingIcon: typeof trailingIcon
	): string {
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

<Configurator bind:this={configurator}>
	<div slot="preview">
		<ChipSet {variant}>
			<Chip value="value" {ripple} {selected} {shouldRemoveOnTrailingIconClick}>
				{#if leadingIcon === 'material-icon'}
					<Icon>favorite</Icon>
				{:else if leadingIcon === 'svg'}
					<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
						<circle cx="12" cy="12" r="12" />
					</Icon>
				{:else if leadingIcon === 'img'}
					<Icon
						type="img"
						props={{ src: '/icons/emojis/upside-down-face.png', alt: 'Upside down face' }} />
				{/if}
				<Text>Chip</Text>
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
			</Chip>
		</ChipSet>
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div style="grid-column: span 2;">ChipSet</div>
		<div style="grid-column: span 2;">
			<FormField>
				<Select bind:value={variant}>
					<span slot="label">Variant</span>
					<Option />
					<Option value="choice">Choice</Option>
					<Option value="filter">Filter</Option>
					<Option value="input">Input</Option>
				</Select>
			</FormField>
		</div>
		<div style="grid-column: span 2;">Chip</div>
		<div style="grid-column: span 2;">
			<FormField>
				<Checkbox bind:checked={ripple} />
				<span slot="label">Ripple</span>
			</FormField>
		</div>
		<div>
			<IconTypeOption
				allowEmpty
				bind:value={leadingIcon}
				label="Leading icon" />
		</div>
		<div>
			<IconTypeOption
				allowEmpty
				bind:value={trailingIcon}
				label="Trailing icon" />
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={selected} />
				<span slot="label">Selected</span>
			</FormField>
		</div>
	</div>
</Configurator>
