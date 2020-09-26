<script lang="ts">
  import { onDestroy } from "svelte";
  import { Use } from "@smui/common/hooks";

  let target: HTMLElement;

  let dom: HTMLDivElement;

  onDestroy(() => {
    target?.removeChild(dom);
  });

  function init() {
    const isSlot = dom.parentElement.getAttribute("slot");
    const target = isSlot ? dom.parentElement : dom;
    while(dom.firstChild) {
     target.parentElement.insertBefore(dom.firstChild, target);
    }
  }
</script>

<style>
  .fragment {
    display: none;
  }
</style>

<Use effect once hook={init}></Use>

<div class="fragment" bind:this={dom}>
  <slot />
</div>