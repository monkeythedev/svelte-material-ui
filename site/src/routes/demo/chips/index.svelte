<script lang="ts">
import ChipConfigurator from "./ChipConfigurator.svelte";

  import ChoiceChips from "./_ChoiceChips.svelte";
  import FilterChips from "./_FilterChips.svelte";
  import InputChips from "./_InputChips.svelte";
  import SimpleChips from "./_SimpleChips.svelte";
</script>

<svelte:head>
  <title>Chips - SMUI</title>
</svelte:head>

<section>
	<h2>Chips</h2>
	
	<ChipConfigurator></ChipConfigurator>

  <SimpleChips />
  <ChoiceChips />
  <FilterChips />
  <InputChips />
</section>
