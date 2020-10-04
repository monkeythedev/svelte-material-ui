<script lang="ts">
  import BasicPaper from "./_BasicPaper.svelte";
  import SquarePaper from "./_SquarePaper.svelte";
  import ColoredPaper from "./_ColoredPaper.svelte";
  import ConfigurablePaper from "./_ConfigurablePaper.svelte";
</script>

<style>
  :global(.paper-container) {
    background-color: #f8f8f8;
    padding: 36px 18px;
  }

  :global(.paper-demo) {
    margin: 0 auto;
    max-width: 600px;
  }
</style>

<svelte:head>
  <title>Paper - SMUI</title>
</svelte:head>

<section>
  <h2>Paper</h2>

  <BasicPaper />
  <SquarePaper />
  <ColoredPaper />
  <ConfigurablePaper />
</section>
