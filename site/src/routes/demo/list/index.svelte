<script lang="ts">
	import { Typography } from "@smui/core/typography";
	import RadioList from "./_RadioList.svelte";
	import CheckboxList from "./_CheckboxList.svelte";
	import ListBox from "./_ListBox.svelte";
	import SelectableList from "./_SelectableList.svelte";
	import SimpleList from "./_SimpleList.svelte";
	import SimpleHorizontalList from "./_SimpleHorizontalList.svelte";
	import DenseGraphicList from "./_DenseGraphicList.svelte";
	import NonInteractiveList from "./_NonInteractiveList.svelte";
	import ThreeLineList from "./_ThreeLineList.svelte";
	import GroupList from "./_GroupList.svelte";

	let clickedGroup = "nothing yet";
</script>

<style>
	* :global(.demo-list) {
		max-width: 600px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>

<svelte:head>
	<title>Lists - SMUI</title>
</svelte:head>

<section>
	<Typography variant="headline2">Lists</Typography>

	<SimpleList />
	<SimpleHorizontalList />
	<DenseGraphicList />
	<NonInteractiveList />
	<SelectableList />
	<ThreeLineList />
	<GroupList />
	<ListBox />
	<RadioList />
	<CheckboxList />
</section>
