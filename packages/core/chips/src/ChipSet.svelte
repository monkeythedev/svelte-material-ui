<script context="module" lang="ts">
	let count = 0;

	export type ChipSetVariant = "choice" | "filter";
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/src/functions";
	import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/chips/ChipSet:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// ChipSet
	import { MDCChipSet } from "@material/chips";
	import { onDestroy } from "svelte";
	import { SelectableGroup } from "@smui/common/hoc";
	import { createChipSetContext } from "./ChipSetContext";
	import { ChipContext } from "./ChipContext";
	import { arrRemove, arrAdd, arrHas } from "@smui/common/utils";
	import { Use, UseState } from "@smui/common/hooks";

	export let value: any = undefined;
	export let variant: ChipSetVariant = null;
	export let entryAnimation: boolean = true;

	let items: ChipContext[] = [];
	let selectableGroup: SelectableGroup;
	const context$ = createChipSetContext({
		registerItem(chip: ChipContext) {
			if (chipSet && !arrHas(items, chip)) {
				chipSet.addChip(chip.dom);
			}

			items = arrAdd(items, chip);
		},
		unregisterItem(chip: ChipContext) {
			items = arrRemove(items, chip);
		},
		variant,
	});

	$: $context$ = Object.assign($context$, {
		variant,
	});

	// Update chips instances
	$: if (chipSet && items.length) {
		syncChips();
	}

	let chipSet: MDCChipSet;
	/** Must be an hook because chip uses hooks to initialize */
	function initChipSet() {
		chipSet = new MDCChipSet(dom);
	}

	function reinitialize() {
		destroy();
		initChipSet();
		syncChips();
	}

	function syncChips() {
		Array.from(items).forEach((item, index) => {
			if (item.chip !== chipSet.chips[index]) {
				item.setChip(chipSet.chips[index]);
			}
		});
	}

	function destroy() {
		chipSet?.destroy();
	}

	onDestroy(() => {
		destroy();
	});
</script>

<svelte:options immutable={true} />

<UseState value={variant} onUpdate={reinitialize} />

<SelectableGroup
	bind:this={selectableGroup}
	nullable
	selectionType={variant === 'choice' ? 'single' : variant === 'filter' || variant === 'input' ? 'multi' : null}
	bind:value>
	<div
		bind:this={dom}
		{...props}
		role="grid"
		{id}
		class={parseClassList([
			className,
			'mdc-chip-set',
			[entryAnimation, 'mdc-chip-set--input'],
			[variant === 'choice', 'mdc-chip-set--choice'],
			[variant === 'filter', 'mdc-chip-set--filter'],
		])}
		{style}
		use:forwardDOMEvents>
		<slot />
	</div>
</SelectableGroup>

<Use effect hook={initChipSet} />
