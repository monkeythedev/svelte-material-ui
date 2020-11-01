<script lang="ts">
	import { Button, Label, Icon } from "@smui/core/button";
	import { Checkbox } from "@smui/core/checkbox";
	import {
		ChipSet,
		ChipSetVariant,
		SMUIChipRemoveEventDetail,
	} from "@smui/core/chips";
	import Chip from "./_Chip.svelte";
	import { StringListToFilter } from "@smui/core/common/functions";
	import { FormField } from "@smui/core/form-field";
	import { Select, Option } from "@smui/core/select";
	import {
		Configurator,
		generateSvelteCode,
		indentCode,
	} from "src/components/configurator";
	import IconTypeOption, {
		IconType,
	} from "src/components/configurator/common-options/IconTypeOption.svelte";
	import { tick } from "svelte";

	let variant: ChipSetVariant;
	let entryAnimation: boolean;
	let value: any[];

	let chips: ChipConf[] = [];

	let selectedChipValue: string;
	$: selectedChip = { ...getSelectedChip(chips, selectedChipValue) };

	initialData();

	let svelteCode: string;
	let chipSvelteCode: string;
	let scssCode: string;
	$: {
		svelteCode = generateSvelteCode({
			tag: "ChipSet",
			props: props(variant, entryAnimation),
			content: indentCode({ code: chipSvelteCode || "" }),
		});
	}

	$: {
		tick().then(() => {
			chipSvelteCode = chips
				.map((chip) => chip.instance?.getSvelteCode())
				.join("\n");
		});
	}

	function addChip() {
		chips = [
			...chips,
			{
				leadingIcon: undefined,
				trailingIcon: undefined,
				ripple: true,
				selected: false,
				removeOnTrailingIconClick: true,
				useCheckmark: true,
				value: `Chip ${
					chips.length > 0
						? Number(chips[chips.length - 1].value.split(" ")[1]) + 1
						: 0
				}`,
			},
		];
	}

	function handleChipRemove(event: SMUIChipRemoveEventDetail) {
		const index = chips.findIndex((chip) => chip.value === event.value);
		chips = chips.slice(0, index).concat(chips.slice(index + 1, chips.length));
	}

	function initialData() {
		variant = undefined;
		entryAnimation = true;

		chips = [];
		for (let i = 0; i < 3; i++) addChip();
		selectedChipValue = chips[0].value;
	}

	function props(
		variantValue: typeof variant,
		entryAnimationValue: typeof entryAnimation
	): StringListToFilter {
		return [
			[variantValue, "bind:value"],
			[variantValue, `variant="${variantValue}"`],
			[!entryAnimationValue, "entryAnimation={false}"],
		];
	}

	function getSelectedChip(
		_chips: typeof chips,
		_selectedChipValue: typeof selectedChipValue
	) {
		return chips.find((chip) => chip.value === selectedChipValue);
	}

	function setSelectedChipValue(conf: keyof ChipConf, value: any) {
		if (getSelectedChip(chips, selectedChipValue)) {
			(getSelectedChip(chips, selectedChipValue)[conf] as any) = value;
		}

		chips = [...chips];
	}

	function handleChipSelect(chip: ChipConf, selected: boolean) {
		chip.selected = selected;
		chips = [...chips];
	}

	interface ChipConf {
		value: string;
		ripple: boolean;
		trailingIcon: IconType;
		leadingIcon: IconType;
		selected: boolean;
		removeOnTrailingIconClick: boolean;
		useCheckmark: boolean;
		instance?: Chip;
	}
</script>

<svelte:options immutable={true} />

<Configurator {svelteCode} {scssCode}>
	<div slot="preview">
		<ChipSet {variant} {entryAnimation} bind:value>
			{#each chips as chip, index (chip.value)}
				<Chip
					{...chip}
					bind:this={chip.instance}
					on:remove={(event) => handleChipRemove(event.detail)}
					on:selected={(event) => handleChipSelect(chip, event.detail.selected)} />
			{/each}
		</ChipSet>
	</div>
	<div slot="values">
		{#if variant}
			value:
			{Array.isArray(value) ? `[${value.join(', ')}]` : `"${value}"`}
		{/if}
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div style="grid-column: span 2;">ChipSet</div>
		<div>
			<FormField>
				<Select bind:value={variant}>
					<span slot="label">Variant</span>
					<Option />
					<Option value="choice">Choice</Option>
					<Option value="filter">Filter</Option>
				</Select>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={entryAnimation} />
				<span slot="label">Entry animation</span>
			</FormField>
		</div>
		<div style="grid-column: span 2; margin-top: 1em">
			<FormField>
				<Select bind:value={selectedChipValue} nullable={false}>
					<span slot="label">Configure Chip</span>
					{#each chips as chip, index (chip.value)}
						<Option value={chip.value}>{chip.value}</Option>
					{/each}
				</Select>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox
					checked={selectedChip && selectedChip.ripple}
					on:change={(event) => setSelectedChipValue('ripple', event.detail.checked)} />
				<span slot="label">Ripple</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox
					checked={selectedChip && selectedChip.useCheckmark}
					on:change={(event) => setSelectedChipValue('useCheckmark', event.detail.checked)} />
				<span slot="label">Use Checkmark</span>
			</FormField>
		</div>
		<div>
			<IconTypeOption
				allowEmpty
				value={selectedChip ? selectedChip.leadingIcon : null}
				on:change={(event) => setSelectedChipValue('leadingIcon', event.detail.value)}
				label="Leading icon" />
		</div>
		<div>
			<IconTypeOption
				allowEmpty
				value={selectedChip ? selectedChip.trailingIcon : null}
				on:change={(event) => setSelectedChipValue('trailingIcon', event.detail.value)}
				label="Trailing icon" />
		</div>
		<div>
			<FormField>
				<Checkbox
					checked={selectedChip ? selectedChip.selected : null}
					on:change={(event) => setSelectedChipValue('selected', event.detail.checked)} />
				<span slot="label">Selected</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox
					checked={selectedChip ? selectedChip.removeOnTrailingIconClick : null}
					on:change={(event) => setSelectedChipValue('removeOnTrailingIconClick', event.detail.checked)} />
				<span slot="label">Remove on trailing icon click</span>
			</FormField>
		</div>
		<div style="grid-column: span 2;">
			<div style="display: flex; justify-content: flex-end;">
				<Button on:click={initialData}>
					<Label>Reset</Label>
				</Button>
				<Button on:click={addChip}>
					<Label>Add chip</Label>
					<Icon>add</Icon>
				</Button>
			</div>
		</div>
	</div>
</Configurator>
