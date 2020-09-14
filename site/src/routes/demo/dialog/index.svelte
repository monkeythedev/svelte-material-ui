<script lang="ts">
  import SimpleDialog from "./_SimpleDialog.svelte";
  import ButtonActionDialog from "./_ButtonActionDialog.svelte";
  import ListDialog from "./_ListDialog.svelte";
  import SelectionDialog from "./_SelectionDialog.svelte";
  import SlidersDialog from "./_SlidersDialog.svelte";
</script>

<svelte:head>
  <title>Dialogs - SMUI</title>
</svelte:head>

<section>
  <h2>Dialogs</h2>

  <SimpleDialog />
  <ButtonActionDialog />
  <ListDialog />
  <SelectionDialog />
  <SlidersDialog />
</section>
