<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Use } from "@smui/common/hooks";

  export let target: HTMLElement;

  let dom: HTMLDivElement;

  let portal: HTMLDivElement;

  onDestroy(() => {
    target?.removeChild(dom);
  });

  function init() {
    target?.appendChild(dom);
  }
</script>

<style>
  .portal-clone {
    display: none;
  }

  .portal-wrapper {
    display: contents;
  }
</style>

<Use once effect hook={init} when={!!target}></Use>

{#if target}
  <div class="portal-clone">
    <div class="portal-wrapper" bind:this={dom}>
      <slot />
    </div>
  </div>
{/if}
