<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {DestroyerFunc, Hook} from "./types";

  export let hook: Hook = null;
  export let effect: boolean = false;
  export let once: boolean = false;
  export let when: boolean = true;

  let runDone = false;

  let runDestroyer: DestroyerFunc;
  $: if(when && hook && !effect) runDestroyer = runHook();

  let mounted = false;
  onMount(() => {
    mounted = true;
  })

  $: if(when && hook && effect && mounted) {
    runDestroyer = runHook();
  }

  onDestroy(() => {
    if (runDestroyer) runDestroyer();
  })

  function runHook() {
    if (once && !runDone || !once) {
      runDone = true;
      return hook() as DestroyerFunc;
    }
  }
</script>
