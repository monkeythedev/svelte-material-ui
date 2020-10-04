<script lang="ts">
  import AlwaysOpenMenu from "./_AlwaysOpenMenu.svelte";
  import BasicMenu from "./_BasicMenu.svelte";
  import SelectionGroupMenu from "./_SelectionGroupMenu.svelte";
  import TwoLinesMenu from "./_TwoLinesMenu.svelte";

  let clicked: string = "nothing yet";
</script>

<svelte:head>
  <title>Menu - SMUI</title>
</svelte:head>

<section>
  <h2>Menu</h2>

  <AlwaysOpenMenu bind:clicked />
  <BasicMenu bind:clicked />
  <TwoLinesMenu bind:clicked />
  <SelectionGroupMenu bind:clicked />

  <pre class="status">Clicked: {clicked}</pre>

  <div style="padding-top: 200px;">Long div for scrolling...</div>
</section>
