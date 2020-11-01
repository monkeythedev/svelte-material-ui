<script lang="ts">
	import { IconButton } from "@smui/core/icon-button";
	import { Checkbox } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";
	import StaticTopAppBar from "src/components/top-app-bar/StaticTopAppBar.svelte";
	import StaticFlexTopAppBar from "src/components/top-app-bar/StaticFlexTopAppBar.svelte";
	import IFrameTopAppBar from "src/components/top-app-bar/iframe/IFrameTopAppBar.svelte";

	let prominent: boolean = false;
	let dense: boolean = false;
	let secondaryColor: boolean = false;
</script>

<style>
	.flexy {
		display: flex;
		flex-wrap: wrap;
	}
</style>

<svelte:head>
	<title>Top App Bar - SMUI</title>
</svelte:head>

<section>
	<h2>Top App Bar</h2>

	<div>
		<FormField>
			<Checkbox bind:checked={prominent} />
			<span slot="label">Prominent</span>
		</FormField>
		<FormField>
			<Checkbox bind:checked={dense} />
			<span slot="label">Dense</span>
		</FormField>
		<FormField>
			<Checkbox bind:checked={secondaryColor} />
			<span slot="label">Secondary</span>
		</FormField>
	</div>

	<div class="flexy">
		<StaticTopAppBar {prominent} {dense} {secondaryColor} />
		<StaticFlexTopAppBar {prominent} {dense} {secondaryColor} />
	</div>

	<IFrameTopAppBar />
	<IFrameTopAppBar params="style=fixed" />
	<IFrameTopAppBar params="style=dense" />
	<IFrameTopAppBar params="style=prominent" />
	<IFrameTopAppBar params="style=short" />
	<IFrameTopAppBar params="style=short-closed" />
</section>
