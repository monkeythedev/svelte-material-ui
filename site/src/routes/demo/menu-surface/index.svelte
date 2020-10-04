<script lang="ts">
  import "./index.scss";
  import TextMenuSurface from "./_TextMenuSurface.svelte";
  import ListMenuSurface from "./_ListMenuSurface.svelte";
  import AnchorMenuSurface from "./_AnchorMenuSurface.svelte";
  // import ManualAnchorMenuSurface from "./_ManualAnchorMenuSurface.svelte";
</script>

<svelte:head>
  <title>Menu Surface - SMUI</title>
</svelte:head>

<section>
  <h2>Menu Surface</h2>

  <TextMenuSurface />
  <ListMenuSurface />
  <AnchorMenuSurface /> 
  <!-- <ManualAnchorMenuSurface /> seems not worthy to expose this API -->
  
  
  <div style="padding-top: 200px;">
    Long div for scrolling...
  </div>
</section>
