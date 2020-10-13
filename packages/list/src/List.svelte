<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement | HTMLUListElement = undefined;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // List
  //#region imports
  import { MDCList, MDCListActionEvent } from "@material/list";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Nav from "@smui/common/dom/Nav.svelte";
  import Ul from "@smui/common/dom/Ul.svelte";
  import { createListContext, getCreateMDCListInstance, ListRole } from "./ListContext";
  import { ItemContext } from "./item";
  import { getMenuSurfaceContext } from "@smui/menu-surface/src/MenuSurfaceContext";
  import { getDrawerContext } from "@smui/drawer/src/DrawerContext";
  import {
    SelectableList,
    SelectionType,
    OnSelectableListChange,
  } from "@smui/common/hoc";
  import { getDialogContext } from "@smui/dialog";
  import { setDisableCheckboxMDCIstance } from "@smui/checkbox";
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
  export let value: any = undefined;
  export let indexHasValues: boolean = undefined;
  //#endregion

  const dispatch = createEventDispatcher<{
    change: {
      value: typeof value;
      dom: typeof dom;
    };
  }>();

  //#region local varaibles
  const items = new Set<ItemContext>();
  let selectableList: SelectableList;

  let selectionType: SelectionType = null;
  
  $: if (menuSurfaceContext$) {
    role = "menu";
  }

  $: if ((!nonInteractive && role === "listbox") || role === "radiogroup" || role === "menu") {
    selectionType = "single";
  } else if (!nonInteractive && role === "group") {
    selectionType = "multi";
  } else {
    selectionType = null;
  }
  //#endregion

  //#region init contexts
  const menuSurfaceContext$ = getMenuSurfaceContext();
  const drawerContext$ = getDrawerContext();
  const dialogContext$ = getDialogContext();

  const shouldCreateMDCListInstance = getCreateMDCListInstance();
  setDisableCheckboxMDCIstance(true);

  const context$ = createListContext({
    registerItem(item: ItemContext) {
      items.add(item);
    },
    unregisterItem(item: ItemContext) {
      items.delete(item);
    },
  });

  let component: typeof Nav | typeof Ul;
  $: component = drawerContext$ ? Nav : Ul;

  $: if (drawerContext$) {
    wrapFocus = true;
  }

  // Try to use index as values if no items has value or indexHasValues is true
  $: if (list && value == null) {
    if (selectionType === "single") {
      list.selectedIndex = -1;
    } else if (selectionType === "multi") {
      list.selectedIndex = [];
    }
  }

  //#endregion

  let list: MDCList;
  onMount(async () => {
    if (
      shouldCreateMDCListInstance !== false &&
      $drawerContext$?.variant !== "dismissible" &&
      $drawerContext$?.variant !== "modal"
    ) {
      list = new MDCList(dom);
      list.listen("MDCList:action", handleAction);
    }
  });

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

  function handleAction(event: MDCListActionEvent) {
    const item = Array.from(items)[event.detail.index];

    if (!list || !item || item.disabled) return;

    if (selectionType) {
      if (
        (selectionType === "single" &&
          list.selectedIndex === event.detail.index) ||
        (selectionType === "multi" &&
          (list.selectedIndex as number[]).includes(event.detail.index))
      ) {
        selectableList.setItemSelected(event.detail.index, true);
      } else {
        selectableList.setItemSelected(event.detail.index, false);
      }
    } else {
      item.sendOnSelected();
    }
  }

  function handleChange(event: CustomEvent<OnSelectableListChange>) {
    if (list) {
      if (selectionType === "single") {
        list.selectedIndex = event.detail.selectedItemsIndex[0] ?? -1;
      } else if (selectionType === "multi") {
        list.selectedIndex = event.detail.selectedItemsIndex;
      }
    }

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
