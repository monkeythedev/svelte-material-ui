<script lang="ts">
  import { Use, UseState } from "../../hooks";
  import { OnSelectableGroupChange } from "../types";
  import { initTabIndex } from "../initTabIndex";
  import { createEventDispatcher, tick } from "svelte";
  import { arrEquals } from "../../utils";
  import { SelectableContext, SelectionType } from "../";

  export let value: any = undefined;
  export let selectionType: SelectionType = "multi";
  export let indexHasValues: boolean = undefined;

  const items = new Set<SelectableContext>();
  let valueState: UseState;
  let initialized = false;

  const dispatch = createEventDispatcher<{
    change: {
      value: typeof value;
      selectedItemsIndex: number | number[];
    };
    optionsUpdated: typeof items;
  }>();

  function init() {
    // tick().then(() => { Probably it's not needed anymore since now Selectable and SelectableGroup use Hooks
    if (shouldUseIndexHasValues()) {
      let index = 0;
      items.forEach((item) => item.setValue(index++));
    }

    fixValue();

    if (value === undefined) {
      updateValueFromChildren();
    } else {
      if (!checkAndFixInvalidValue(undefined)) valueState.setValue(value);
      updateChildrenWithValue(undefined);
    }

    initTabIndex(selectionType, items);
    initialized = true;
    // });
  }

  function checkAndFixInvalidValue(oldValue) {
    const itemsArray = Array.from(items);

    if (itemsArray.length === 0) {
      setValue(undefined);
      return false;
    }

    if (selectionType === "single") {
      if (!itemsArray.some((item) => item.value === value)) {
        if (itemsArray.some((item) => item.value === oldValue)) {
          setValue(oldValue);
          return false;
        } else {
          setValue(itemsArray[0].value);
          return false;
        }
      }
    } else if (selectionType === "multi") {
      fixValue();
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

  function handleValueChange(oldValue: typeof value) {
    if (selectionType) {
      if (!checkAndFixInvalidValue(oldValue)) {
        return;
      }

      if (isResetValue()) {
        items.forEach((item) => item.setSelected(false));
      } else if (!isValueSynched()) {
        updateChildrenWithValue(oldValue);
      }

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
      } as OnSelectableGroupChange);
    } else {
      setValue(null);
    }
  }

  function fixValue() {
    // If multiselection, value must be an array
    if (selectionType === "multi") {
      if (value == null) {
        setResetValue();
      } else if (!Array.isArray(value)) {
        setValue([value]);
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
    if (value !== newValue && selectionType) value = newValue;
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
    if (selectionType === "single") {
      setResetValue();
    } else if (selectionType === "multi") {
      setResetValue();
    }
  }

  export function setItemSelected(index: number, selected: boolean) {
    Array.from(items)[index]?.setSelected(selected);
  }
</script>

<Use effect hook={init} />
<UseState bind:this={valueState} bind:value onUpdate={handleValueChange} />
