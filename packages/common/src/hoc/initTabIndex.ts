import { SelectableContext } from "./SelectableContext";
import { SelectionType } from "./types";

// The first item of the list must have the attribute tabindex="0"
export function initTabIndex(selectionType: SelectionType, items: Set<SelectableContext>) {
  function findNonDisabledItemWithTabIndex0() {
    return Array.from(items).find(
      (item) => item.tabindex === 0 && !item.disabled
    );
  }

  function findFirstNonDisabledItem() {
    return Array.from(items).find((item) => !item.disabled);
  }

  function setTabIndex(firstItem: SelectableContext) {
    firstItem.setTabIndex(0);

    items.forEach((item) => {
      if (item !== firstItem) {
        item.setTabIndex(-1);
      }
    });
  }

  function getSelectedItems() {
    return Array.from(items).filter((item) => item.selected);
  }

  function hasInteractiveItems() {
    return selectionType != null && !!items.size;
  }

  if (hasInteractiveItems()) {
    let firstItem = getSelectedItems()[0];

    if (firstItem) {
      setTabIndex(firstItem);
    } else if (!firstItem && !findNonDisabledItemWithTabIndex0()) {
      firstItem = findFirstNonDisabledItem();
      setTabIndex(firstItem);
    }
  } else if (selectionType == null) {
    items.forEach((item) => {
      item.setTabIndex(-1);
    });
    findFirstNonDisabledItem()?.setTabIndex(0);
  }
}