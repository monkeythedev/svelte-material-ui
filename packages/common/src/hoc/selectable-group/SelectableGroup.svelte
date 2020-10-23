<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	import { SelectableContext, SelectionType } from "../";
	import { UseSelectableGroup } from "./";
	import {
		getSelectableGroupContext,
		SelectableGroupContext,
		setSelectableGroupContext,
	} from "./SelectableGroupContext";
	import { Writable } from "svelte/store";
	import { Use, UseState } from "../../hooks";
	import { createEventDispatcher } from "svelte";

	export let value: any = undefined;
	export let selectionType: SelectionType = "multi";
	export let indexHasValues: boolean = undefined;
	export let nullable: boolean = false;
	export let contextOverride$: Writable<SelectableGroupContext> = undefined;
	export let id: string = `@smui/common/hoc/SelectableGroup-${count++}`;
	export let initialized: boolean = false;

	let dispatch = createEventDispatcher();
	let selectableGroup: UseSelectableGroup;
	let valueState: UseState;

	const parentContext$ = getSelectableGroupContext();
	if (parentContext$ && contextOverride$ === undefined) {
		contextOverride$ = parentContext$;
	}

	let context$: Writable<SelectableGroupContext>;
	if (contextOverride$) {
		context$ = setSelectableGroupContext({
			notifyFocus(itemFocused: SelectableContext) {
				$contextOverride$.notifyFocus(itemFocused);
			},
			registerItem(item: SelectableContext) {
				$contextOverride$.registerItem(item);
			},
			unregisterItem(item: SelectableContext) {
				$contextOverride$.unregisterItem(item);
			},
			notifySelected(itemSelected: SelectableContext) {
				$contextOverride$.notifySelected(itemSelected);
			},
			notifyUnselected(itemDeselected: SelectableContext) {
				$contextOverride$.notifyUnselected(itemDeselected);
			},
			setValue(newValue: any) {
				$contextOverride$.setValue(newValue);
			},
			setItemSelected(index: number, selected: boolean) {
				$contextOverride$.setItemSelected(index, selected);
			},
			selectAll() {
				$contextOverride$.selectAll();
			},
			unselectAll() {
				$contextOverride$.unselectAll();
			},
			getItems() {
				return $contextOverride$.getItems();
			},
			value: $contextOverride$?.value,
			id,
		});
		initialized = true;
	} else {
		context$ = setSelectableGroupContext({
			notifyFocus(itemFocused: SelectableContext) {
				selectableGroup?.notifyFocus(itemFocused);
			},
			registerItem(item: SelectableContext) {
				selectableGroup?.registerItem(item);
			},
			unregisterItem(item: SelectableContext) {
				selectableGroup?.unregisterItem?.(item);
			},
			notifySelected(itemSelected: SelectableContext) {
				selectableGroup?.notifySelected(itemSelected);
			},
			notifyUnselected(itemDeselected: SelectableContext) {
				selectableGroup?.notifyUnselected(itemDeselected);
			},
			setValue(newValue: any) {
				selectableGroup?.setValue(newValue);
			},
			setItemSelected(index: number, selected: boolean) {
				selectableGroup?.setItemSelected(index, selected);
			},
			selectAll() {
				selectableGroup?.selectAll();
			},
			unselectAll() {
				selectableGroup?.unselectAll();
			},
			getItems() {
				return selectableGroup?.getItems();
			},
			value,
			id,
		});
	}

	$: if (contextOverride$) {
		$context$ = { ...$context$, value: $contextOverride$.value };
	} else {
		$context$ = { ...$context$, value };
	}

	function onSelfUpdated() {
		$contextOverride$?.setValue(value);
	}

	function onContextOverrideUpdate(contextOverride: SelectableGroupContext) {
		if (contextOverride && contextOverride.value !== value) {
			valueState.setValue(contextOverride.value);
		}
	}

	function onInit() {
		initialized = true;
		dispatch("init");
	}

	export function setValue(newValue: any) {
		$context$.setValue(newValue);
	}

	export function getValue() {
		return $context$?.value;
	}

	export function setItemSelected(index: number, selected: boolean) {
		$context$.setItemSelected(index, selected);
	}

	export function selectAll() {
		$context$.selectAll();
	}

	export function unselectAll() {
		$context$.unselectAll();
	}

	export function getItems(): Set<SelectableContext> {
		return $context$.getItems();
	}

	export function getContext(): Writable<SelectableGroupContext> {
		return context$;
	}
</script>

<svelte:options immutable={true} />

{#if contextOverride$}
	<UseState bind:this={valueState} {value} onUpdate={onSelfUpdated} />
	<Use effect hook={() => onContextOverrideUpdate($contextOverride$)} />
{:else}
	<UseSelectableGroup
		bind:this={selectableGroup}
		bind:nullable
		bind:value
		bind:selectionType
		bind:indexHasValues
		on:change
		on:optionsUpdated
		on:init={onInit} />
{/if}

<slot />
