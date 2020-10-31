<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	import { Use, UseState } from "../../hooks";
	import { OnSelectableGroupChange } from "../types";
	import { initTabIndex } from "../initTabIndex";
	import { createEventDispatcher, tick } from "svelte";
	import { arrEquals } from "../../utils";
	import { SelectableContext, SelectionType } from "../";
	import A from "@smui/common/dom/A.svelte";

	export let value: any = undefined;
	export let selectionType: SelectionType = "multi";
	export let indexHasValues: boolean = undefined;
	export let nullable: boolean = undefined;
	export const id: string = `@smui/common/hoc/UseSelectableGroup:${count++}`;

	const items = new Set<SelectableContext>();
	let valueState: UseState;
	let initialized = false;

	const dispatch = createEventDispatcher<{
		change: {
			value: typeof value;
			selectedItemsIndex: number | number[];
		};
		optionsUpdated: typeof items;
		init: undefined;
	}>();

	function init() {
		// tick().then(() => { Probably it's not needed anymore since now Selectable and SelectableGroup use Hooks
		if (shouldUseIndexHasValues()) {
			let index = 0;
			items.forEach((item) => item.setValue(index++));
		}

		//fixValue(); TODO: probably not needed

		if (value === undefined) {
			updateValueFromChildren();
			checkAndFixInvalidValue(value, undefined);
		} else {
			if (!checkAndFixInvalidValue(value, undefined)) {
				valueState.setValue(value);
				notifyValueChange();
			}
			updateChildrenWithValue(undefined);
		}

		initTabIndex(selectionType, items);
		initialized = true;
		dispatch("init");
		// });
	}

	function handleSelectionTypeUpdate(oldSelectionType: typeof selectionType) {
		if (initialized) {
			if (selectionType === null) {
				setValue(undefined);
			} else {
				checkAndFixInvalidValue(undefined, oldSelectionType);
			}
		}
	}

	function checkAndFixInvalidValue(
		oldValue: typeof value,
		oldSelectionType: typeof selectionType
	) {
		const itemsArray = Array.from(items);

		if (itemsArray.length === 0) {
			//setValue(null);
			setResetValue();
			return false;
		}

		fixValue();

		if (selectionType === "single") {
			if (oldSelectionType === "multi") {
				const validItem = itemsArray.find((item) => value.includes(item.value));
				if (validItem) {
					setValue(validItem.value);
				}
			}

			if (!itemsArray.some((item) => item.value === value)) {
				if (isResetValue() && nullable) {
					setResetValue();
				} else if (itemsArray.some((item) => item.value === oldValue)) {
					setValue(oldValue);

					return false;
				} else {
					if (nullable) {
						setResetValue();
					} else {
						setValue(itemsArray[0].value);
					}
					return false;
				}
			}
		} else if (selectionType === "multi") {
			const itemsList = itemsArray;
			const validValues = value.filter((value) =>
				itemsList.some((item) => item.value === value)
			);

			if (validValues.length !== value.length) {
				// TODO: use better comparison
				// Invalid value has been setted
				setValue(validValues);
				return false;
			}
		}

		return true;
	}

	function notifyValueChange() {
		const selectedItemsIndex = Array.from(items)
			.map((item, index) => ({ item, index }))
			.filter(({ item, index }) => {
				if (selectionType === "single") {
					return item.value === value;
				} else if (selectionType === "multi") {
					return value.includes(item.value);
				}
			})
			.map(({ item, index }) => index);

		let tabindexSetted = false;
		Array.from(items).forEach((item, index) => {
			if (!tabindexSetted && selectedItemsIndex.includes(index)) {
				item.setTabIndex(0);
			} else {
				item.setTabIndex(-1);
			}
		});

		dispatch("change", {
			value,
			selectedItemsIndex,
		});
	}

	function handleValueChange(oldValue: typeof value) {
		if (selectionType) {
			if (!checkAndFixInvalidValue(oldValue, undefined)) {
				return;
			}

			if (isResetValue()) {
				unselectAll();
			} else if (!isValueSynched()) {
				updateChildrenWithValue(oldValue);
			}

			notifyValueChange();
		} else {
			unselectAll();
			setValue(undefined);
		}
	}

	function fixValue() {
		if (value == null) {
			setResetValue();
		} else {
			if (selectionType === "multi") {
				// If multiselection, value must be an array
				if (!Array.isArray(value)) {
					setValue([value]);
				}
			}
		}
	}

	function updateValueFromChildren() {
		const selectedItems = getSelectedItems().map((item) => item.value);

		if (selectedItems.length) {
			if (selectionType === "single") {
				valueState.setValue(selectedItems[0]);
			} else if (selectionType === "multi") {
				valueState.setValue(selectedItems);
			}
		}
	}

	function updateChildrenWithValue(oldValue: typeof value) {
		if (isResetValue()) {
			unselectAll();
		} else {
			const itemsArray = Array.from(items);

			if (selectionType === "single") {
				const itemToSelect = itemsArray.find((item) => item.value === value);
				itemToSelect.setSelected(true);
			} else if (selectionType === "multi") {
				items.forEach((item) => {
					if (value.includes(item.value)) {
						item.setSelected(true);
					} else {
						item.setSelected(item.selected);
					}
				});
			}
		}
	}

	function isResetValue() {
		if (selectionType === "single") {
			return value === null;
		} else if (selectionType === "multi") {
			return value === null || value.length === 0;
		}
	}

	function shouldUseIndexHasValues() {
		return indexHasValues || !someItemsHasValue();
	}

	function someItemsHasValue() {
		return Array.from(items).some((item) => item.value != null);
	}

	function isValueSynched() {
		if (selectionType === "single") {
			return value === getSelectedItems()[0]?.value;
		} else if (selectionType === "multi") {
			const selectedValues = getSelectedItems().map((item) => item.value);
			return Array.isArray(value) && arrEquals(value, selectedValues);
		}
	}

	function getSelectedItems() {
		return Array.from(items).filter((item) => item.selected);
	}

	function setResetValue() {
		if (selectionType === "single") {
			setValue(null);
		} else if (selectionType === "multi") {
			setValue([]);
		}
	}

	function updateMultiSelectionValue() {
		const selectedItems = getSelectedItems();
		const newValue = selectedItems.map((item) => item.value);
		if (!arrEquals(value, newValue)) setValue(newValue);
	}

	export function registerItem(item: SelectableContext) {
		items.add(item);

		if (initialized) {
			dispatch("optionsUpdated", items);
		}
	}

	export function unregisterItem(item: SelectableContext) {
		items.delete(item);
		handleValueChange(undefined);

		if (initialized) {
			dispatch("optionsUpdated", items);
		}
	}

	export function notifyUnselected(itemDeselected: SelectableContext) {
		if (selectionType === "single") {
			// The active element has been deselected
			if (itemDeselected.value === value) setResetValue();
		} else if (
			selectionType === "multi" &&
			value.includes(itemDeselected.value)
		) {
			updateMultiSelectionValue();
		}
	}

	export function notifySelected(itemSelected: SelectableContext) {
		if (selectionType === "single") {
			items.forEach((item) => {
				if (item !== itemSelected) {
					item.setSelected(false);
				}
			});

			setValue(itemSelected.value);
		} else if (
			selectionType === "multi" &&
			!value.includes(itemSelected.value)
		) {
			updateMultiSelectionValue();
		}
	}

	export function notifyFocus(itemFocused: SelectableContext) {
		itemFocused.setTabIndex(0);
		items.forEach((item) => {
			if (item !== itemFocused) {
				item.setTabIndex(-1);
			}
		});
	}

	export function setValue(newValue: any) {
		if (selectionType) {
			if (value !== newValue) value = newValue;
		} else {
			value = undefined;
		}
	}

	export function getItems() {
		return items;
	}

	export function selectAll() {
		if (selectionType === "multi") {
			const values = Array.from(items).map((item) => item.value);
			value = values;
		}
	}

	export function unselectAll() {
		items.forEach((item) => item.setSelected(false));
	}

	export function setItemSelected(index: number, selected: boolean) {
		Array.from(items)[index]?.setSelected(selected);
	}
</script>

<svelte:options immutable={true} />

<Use effect hook={init} />
<UseState bind:this={valueState} bind:value onUpdate={handleValueChange} />
<UseState bind:value={selectionType} onUpdate={handleSelectionTypeUpdate} />
