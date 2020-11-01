<script context="module" lang="ts">
	let count: number = 0;

	export interface SMUIChipRemoveEventDetail extends MDCChipRemovalEventDetail {
		dom: HTMLDivElement;
		value: any;
	}

	export interface SMUIChipSelectedEventDetail
		extends MDCChipSelectionEventDetail {
		dom: HTMLDivElement;
		value: any;
	}
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "@smui/common/functions";
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/chips/Chip:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Chip
	import {
		MDCChip,
		MDCChipRemovalEvent,
		MDCChipRemovalEventDetail,
		MDCChipSelectionEventDetail,
		MDCChipSelectionEvent,
	} from "@material/chips";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { getChipSetContext } from "./ChipSetContext";
	import { ChipContext, createChipContext } from "./ChipContext";
	import { Selectable } from "@smui/common/hoc";
	import { Use, UseState } from "@smui/common/hooks";

	export let value: any = null;
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let removeOnTrailingIconClick: boolean = true;

	const dispatch = createEventDispatcher<{
		remove: SMUIChipRemoveEventDetail;
		selected: SMUIChipSelectedEventDetail;
	}>();

	let selectable: Selectable;

	const chipSetContext$ = getChipSetContext();

	const context: ChipContext = {
		setChip(_chip: MDCChip) {
			if (chip !== _chip) {
				chip = _chip;
				if (!ripple) {
					destroyRipple();
				}

				// Workaround... MDC shouldn't remove element from DOM as stated in their own documentation https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips#removing-chips-from-the-dom
				chip.remove = () => {};
				chip.listen("MDCChip:removal", handleRemoval);

				chip.listen("MDCChip:selection", handleSelection);
			}
		},
		reinitializeMDC() {
			// Needed because MDC doesn't listen child node updates
			reinitializeMDC();
		},
	} as ChipContext;

	const context$ = createChipContext({ ...context });

	let chip: MDCChip;
	$: $context$ = {
		...Object.assign(context, {
			...context,
			chip,
			dom,
			selected,
		}),
	};

	$: if (chip) {
		if (chip.selected !== selected) {
			// Add class mdc-chip--selected
			chip.selected = selected;
		}

		if (chip.shouldRemoveOnTrailingIconClick !== removeOnTrailingIconClick) {
			chip.shouldRemoveOnTrailingIconClick = removeOnTrailingIconClick;
		}
	}

	onDestroy(() => {
		chip?.destroy();
		$chipSetContext$?.unregisterItem(context);
	});

	function syncRipple() {
		if (!ripple) {
			destroyRipple();
		} else {
			reinitializeMDC();
		}
	}

	function destroyRipple() {
		chip.ripple && chip.ripple.destroy();
	}

	function reinitializeMDC() {
		chip?.destroy();
		chip?.initialize();
		chip?.initialSyncWithDOM();
	}

	function registerChip() {
		if (chipSetContext$) {
			$chipSetContext$.registerItem(context);
		}
	}

	function handleSelection(event: MDCChipSelectionEvent) {
		selectable.setSelected(event.detail.selected);
		dispatch("selected", {
			...event.detail,
			value,
			dom,
		});
	}

	function handleRemoval(event: MDCChipRemovalEvent) {
		dispatch("remove", { ...event.detail, dom, value });
	}
</script>

<svelte:options immutable={true} />

<Selectable bind:this={selectable} bind:selected bind:value>
	<div
		bind:this={dom}
		{...props}
		{id}
		role="row"
		class={parseClassList([className, 'mdc-chip'])}
		{style}
		use:forwardDOMEvents>
		{#if ripple}
			<div class="mdc-chip__ripple" />
		{/if}
		<slot />
	</div>
</Selectable>

<Use effect hook={registerChip} />
<UseState value={ripple} onUpdate={syncRipple} />
