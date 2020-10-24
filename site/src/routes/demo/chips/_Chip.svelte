<script lang="ts">
	import { Chip, Text, Icon, Checkmark } from "@smui/chips";
	import { IconType } from "src/components/configurator/common-options/IconTypeOption.svelte";

	export let value: string;
	export let ripple: boolean = true;
	export let leadingIcon: IconType = undefined;
	export let trailingIcon: IconType = undefined;
	export let removeOnTrailingIconClick: boolean = false;
	export let selected: boolean = false;
	export let useCheckmark: boolean = true;
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
