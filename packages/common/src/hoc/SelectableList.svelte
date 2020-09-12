<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import { arrEquals, memo } from "../utils";

  import {
    SelectableContext,
    setSelectableListContext,
    SelectionType,
  } from "./";
  import { OnSelectableListChange } from "./types";

  export let value: any = null;
  export let selectionType: SelectionType = "multi";
  export let selectedIndex: number = -1;
  export let indexHasValues: boolean = null;

  let mounted = false;

  const dispatch = createEventDispatcher();

  const items = new Set<SelectableContext>();

  const context$ = setSelectableListContext({
    registerItem(item: SelectableContext) {
      items.add(item);
    },
    unregisterItem(item: SelectableContext) {
      items.delete(item);
    },
    notifySelected(itemSelected: SelectableContext) {
      const listItems = Array.from(items);
      const index = listItems.indexOf(itemSelected);

      if (selectionType === "single") {
        items.forEach((item) => {
          if (item !== itemSelected) {
            item.setSelected(false);
          }
        });

        setValue(itemSelected.value);
      } else if (selectionType === "multi") {
        updateMultiSelectionValue();
      }
    },
    notifyDeselected(itemDeselected: SelectableContext) {
      const listItems = Array.from(items);
      const index = listItems.indexOf(itemDeselected);
      if (selectionType === "single" && selectedIndex === index) {
        // The active element has been deselected
        selectedIndex = -1;

        setResetValue();
      } else if (selectionType === "multi" && !isValueSynched()) {
        updateMultiSelectionValue();
      }
    },
  });

  $: $context$ = { ...$context$, value };

  const valueMemo = memo(value);
  //#region React to value changes
  $: if (mounted && value !== valueMemo.val) {
    handleValueChange();
  }
  //#endregion

  onMount(() => {
    mounted = true;
    handleValueChange();
  });

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
        deselectAll();
      } else {
        if (!isValueSynched()) {
          if (selectionType === "single") {
            const itemToSelect = Array.from(items).find(
              (item) => item.value === value
            );

            if (!itemToSelect) {
              // Invalid value has been setted
              setValue(valueMemo.val);
            } else {
              selectedIndex = value;
              itemToSelect.setSelected(true);
            }
          } else if (selectionType === "multi") {
            const invalidValue = !Array.from(items).some((item) =>
              value.includes(item.value)
            );

            if (invalidValue) {
              // Invalid value has been setted
              setValue(valueMemo.val);
            } else {
              selectedIndex = value;
              items.forEach((item) => {
                if (value.includes(item.value)) {
                  item.setSelected(true);
                } else {
                  item.setSelected(false);
                }
              });
            }
          }
        }
      }

      _setValue(value);

      const selectedItemsIndex = Array.from(items)
        .map((item, index) => ({ item, index }))
        .filter(({ item, index }) => item.selected)
        .map(({ item, index }) => index);

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

    setValue(newValue);
  }

  function getSelectedItems() {
    return Array.from(items).filter((item) => item.selected);
  }

  function setResetValue() {
    if (selectionType === "single") {
      setValue(value == null && !shouldUseIndexHasValues() ? null : -1);
    } else if (selectionType === "multi") {
      setValue([]);
    }
  }

  function isResetValue() {
    if (selectionType === "single") {
      return value == null || value === -1;
    } else if (selectionType === "multi") {
      return value == null || value.length === 0;
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

  function deselectAll() {
    items.forEach((item) => item.setSelected(false));
    if (selectionType === "single") {
      selectedIndex = -1;
      setResetValue();
    } else if (selectionType === "multi") {
      setResetValue();
      selectedIndex = value;
    }
  }

  function _setValue(_value: any) {
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
    items.forEach(item => item.setSelected(true));
  }

  export function unselectAll() {
    items.forEach(item => item.setSelected(false));
  }
</script>

<slot />
