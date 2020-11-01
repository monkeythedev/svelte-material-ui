<script lang="ts">
	import { Chip, Text, Icon, Checkmark } from "@smui/core/chips";
	import { generateSvelteCode } from "src/components/configurator";
	import { IconType } from "src/components/configurator/common-options/IconTypeOption.svelte";

	export let value: string;
	export let ripple: boolean = true;
	export let leadingIcon: IconType = undefined;
	export let trailingIcon: IconType = undefined;
	export let removeOnTrailingIconClick: boolean = false;
	export let selected: boolean = false;
	export let useCheckmark: boolean = true;

	export function getSvelteCode() {
		return generateSvelteCode({
			tag: "Chip",
			props: [
				`value="${value}"`,
				[!ripple, "ripple={false}"],
				[selected, "selected"],
				[!removeOnTrailingIconClick, "removeOnTrailingIconClick={false}"],
			],
			content: `
				${useCheckmark ? "<Checkmark />" : ""}
				${leadingIconCode()}
				<Text>${value}</Text>
				${trailingIconCode()}
			`,
		});
	}

	function leadingIconCode() {
		if (leadingIcon === "material-icon") {
			return "<Icon>favorite</Icon>";
		} else if (leadingIcon === "svg") {
			return `
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
					<circle cx="12" cy="12" r="12" />
				</Icon>
			`;
		} else if (leadingIcon === "img") {
			return `
				<Icon
					type="img"
					props={{ src: '/icons/emojis/upside-down-face.png', alt: 'Upside down face' }} />
			`;
		} else {
			return "";
		}
	}

	function trailingIconCode() {
		if (trailingIcon === "material-icon") {
			return `<Icon>${
				removeOnTrailingIconClick ? "cancel" : "play_circle_filled"
			}</Icon>`;
		} else if (trailingIcon === "svg") {
			return `
				<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
					<polygon points="0,24 12,0 24,24" />
				</Icon>
			`;
		} else if (trailingIcon === "img") {
			return `
				<Icon
					type="img"
					props={{ src: '/icons/emojis/grinning-face.png', alt: 'grinning-face' }} />
			`;
		} else {
			return "";
		}
	}
</script>

<Chip
	{value}
	{ripple}
	{selected}
	{removeOnTrailingIconClick}
	on:remove
	on:selected>
	{#if useCheckmark}
		<Checkmark />
	{/if}
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
	<Text>{value}</Text>
	{#if trailingIcon === 'material-icon'}
		<Icon>{removeOnTrailingIconClick ? 'cancel' : 'play_circle_filled'}</Icon>
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
