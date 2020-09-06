<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement | HTMLUListElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};

  // List
  import { MDCList } from "@material/list";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Nav from "@smui/common/dom/Nav.svelte";
  import Ul from "@smui/common/dom/Ul.svelte";
  import { createListContext, getListContext, ListRole } from "./ListContext";
  import A from "@smui/common/dom/A.svelte";
  import { ItemContext } from "./ItemContext";
  import { createItemsStore } from "./ListStores";
  import { writable, Writable } from "svelte/store";
  import { getMenuContext } from "@smui/menu/src/MenuContext";
  import { getMenuSurfaceContext } from "@smui/menu-surface/src/MenuSurfaceContext";
  import { getDrawerContext } from "@smui/drawer/src/DrawerContext";
  import { arrEquals, memo } from "@smui/common/utils";
  import Item from "./Item.svelte";

  export let role: ListRole = "list";
  export let nonInteractive: boolean = false;
  export let orientation: "vertical" | "horizontal" = "vertical";

  export let dense: boolean = false;
  export let avatarList: boolean = false;
  export let twoLine: boolean = false;
  export let threeLine: boolean = false;
  export let wrapFocus: boolean = false;
  export let value: any = null;
  export let indexHasValues: boolean = null;

  const dispatch = createEventDispatcher();

  const menuContext$ = getMenuContext();
  const menuSurfaceContext$ = getMenuSurfaceContext();
  const drawerContext$ = getDrawerContext();
  const context$ = createListContext({
    notifyFocus(itemToFocus: ItemContext) {
      itemToFocus.setTabIndex("0");
      $context$.listItems.forEach((item) => {
        if (item !== itemToFocus) {
          item.setTabIndex("-1");
        }
      });
    },
    notifySelected(itemSelected: ItemContext) {
      const listItems = getListItems();
      const index = listItems.indexOf(itemSelected);

      if (isSingleSelectionList()) {
        setValue(itemSelected.value);

        $context$.listItems.forEach((item) => {
          if (item !== itemSelected) {
            item.setSelected(false);
          }
        });

        dispatch("change", {
          value,
          dom: itemSelected.dom,
        });
      } else if (isMultiSelectionList()) {
        updateMultiSelectionValue();
      }
    },
    notifyDeselected(itemDeselected: ItemContext) {
      const listItems = getListItems();
      const index = listItems.indexOf(itemDeselected);
      if (isSingleSelectionList() && list.selectedIndex === index) {
        list.selectedIndex = -1;

        setResetValue();
      } else if (isMultiSelectionList() && !isValueSynched()) {
        updateMultiSelectionValue();
      }
    },
    listItems: new Set(),
  });

  // The first item of the list must have the attribute tabindex="0"
  $: {
    function findNonDisabledItemWithTabIndex0() {
      return getListItems().find(
        (item) => item.tabindex === "0" && !item.disabled
      );
    }

    function findSelectedItem() {
      return getListItems().find((item) => item.selected);
    }

    function findFirstNonDisabledItem() {
      return getListItems().find((item) => !item.disabled);
    }

    function setTabIndex(firstItem: ItemContext) {
      firstItem.setTabIndex("0");

      $context$.listItems.forEach((item) => {
        if (item !== firstItem) {
          item.setTabIndex("-1");
        }
      });
    }

    if (hasInteractiveItems()) {
      let firstItem = findSelectedItem();

      if (firstItem) {
        setTabIndex(firstItem);
      } else if (!firstItem && !findNonDisabledItemWithTabIndex0()) {
        firstItem = findFirstNonDisabledItem();
        setTabIndex(firstItem);
      }
    } else if (nonInteractive) {
      $context$.listItems.forEach((item) => {
        item.setTabIndex("-1");
      });
      findFirstNonDisabledItem()?.setTabIndex("0");
    }
  }

  // Try to use index as values if no items has value or indexHasValues is true
  $: if ($context$ && indexHasValues !== false && hasInteractiveItems()) {
    const listItems = getListItems();
    if (indexHasValues || !listItems.some((item) => item.value != null)) {
      listItems.forEach((item, index) => item.setValue(index));
      if (value == null) setValue(-1);
    }
  }

  let component: typeof Nav | typeof Ul;
  $: component = drawerContext$ ? Nav : Ul;

  $: if (menuSurfaceContext$) {
    role = "menu";
  }

  $: if (drawerContext$) {
    wrapFocus = true;
  }

  let list: MDCList;
  onMount(async () => {
    if (
      !menuContext$ &&
      $drawerContext$?.variant !== "dismissible" &&
      $drawerContext$?.variant !== "modal"
    ) {
      list = new MDCList(dom);
      list.listen("MDCList:action", handleAction);
    }
  });

  $: $context$ = { ...$context$, role, isNav: !!drawerContext$, list };

  $: if (list) {
    if (list.singleSelection !== isSingleSelectionList()) {
      list.singleSelection = isSingleSelectionList();
    }

    if (
      orientation === "vertical" &&
      (!list.vertical == null || list.vertical === false)
    ) {
      list.vertical = true;
    } else if (
      orientation === "horizontal" &&
      (list.vertical == null || list.vertical === true)
    ) {
      list.vertical = false;
    }

    if (list.wrapFocus !== wrapFocus) {
      list.wrapFocus = wrapFocus;
    }

    if (role === "list") {
      setValue(null);
    }
  }

  // React to value changes
  const valueMemo = memo();
  $: if (list && value !== valueMemo.val) {
    if (role != "list") {
      // If multiselection, value must be an array
      if (isMultiSelectionList()) {
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
          if (isSingleSelectionList()) {
            const itemToSelect = getListItems().find(
              (item) => item.value === value
            );
            
            if (!itemToSelect && !isResetValue()) {
              // Invalid value has been setted
              setValue(valueMemo.val);
            } else {
              setSelectedIndex(value); // Some bug of reactive declarations makes the declaration behave strange with list.selectedIndex = value
              itemToSelect.setSelected(true);
            }
          } else if (isMultiSelectionList()) {
            const itemsToSelect = getListItems().filter((item) =>
              value.includes(item.value)
            );
    
            if (~itemsToSelect.length && !isResetValue()) {
              // Invalid value has been setted
              setValue(valueMemo.val);
            } else {
              setSelectedIndex(value); // Some bug of reactive declarations makes the declaration behave strange with list.selectedIndex = value
              itemsToSelect.forEach((item) => item.setSelected(true));
            }
          }
        }
      }
  
      setValue(value);
    }
  }

  onDestroy(() => {
    list && list.destroy();
  });

  function setSelectedIndex(value: number | number[]) {
    list.selectedIndex = value;
  }

  function updateMultiSelectionValue() {
    const selectedItems = getSelectedItems();

    const newValue = selectedItems.map((item) => item.value);

    setValue(newValue);

    dispatch("change", {
      value,
      dom: selectedItems.map((item) => item.dom),
    });
  }

  function deselectAll() {
    $context$.listItems.forEach(item => item.setSelected(false));
    if (isSingleSelectionList()) {
    console.log(value);

      list.selectedIndex = -1;
      setResetValue();
    } else if (isMultiSelectionList()) {
      setResetValue();
      list.selectedIndex = value;
    }
  }

  function setResetValue() {
    if (isSingleSelectionList()) {
      setValue(value === -1 ? -1 : null);
    } else if (isMultiSelectionList()) {
      setValue([]);
    }
  }

  function isResetValue() {
    if (isSingleSelectionList()) {
      return value == null || value === -1;
    } else if (isMultiSelectionList()) {
      return value == null || value.length === 0;
    }
  }

  function isValueSynched() {
    if (isSingleSelectionList()) {
      return value === getSelectedItems()[0]?.value;
    } else if (isMultiSelectionList()) {
      const selectedValues = getSelectedItems().map((item) => item.value);
      return Array.isArray(value) && arrEquals(value, selectedValues);
    }
  }

  function isListSelectedIndexSynched() {
    if (isSingleSelectionList()) {
      return list.selectedIndex === getSelectedIndex();
    } else if (isMultiSelectionList()) {
      const selectedIndexes = getSelectedIndex() as number[];
      return (
        Array.isArray(list.selectedIndex) &&
        arrEquals(list.selectedIndex, selectedIndexes)
      );
    }
  }

  function setValue(newValue: any) {
    value = newValue;
    valueMemo.val = newValue;
  }

  function getSelectedItems() {
    return getListItems().filter((item) => item.selected);
  }

  function getItemsIndex(items: ItemContext[]) {
    const listItems = getListItems();
    return items.map((item) => listItems.indexOf(item));
  }

  function getSelectedIndex(): number | number[] {
    if (role === "list") {
      return null;
    } else if (role === "group") {
      return getItemsIndex(getSelectedItems());
    } else {
      return getItemsIndex(getSelectedItems())[0] ?? -1;
    }
  }

  function isSingleSelectionList() {
    return (!nonInteractive && role === "listbox") || role === "radiogroup";
  }

  function isMultiSelectionList() {
    return !nonInteractive && role === "group";
  }

  function hasInteractiveItems() {
    return !nonInteractive && $context$?.listItems.size;
  }

  function handleAction(e) {
    const item = getListItems()[e.detail.index];

    if (!list || !item || item.disabled) return;

    if (list.selectedIndex === e.detail.index) {
      item.setSelected(true);
    } else if (role === "list") {
      item.sendOnSelected();
    }
  }

  export function getListItems() {
    return Array.from($context$.listItems);
  }

  $: props = {
    ...props,
    role,
    "aria-orientation": orientation,
    "aria-hidden": menuSurfaceContext$ ? !$menuSurfaceContext$.open : null,
    tabindex: role === "menu" ? "-1" : null,
  };
</script>

<svelte:component
  this={component}
  {props}
  bind:dom
  class="mdc-list {className}
    {nonInteractive ? 'mdc-list--non-interactive' : ''}
    {dense ? 'mdc-list--dense' : ''}
    {avatarList ? 'mdc-list--avatar-list' : ''}
    {twoLine ? 'mdc-list--two-line' : ''}
    {threeLine && !twoLine ? 'smui-list--three-line' : ''}
    {orientation === 'horizontal' ? 'smui-list--horizontal' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</svelte:component>

<!-- {#if nav}
  <nav
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list {className}
    {nonInteractive ? 'mdc-list--non-interactive' : ''}
    {dense ? 'mdc-list--dense' : ''}
    {avatarList ? 'mdc-list--avatar-list' : ''}
    {twoLine ? 'mdc-list--two-line' : ''}
    {threeLine && !twoLine ? 'smui-list--three-line' : ''}
    "
    on:MDCList:action={handleAction}
    {...props}>
    <slot />
  </nav>
{:else}
  <ul
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list {className}
    {nonInteractive ? 'mdc-list--non-interactive' : ''}
    {dense ? 'mdc-list--dense' : ''}
    {avatarList ? 'mdc-list--avatar-list' : ''}
    {twoLine ? 'mdc-list--two-line' : ''}
    {threeLine && !twoLine ? 'smui-list--three-line' : ''}
    "
    {role}
    on:MDCList:action={handleAction}
    {...props}>
    <slot />
  </ul>
{/if} -->
