<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement | HTMLUListElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // List
  //#region imports
  import { MDCList, MDCListActionEvent } from "@material/list";
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
  import {
    SelectableList,
    SelectionType,
    OnSelectableListChange,
  } from "@smui/common/hoc";
  import { getDialogContext } from "@smui/dialog";
  import Item from "./Item.svelte";
  //#endregion

  //#region exports
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
  //#endregion

  const dispatch = createEventDispatcher();

  //#region local varaibles
  const items = new Set<ItemContext>();
  let selectableList: SelectableList;

  let selectionType: SelectionType = null;
  $: if ((!nonInteractive && role === "listbox") || role === "radiogroup") {
    selectionType = "single";
  } else if (!nonInteractive && role === "group") {
    selectionType = "multi";
  } else {
    selectionType = null;
  }
  //#endregion

  //#region init contexts
  const menuContext$ = getMenuContext();
  const menuSurfaceContext$ = getMenuSurfaceContext();
  const drawerContext$ = getDrawerContext();
  const dialogContext$ = getDialogContext();

  const context$ = createListContext({
    notifyFocus(itemToFocus: ItemContext) {
      itemToFocus.setTabIndex("0");
      items.forEach((item) => {
        if (item !== itemToFocus) {
          item.setTabIndex("-1");
        }
      });
    },
    registerItem(item: ItemContext) {
      items.add(item);
    },
    unregisterItem(item: ItemContext) {
      items.delete(item);
    },
  });

  let component: typeof Nav | typeof Ul;
  $: component = drawerContext$ ? Nav : Ul;

  $: if (menuSurfaceContext$) {
    role = "menu";
  }

  $: if (drawerContext$) {
    wrapFocus = true;
  }

  // Try to use index as values if no items has value or indexHasValues is true
  $: if (list && indexHasValues !== false && hasInteractiveItems()) {
    if (shouldUseIndexHasValues()) {
      Array.from(items).forEach((item, index) => item.setValue(index));
      if (value == null) {
        list.selectedIndex = -1;
        selectableList.setValue(-1);
      }
    }
  }

  //#endregion

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

  //#region The first item of the list must have the attribute tabindex="0"
  $: if (list) {
    function findNonDisabledItemWithTabIndex0() {
      return Array.from(items).find(
        (item) => item.tabindex === "0" && !item.disabled
      );
    }

    function findFirstNonDisabledItem() {
      return Array.from(items).find((item) => !item.disabled);
    }

    function setTabIndex(firstItem: ItemContext) {
      firstItem.setTabIndex("0");

      items.forEach((item) => {
        if (item !== firstItem) {
          item.setTabIndex("-1");
        }
      });
    }

    if (hasInteractiveItems()) {
      let firstItem = getSelectedItems()[0];

      if (firstItem) {
        setTabIndex(firstItem);
      } else if (!firstItem && !findNonDisabledItemWithTabIndex0()) {
        firstItem = findFirstNonDisabledItem();
        setTabIndex(firstItem);
      }
    } else if (nonInteractive) {
      items.forEach((item) => {
        item.setTabIndex("-1");
      });
      findFirstNonDisabledItem()?.setTabIndex("0");
    }
  }
  //#endregion

  $: if (list && $dialogContext$?.isOpen) list.layout();

  // Keep context updated
  $: $context$ = { ...$context$, role, isNav: !!drawerContext$, list };

  // Keep MDCList properties updated
  $: if (list) {
    if (list.singleSelection !== (selectionType === "single")) {
      list.singleSelection = selectionType === "single";
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
      selectableList.setValue(null);
    }
  }

  onDestroy(() => {
    list && list.destroy();
  });

  function shouldUseIndexHasValues() {
    return indexHasValues || !someItemsHasValue();
  }

  function someItemsHasValue() {
    return Array.from(items).some((item) => item.value != null);
  }

  function setSelectedIndex(value: number | number[]) {
    list.selectedIndex = value;
  }

  function getSelectedItems() {
    return Array.from(items).filter((item) => item.selected);
  }

  function hasInteractiveItems() {
    return !nonInteractive && !!items.size;
  }

  function handleAction(event: MDCListActionEvent) {
    const item = Array.from(items)[event.detail.index];

    if (!list || !item || item.disabled) return;

    if (list.selectedIndex === event.detail.index) {
      selectableList.setItemSelected(event.detail.index, true);
    } else if (role === "list") {
      item.sendOnSelected();
    }
  }

  function handleChange(event: CustomEvent<OnSelectableListChange>) {
    if (selectionType === "single") {
      list.selectedIndex = event.detail.selectedItemsIndex[0] ?? -1;
    } else if (selectionType === "multi") {
      list.selectedIndex = event.detail.selectedItemsIndex;
    }

    items.forEach((item) => item.setTabIndex("-1"));
    Array.from(items)
      .find((item, index) => event.detail.selectedItemsIndex.includes(index))
      ?.setTabIndex("0");

    dispatch("change", {
      value,
      dom: dom,
    });
  }

  $: props = {
    ...props,
    role,
    "aria-orientation": orientation,
    "aria-hidden": menuSurfaceContext$ ? !$menuSurfaceContext$.open : null,
    tabindex: role === "menu" ? "-1" : null,
  };
</script>

<SelectableList
  bind:this={selectableList}
  bind:value
  {selectionType}
  on:change={handleChange}>
  <svelte:component
    this={component}
    bind:dom
    {props}
    {id}
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
</SelectableList>

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
