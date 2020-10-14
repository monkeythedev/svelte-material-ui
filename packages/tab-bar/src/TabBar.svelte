<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // TabBar
  import { MDCTabBar, MDCTabBarActivatedEvent } from "@material/tab-bar";
  import { onMount, onDestroy, setContext } from "svelte";
  import TabScroller from "@smui/tab-scroller/src/TabScroller.svelte";
  import { SelectableContext, SelectableGroup } from "@smui/common/hoc";
  import { UseState } from "@smui/common/hooks";
  import { setCreateMDCTabScrollerInstance } from "@smui/tab-scroller";
  import { setCreateMDCTabInstance } from "@smui/tab/src/TabContext";
import Use from "@smui/common/src/hooks/Use.svelte";

  export let focusOnActivate: boolean = true;
  export let useAutomaticActivation: boolean = true;
  export let active: any = undefined;

  let tabs: Set<SelectableContext> = undefined;

  let selectableGroup: SelectableGroup;

  $: if (selectableGroup) {
    tabs = selectableGroup.getItems();
  }

  setCreateMDCTabScrollerInstance(false);
  setCreateMDCTabInstance(false);

  let tabBar: MDCTabBar;
  onMount(() => {
    tabBar = new MDCTabBar(dom);

    tabBar.listen("MDCTabBar:activated", (event: MDCTabBarActivatedEvent) => {
      const index = event.detail.index;
      active = getTabsKeys()[index];
    });
  });

  function init() {
    if (active) {
      const activeTabIndex = getTabsKeys().indexOf(getActiveTab());
      tabBar.activateTab(activeTabIndex);
    } else {
      const firstTab = getTabsKeys()[0];
      if (firstTab != null) {
        active = firstTab;
      }
    }
  }

  $: if (tabBar) {
    if (tabBar.focusOnActivate !== focusOnActivate) {
      tabBar.focusOnActivate = focusOnActivate;
    }

    if (tabBar.useAutomaticActivation !== useAutomaticActivation) {
      tabBar.useAutomaticActivation = useAutomaticActivation;
    }
  }

  onDestroy(() => {
    tabBar && tabBar.destroy();
  });

  function onActiveTabChange() {
    if (tabBar) {
      const activeIndex = getTabsKeys().indexOf(active);
      activateTab(activeIndex);
    }
  }

  function getActiveTab() {
    return getTabsKeys().find(tab => tab === active);
  }

  function getTabsKeys() {
    return tabs ? Array.from(tabs).map((item) => item.value) : [];
  }

  export function activateTab(index: number) {
    return tabBar.activateTab(index);
  }

  export function scrollIntoView(index: number) {
    return tabBar.scrollIntoView(index);
  }
</script>

<svelte:options immutable={true} />

<UseState value={active} onUpdate={onActiveTabChange} />

<SelectableGroup
  bind:this={selectableGroup}
  selectionType="single"
  bind:value={active}>
  <div
    bind:this={dom}
    {...props}
    {id}
    class="mdc-tab-bar {className}"
    {style}
    role="tablist"
    use:forwardDOMEvents>
    <TabScroller>
      <slot />
    </TabScroller>
  </div>
</SelectableGroup>

<Use effect once hook={init}></Use>