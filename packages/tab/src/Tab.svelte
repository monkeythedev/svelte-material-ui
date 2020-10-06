<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLButtonElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Tab
  import { MDCTab } from "@material/tab";
  import { onMount, onDestroy, setContext, getContext } from "svelte";
  import { getCreateMDCTabInstance } from "./TabContext";
  import TabIndicator from "@smui/tab-indicator/src/TabIndicator.svelte";
  import { setLabelBehaviour } from "@smui/common/dom/LabelContext";
  import { Selectable } from "@smui/common/hoc";
  import { setIconStyle } from "@smui/common/dom";
  import { setCreateMDCTabIndicatorInstance } from "@smui/tab-indicator";
  import { UseState } from "@smui/common/hooks";
  import ExtractNamedSlot from "@smui/common/src/components/ExtractNamedSlot.svelte";

  export let ripple: boolean = true;
  export let key: any = undefined;
  export let active: boolean = false;
  export let stacked: boolean = false;
  export let minWidth: boolean = false;
  export let indicatorSpanOnlyContent: boolean = false;
  export let focusOnActivate: boolean = true;

  let instantiate = getCreateMDCTabInstance();

  setIconStyle("tab");
  setLabelBehaviour("tab");
  setCreateMDCTabIndicatorInstance(false);

  let tab: MDCTab;
  onMount(async () => {
    if (instantiate !== false) {
      tab = new MDCTab(dom);
      tab.listen("MDCTab:interacted", interactedHandler);

      if (active) {
        tab.activate();
      } else {
        tab.deactivate();
      }
    }
  });

  $: if (tab) {
    if (tab.focusOnActivate !== focusOnActivate) {
      tab.focusOnActivate = focusOnActivate;
    }
  }

  onDestroy(() => {
    tab && tab.destroy();
  });

  function interactedHandler() {
    active = tab.active;
  }

  function onActiveChange() {
    if (tab && tab.active !== active) {
      if (active) {
        tab.activate();
      } else {
        tab.deactivate();
      }
    }
  }

  export function activate() {
    active = true;
  }

  export function deactivate() {
    active = false;
  }

  export function focus() {
    return tab.focus();
  }

  export function computeIndicatorClientRect() {
    return tab.computeIndicatorClientRect();
  }

  export function computeDimensions() {
    return tab.computeDimensions();
  }
</script>

<svelte:options immutable={true} />

<UseState value={active} onUpdate={onActiveChange} />

<Selectable bind:value={key} bind:selected={active}>
  <button
    bind:this={dom}
    {...props}
    {id}
    class="
      mdc-tab
      {className}
      {active ? 'mdc-tab--active' : ''}
      {stacked ? 'mdc-tab--stacked' : ''}
      {minWidth ? 'mdc-tab--min-width' : ''}
    "
    {style}
    role="tab"
    aria-selected={active}
    tabindex={active ? 0 : -1}
    use:forwardDOMEvents>
    <span class="mdc-tab__content">
      <slot />
      {#if indicatorSpanOnlyContent}
        {#if $$slots.tabIndicator}
          <ExtractNamedSlot>
            <slot name="tabIndicator" {active} />
          </ExtractNamedSlot>
        {:else}
          <TabIndicator {active} />
        {/if}
      {/if}
    </span>
    {#if !indicatorSpanOnlyContent}
      {#if $$slots.tabIndicator}
        <ExtractNamedSlot>
          <slot name="tabIndicator" {active} />
        </ExtractNamedSlot>
      {:else}
        <TabIndicator {active} />
      {/if}
    {/if}
    {#if ripple}<span class="mdc-tab__ripple" />{/if}
  </button>
</Selectable>
