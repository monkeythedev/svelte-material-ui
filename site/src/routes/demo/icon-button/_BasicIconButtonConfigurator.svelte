<script lang="ts">
	import { IconButton, IconButtonColor, Icon } from "@smui/core/icon-button";
	import { Checkbox } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";
	import { Option, Select } from "@smui/core/select";
	import {
		Configurator,
		generateSvelteCode,
	} from "src/components/configurator";
	import IconTypeOption, {
		IconType,
	} from "src/components/configurator/common-options/IconTypeOption.svelte";
	import { StringListToFilter } from "@smui/core/common/functions";

	let disabled: boolean = false;
	let ripple: boolean = true;
	let color: IconButtonColor = undefined;
	let link: boolean = false;
	let iconType: IconType = "material-icon";

	let svelteCode: string;
	$: svelteCode = generateSvelteCode({
		tag: "IconButton",
		props: props(color, disabled, ripple, link),
		content: getIconCode(iconType),
	});

	function props(
		selectedColor: typeof color,
		disabledValue: typeof disabled,
		rippleValue: typeof ripple,
		linkValue: typeof link
	): StringListToFilter {
		return [
			`title="button"`,
			[selectedColor, `color="${selectedColor}"`],
			[disabledValue, `disabled`],
			[rippleValue, `ripple`],
			[linkValue, `href="javascript:void(0)"`],
			[linkValue, `target="_blank"`],
		];
	}

	function getIconCode(selectedIconType: typeof iconType) {
		if (selectedIconType === "material-icon") {
			return `<Icon>build</Icon>`;
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

<Configurator {svelteCode}>
	<div slot="preview">
		<IconButton
			title="button"
			{color}
			{disabled}
			{ripple}
			href={link ? 'javascript:void(0)' : undefined}
			target={link ? '_blank' : undefined}>
			{#if iconType === 'material-icon'}
				<Icon>build</Icon>
			{:else if iconType === 'svg'}
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
					<circle cx="12" cy="12" r="12" />
				</Icon>
			{:else if iconType === 'img'}
				<Icon
					type="img"
					props={{ src: '/icons/emojis/grinning-face.png', alt: 'Grinning face' }} />
			{/if}
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
			<IconTypeOption bind:value={iconType} />
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
