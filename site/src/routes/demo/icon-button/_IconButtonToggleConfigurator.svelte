<script lang="ts">
	import { IconButtonToggle, Icon } from "@smui/core/icon-button";
	import { Checkbox } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";
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
	let iconType: IconType = "material-icon";
	let active: boolean = false;

	let svelteCode: string;

	$: svelteCode = generateSvelteCode({
		tag: "IconButtonToggle",
		props: props(disabled, ripple),
		content: `
			${getOnIconCode(iconType)}
			${getOffIconCode(iconType)}
		`,
	});

	function props(
		disabledValue: typeof disabled,
		rippleValue: typeof ripple
	): StringListToFilter {
		return [
			`title="button"`,
			[disabledValue, `disabled`],
			[rippleValue, `ripple`],
		];
	}

	function getOnIconCode(selectedIconType: typeof iconType) {
		if (selectedIconType === "material-icon") {
			return `<Icon on>star</Icon>`;
		} else if (selectedIconType === "svg") {
			return `
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }} on>
					<circle cx="12" cy="12" r="12" />
				</Icon>
			`;
		} else {
			return `
				<Icon
					type="img"
					props={{ src: '/icons/emojis/grinning-face.png', alt: 'on' }}
					on />
			`;
		}
	}

	function getOffIconCode(selectedIconType: typeof iconType) {
		if (selectedIconType === "material-icon") {
			return `<Icon>star</Icon>`;
		} else if (selectedIconType === "svg") {
			return `
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
					<polygon points="0,24 12,0 24,24" />
				</Icon>
			`;
		} else {
			return `
				<Icon
					type="img"
					props={{ src: '/icons/emojis/upside-down-face.png', alt: 'off' }}/>
			`;
		}
	}
</script>

<style lang="scss">
	.options-sidebar {
		grid-template: auto;
	}
</style>

<Configurator {svelteCode}>
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
					props={{ src: '/icons/emojis/grinning-face.png', alt: 'on' }}
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
					props={{ src: '/icons/emojis/upside-down-face.png', alt: 'off' }} />
			{/if}
		</IconButtonToggle>
	</div>
	<div slot="values">active: {active}</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div>
			<IconTypeOption bind:value={iconType} label="Icons type" />
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
