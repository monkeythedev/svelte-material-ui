<script lang="ts">
  import { onMount } from "svelte";

  import { onDestroy } from "svelte";

  import { UseState } from "./";

  export let debounced: any;
  export let value: any;
  export let interval: number = 200;
  export let wait: number = 0;

  let timeout: number;
  let waiter: number;

  $: if (interval < 10) interval = 10;
  $: if (wait < 10 && wait !== 0) wait = 10;

  onMount(() => {
    debounceValue();
  });

  onDestroy(() => {
    clearTimeout(timeout);
    clearTimeout(waiter);
  });

  function debounceValue() {
    if (waiter) {
      clearTimeout(waiter);
    }

    if (wait > 0) {
      createWaiter();
    }

    if (!timeout) {
      if (wait === 0) {
        debounced = value;
      }

      timeout = window.setTimeout(() => {
        timeout = null;
        if (debounced === value) {
          timeout = null;
        } else {
          timeout = null;
          debounceValue();
        }
      }, interval);
    }
  }

  function createWaiter() {
    waiter = setTimeout(() => {
      waiter = null;
      debounced = value;
    });
  }
</script>

<UseState {value} onUpdate={debounceValue} />
