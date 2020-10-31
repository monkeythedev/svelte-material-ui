<script lang="ts">
  import { MDCBanner } from "@material/banner";

  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  import { UseState } from "@smui/common/hooks";
  import { onDestroy, onMount } from "svelte";
  export let props: BaseProps = {};
  //#endregion

  // Banner
  export let centered: boolean = false;
  export let fixed: boolean = false;
  export let open: boolean = false;

  let banner: MDCBanner;
  onMount(() => {
    banner = new MDCBanner(dom);
    handleOpenChange();
  });

  onDestroy(() => {
    banner?.destroy();
  });

  function handleOpenChange() {
    if (!banner) return;

    if (open) {
      banner.open();
    } else {
      banner.close();
    }
  }

  function setOpen(newValue: boolean) {
    open = newValue;
  }
</script>

<svelte:options immutable={true} />

<UseState value={open} onUpdate={handleOpenChange}></UseState>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-banner {className} {centered ? 'mdc-banner--centered' : ''}"
  {style}
  role="banner"
  use:forwardDOMEvents>
  {#if fixed}
    <div class="mdc-banner__fixed">
      <div class="mdc-banner__content" role="status" aria-live="assertive">
        <slot />
      </div>
    </div>
  {:else}
    <div class="mdc-banner__content" role="status" aria-live="assertive">
      <slot />
    </div>
  {/if}
</div>
