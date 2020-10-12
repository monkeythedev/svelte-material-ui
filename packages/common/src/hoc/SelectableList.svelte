<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { Use, UseState } from "../hooks";
  import { arrEquals, memo } from "../utils";
  import {
    SelectableContext,
    setSelectableListContext,
    SelectionType,
  } from "./";
  import { OnSelectableListChange } from "./types";
  import { initTabIndex } from "./initTabIndex";

  export let value: any = undefined;
  export let selectionType: SelectionType = "multi";
  export let indexHasValues: boolean = undefined;

  const dispatch = createEventDispatcher<{
    change: {
      value: typeof value;
      selectedItemsIndex: number | number[];
    };
  }>();

  const items = new Set<SelectableContext>();

  const context$ = setSelectableListContext({
    notifyFocus(itemFocused: SelectableContext) {
      itemFocused.setTabIndex(0);
      items.forEach((item) => {
        if (item !== itemFocused) {
          item.setTabIndex(-1);
        }
      });
    },
    registerItem(item: SelectableContext) {
      items.add(item);
    },
    unregisterItem(item: SelectableContext) {
      items.delete(item);
    },
    notifySelected(itemSelected: SelectableContext) {
      debugger;
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
    },
    notifyUnselected(itemDeselected: SelectableContext) {
      if (selectionType === "single") {
        // The active element has been deselected
        if (itemDeselected.value === value) setResetValue();
      } else if (
        selectionType === "multi" &&
        value.includes(itemDeselected.value)
      ) {
        updateMultiSelectionValue();
      }
    },
  });

  $: $context$ = { ...$context$, value };

  const valueMemo = memo(value);

  function init() {
    tick().then(() => {
      if (shouldUseIndexHasValues()) {
        let index = 0;
        items.forEach((item) => item.setValue(index++));
      }

      if (value == null) {
        updateValueFromChildren();
      } else {
        updateChildrenWithValue();
      }

      initTabIndex(selectionType, items);
    });
  }

  function updateValueFromChildren() {
    const selectedItems = getSelectedItems().map((item) => item.value);

    if (selectedItems.length) {
      if (selectionType === "single") {
        _setValue(selectedItems[0]);
      } else if (selectionType === "multi") {
        _setValue(selectedItems);
      }
    }
  }

  function updateChildrenWithValue() {
    if (selectionType === "single") {
      const itemToSelect = Array.from(items).find(
        (item) => item.value === value
      );

      if (!itemToSelect) {
        // Invalid value has been setted
        setValue(valueMemo.val);
      } else {
        itemToSelect.setSelected(true);
      }
    } else if (selectionType === "multi") {
      const itemsList = Array.from(items);
      const validValues = value.filter((value) =>
        itemsList.some((item) => item.value === value)
      );

      if (validValues.length !== value.length) {
        // Invalid value has been setted
        setValue(validValues);
      } else {
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

  function handleValueChange() {
    if (selectionType) {
      // If multiselection, value must be an array
      if (selectionType === "multi") {
        if (value == null) {
          setResetValue();
        } else if (!Array.isArray(value)) {
          setValue([value]);
        }
      }

      if (isResetValue()) {
        items.forEach((item) => item.setSelected(false));
      } else {
        if (!isValueSynched()) {
          updateChildrenWithValue();
        }
      }

      _setValue(value);

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
      } as OnSelectableListChange);
    } else {
      setValue(null);
    }
  }

  function updateMultiSelectionValue() {
    const selectedItems = getSelectedItems();
    const newValue = selectedItems.map((item) => item.value);
    if (!arrEquals(value, newValue)) setValue(newValue);
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

  function _setValue(_value: any) {
    // Maybe in can be deleted, hooks will take care of comparing with previous value
    if (valueMemo.val !== _value && selectionType) {
      value = _value;
      valueMemo.val = value;
    }
  }

  export function setValue(_value: any) {
    if (value !== _value && selectionType) value = _value;
  }

  export function setItemSelected(index: number, selected: boolean) {
    Array.from(items)[index]?.setSelected(selected);
  }

  export function selectAll() {
    if (selectionType === "multi") {
      const values = Array.from(items).map(item => item.value);
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

  export function getItems() {
    return items;
  }
</script>

<Use effect hook={init} />
<UseState {value} onUpdate={handleValueChange} />

{""+value}
<slot />
