<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {DestroyerFunc, Hook} from "./types";

  export let hook: Hook = null;
  export let effect: boolean = false;

  let runDone = false;

  let runDestroyer: DestroyerFunc;
  $: if(hook && !effect) runDestroyer = hook() as DestroyerFunc;

  let mounted = false;
  onMount(() => {
    mounted = true;
  })

  $: if(hook && effect && mounted) {
    runDestroyer = hook() as DestroyerFunc;
  }

  onDestroy(() => {
    if (runDestroyer) runDestroyer();
  })
</script>
