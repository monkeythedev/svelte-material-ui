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
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import { forwardEventsBuilder } from "@smui/common/forwardEvents";
  import { exclude } from "@smui/common/exclude.js";
  import { useActions } from "@smui/common/useActions.js";
  import Nav from "@smui/common/dom/Nav.svelte";
  import Ul from "@smui/common/dom/Ul.svelte";
  import { createListContext } from "./ListContext";
  import A from "@smui/common/dom/A.svelte";
import { ItemContext } from "./ItemContext";

  const { listItems$ } = createListContext();

  // The first item of the list must have the attribute tabindex="0"
  $: if (!nonInteractive && $listItems$.length) {
    function findNonDisabledItemWithTabIndex0() {
      return $listItems$.find(
        (item) => item.tabindex === "0" && !item.disabled
      );
    }

    function findSelectedItem() {
      return $listItems$.find((item) => item.selected);
    }

    function findFirstNonDisabledItem() {
      return $listItems$.find((item) => !item.disabled);
    }

    function setTabIndex(firstItem: ItemContext) {
      const firstItemIndex = $listItems$.indexOf(firstItem);
      firstItem.setTabIndex("0");

      $listItems$.forEach((item, index) => {
        if (index !== firstItemIndex) {
          item.setTabIndex("-1");
        }
      });
    }

    let firstItem = findSelectedItem();

    if (firstItem) {
      setTabIndex(firstItem);
    } else if (!firstItem && !findNonDisabledItemWithTabIndex0()) {
      firstItem = findFirstNonDisabledItem();
      setTabIndex(firstItem);
    }
  }

  // export let use = [];
  export let nonInteractive: boolean = false;
  export let dense: boolean = false;
  export let avatarList: boolean = false;
  export let twoLine: boolean = false;
  export let threeLine: boolean = false;
  export let vertical: boolean = true;
  export let wrapFocus: boolean = false;
  export let singleSelection: boolean = false;
  export let selectedIndex: number = null;
  export let radiolist: boolean = false;
  export let checklist: boolean = false;

  // The first item of the list must have the attribute tabindex="0"
  // $: if (!nonInteractive && $listItems$.length) {
  //   const firstItem = $listItems$.find(
  //     (item) => !item.disabled
  //   );
  //   const firstItemIndex = $listItems$.indexOf(firstItem);
  //   firstItem.dom.setAttribute("tabindex", "0");

  //   $listItems$.forEach((item, index) => {
  //     if (index !== firstItemIndex) {
  //       item.dom.setAttribute("tabindex", "-1");
  //     }
  //   });
  // }

  $: props = exclude($$props, [
    "use",
    "class",
    "nonInteractive",
    "dense",
    "avatarList",
    "twoLine",
    "threeLine",
    "vertical",
    "wrapFocus",
    "singleSelection",
    "selectedIndex",
    "radiolist",
    "checklist",
  ]);

  let list;
  let role = getContext("SMUI:list:role");
  let nav = getContext("SMUI:list:nav");
  // let instantiate = getContext("SMUI:list:instantiate");
  // let getInstance = getContext("SMUI:list:getInstance");
  let addLayoutListener = getContext("SMUI:addLayoutListener") as any;
  let removeLayoutListener;

  const forwardDomEvents = DOMEventsForwarder();

  let component: typeof Nav | typeof Ul;
  $: component = nav ? Nav : Ul;

  setContext("SMUI:list:nonInteractive", nonInteractive);

  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radiolist) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checklist) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", undefined);
    }
  }

  $: if (list && list.vertical !== vertical) {
    list.vertical = vertical;
  }

  $: if (list && list.wrapFocus !== wrapFocus) {
    list.wrapFocus = wrapFocus;
  }

  $: if (list && list.singleSelection !== singleSelection) {
    list.singleSelection = singleSelection;
  }

  $: if (list && singleSelection && list.selectedIndex !== selectedIndex) {
    list.selectedIndex = selectedIndex;
  }

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount(async () => {
    // if (instantiate !== false) {
    list = new MDCList(dom);
    list.listen("MDCList:action", handleAction);
    // } else {
    //   list = await getInstance();
    // }
    if (singleSelection) {
      list.initializeListType();
      selectedIndex = list.selectedIndex;
    }
  });

  onDestroy(() => {
    // if (instantiate !== false) {
    list && list.destroy();
    // }

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function handleAction(e) {
    if (
      list &&
      list.listElements[e.detail.index].classList.contains(
        "mdc-list-item--disabled"
      )
    ) {
      e.preventDefault();
      list.selectedIndex = selectedIndex;
    } else if (list && list.selectedIndex === e.detail.index) {
      selectedIndex = e.detail.index;
    }
  }

  export function layout(...args) {
    return list.layout(...args);
  }

  export function setEnabled(...args) {
    return list.setEnabled(...args);
  }

  export function getDefaultFoundation(...args) {
    return list.getDefaultFoundation(...args);
  }
</script>

<svelte:component
  this={component}
  bind:dom
  on:domEvent={forwardDomEvents}
  class="mdc-list {className}
    {style}
    {nonInteractive ? 'mdc-list--non-interactive' : ''}
    {dense ? 'mdc-list--dense' : ''}
    {avatarList ? 'mdc-list--avatar-list' : ''}
    {twoLine ? 'mdc-list--two-line' : ''}
    {threeLine && !twoLine ? 'smui-list--three-line' : ''}">
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
