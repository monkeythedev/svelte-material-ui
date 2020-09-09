<script lang="ts">
  import ToggleButtons from "./_ToggleButtons.svelte";
  import BaseIconButtons from "./_BaseIconButtons.svelte";

  let clicked = 0;
</script>

<svelte:head>
  <title>Icon Button - SMUI</title>
</svelte:head>

<section>
  <h2>Icon Button</h2>

  <BaseIconButtons bind:clicked />
  <ToggleButtons bind:clicked />

  <pre class="status">Clicked: {clicked}</pre>
</section>
