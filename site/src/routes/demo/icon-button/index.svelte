<script lang="ts">
	import { Label, Tab } from "@smui/core/tab";

	import { TabBar } from "@smui/core/tab-bar";
	import BasicIconButtonConfigurator from "./_BasicIconButtonConfigurator.svelte";
	import IconButtonToggleConfigurator from "./_IconButtonToggleConfigurator.svelte";

	let currentTab;
</script>

<svelte:head>
	<title>Icon Button - SMUI</title>
</svelte:head>

<section>
	<h2>Icon Button</h2>

	<TabBar bind:active={currentTab}>
		<Tab key="basic">
			<Label>Icon Button</Label>
		</Tab>
		<Tab key="toggle">
			<Label>Icon Button Toggle</Label>
		</Tab>
	</TabBar>
	{#if currentTab === 'basic'}
		<BasicIconButtonConfigurator />
	{:else}
		<IconButtonToggleConfigurator />
	{/if}
</section>
