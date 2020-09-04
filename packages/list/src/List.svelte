<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement | HTMLUListElement = null;
  export let props: any = {};

  // List
  import { MDCList } from "@material/list";
  import {
    onMount,
    onDestroy,
    getContext,
    setContext,
    createEventDispatcher,
  } from "svelte";
  import Nav from "@smui/common/dom/Nav.svelte";
  import Ul from "@smui/common/dom/Ul.svelte";
  import { createListContext, ListRole } from "./ListContext";
  import A from "@smui/common/dom/A.svelte";
  import { ItemContext } from "./ItemContext";
  import { createItemsStore } from "./ListStores";
  import { writable, Writable } from "svelte/store";

  export let role: ListRole = "list";
  export let nonInteractive: boolean = false;
  export let orientation: "vertical" | "horizontal" = "vertical";
  export let selectedIndex: number = null;

  export let dense: boolean = false;
  export let avatarList: boolean = false;
  export let twoLine: boolean = false;
  export let threeLine: boolean = false;
  export let wrapFocus: boolean = false;

  const dispatch = createEventDispatcher();

  let nav: boolean = getContext("SMUI:list:nav"); // TODO: $navContext$
  const context$ = createListContext({
    notifyFocus(itemToFocus: ItemContext) {
      itemToFocus.setTabIndex("0");
      $context$.listItems.forEach((item) => {
        if (item !== itemToFocus) {
          item.setTabIndex("-1");
        }
      });
    },
    notifySelected(itemToSelect: ItemContext, selected: boolean) {
      const index = getListItems().indexOf(itemToSelect);
      if (selected) {
        selectedIndex = index;

        $context$.listItems.forEach((item) => {
          if (
            item !== itemToSelect &&
            (role === "listbox" || role === "radiogroup")
          ) {
            item.setSelected(false);
          }
        });

        dispatch("change", {
          selectedIndex,
          dom: itemToSelect.dom,
        });
      } else {
        itemToSelect.setSelected(false);
        if (list.selectedIndex === index) {
          list.selectedIndex = -1;
        }
      }
    },
    listItems: new Set(),
  });

  // The first item of the list must have the attribute tabindex="0"
  $: {
    function findNonDisabledItemWithTabIndex0() {
      return Array.from($context$.listItems).find(
        (item) => item.tabindex === "0" && !item.disabled
      );
    }

    function findSelectedItem() {
      return Array.from($context$.listItems).find((item) => item.selected);
    }

    function findFirstNonDisabledItem() {
      return Array.from($context$.listItems).find((item) => !item.disabled);
    }

    function setTabIndex(firstItem: ItemContext) {
      firstItem.setTabIndex("0");

      $context$.listItems.forEach((item) => {
        if (item !== firstItem) {
          item.setTabIndex("-1");
        }
      });
    }

    if (!nonInteractive && $context$.listItems.size) {
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

  let component: typeof Nav | typeof Ul;
  $: component = nav ? Nav : Ul;

  let list: MDCList;

  onMount(async () => {
    list = new MDCList(dom);
    list.listen("MDCList:action", handleAction);
  });

  $: $context$ = { ...$context$, role, isNav: nav, list };

  $: if (list) {
    if (role === "listbox") {
      list.singleSelection = true;
    } else {
      list.singleSelection = false;
    }

    if (
      orientation === "vertical" &&
      (list.vertical == null || list.vertical === false)
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

    if (selectedIndex != null && role === "list") {
      selectedIndex = null;
    }

    if (selectedIndex != null && list.selectedIndex !== selectedIndex) {
      if (!getListItems()[selectedIndex]) {
        selectedIndex = list.selectedIndex as number;
      } else {
        list.selectedIndex = selectedIndex;
        getListItems()[selectedIndex].setSelected(true);
      }
    }
  }

  onDestroy(() => {
    list && list.destroy();
  });

  function handleAction(e) {
    const item = getListItems()[e.detail.index];

    if (!list || !item || item.disabled) return;

    if (list.selectedIndex === e.detail.index) {
      item.setSelected(true);
    } else if (role === "list") {
      item.sendOnSelected();
    }
  }

  export function layout() {
    return list.layout();
  }

  export function setEnabled(itemIndex: number, isEnabled: boolean) {
    getListItems()[itemIndex].setDisabled(!isEnabled);
    return list.setEnabled(itemIndex, isEnabled);
  }

  export function getDefaultFoundation() {
    return list.getDefaultFoundation();
  }

  export function getListItems() {
    return Array.from($context$.listItems);
  }
</script>

<svelte:component
  this={component}
  props={{}}
  bind:dom
  on:domEvent={forwardDOMEvents}
  class="mdc-list {className}
    {nonInteractive ? 'mdc-list--non-interactive' : ''}
    {dense ? 'mdc-list--dense' : ''}
    {avatarList ? 'mdc-list--avatar-list' : ''}
    {twoLine ? 'mdc-list--two-line' : ''}
    {threeLine && !twoLine ? 'smui-list--three-line' : ''}
    {orientation === 'horizontal' ? 'smui-list--horizontal' : ''}"
  {style}>
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
