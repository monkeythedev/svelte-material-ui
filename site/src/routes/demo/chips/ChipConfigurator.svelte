<script lang="ts">
	import { Button, Label, Icon } from "@smui/button";
	import { Checkbox } from "@smui/checkbox";
	import {
		ChipSet,
		Text,
		ChipSetVariant,
		SMUIChipRemoveEventDetail,
		SMUIChipSelectedEventDetail,
		Checkmark
	} from "@smui/chips";
	import Chip from "./_Chip.svelte";
	import { StringListToFilter } from "@smui/common/functions";
	import { FormField } from "@smui/form-field";
	import { Select, Option } from "@smui/select";
	import { Configurator } from "src/components/configurator";
	import IconTypeOption, {
		IconType,
	} from "src/components/configurator/common-options/IconTypeOption.svelte";

	let variant: ChipSetVariant = undefined;
	let entryAnimation: boolean = true;

	let chips: ChipConf[] = [];
	for (let i = 0; i < 3; i++) addChip();

	let configurator: Configurator;
	let selectedChipValue: string = "0";
	$: selectedChip = getSelectedChip(chips, selectedChipValue);

	// $: configurator?.svelte(() => {
	// 	return {
	// 		tag: "Button",
	// 		props: props(ripple),
	// 		content: `
	// 			${getLeadingIconCode(leadingIcon)}
	// 			<Text>Chip</Text>
	// 			${getTrailingIconCode(trailingIcon)}
	// 		`,
	// 	};
	// });

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

	interface ChipConf {
		value: string;
		ripple: boolean;
		trailingIcon: IconType;
		leadingIcon: IconType;
		selected: boolean;
		removeOnTrailingIconClick: boolean;
		useCheckmark: boolean;
	}
</script>

<Configurator bind:this={configurator}>
	<div slot="preview">
		<ChipSet {variant} {entryAnimation}>
			{#each chips as chip, index (chip.value)}
				<Chip
					{...chip}
					on:remove={(event) => handleChipRemove(event.detail)}
					on:selected={(event) => (chip.selected = event.detail.selected)} />
			{/each}
		</ChipSet>
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
					<Option value="input">Input</Option>
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
				<Button on:click={addChip}>
					<Label>Add chip</Label>
					<Icon>add</Icon>
				</Button>
			</div>
		</div>
	</div>
</Configurator>
