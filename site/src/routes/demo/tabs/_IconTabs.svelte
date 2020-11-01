<script lang="ts">
	import { Tab, Icon, Label } from "@smui/core/tab";
	import { TabBar } from "@smui/core/tab-bar";

	let iconTabs = [
		{
			icon: "access_time",
			label: "Recents",
		},
		{
			icon: "near_me",
			label: "Nearby",
		},
		{
			icon: "favorite",
			label: "Favorites",
		},
	];
</script>

<div>
	Tabs with icons next to labels:
	<TabBar>
		{#each iconTabs as tab}
			<Tab>
				<Icon class="material-icons">{tab.icon}</Icon>
				<Label>{tab.label}</Label>
			</Tab>
		{/each}
	</TabBar>
</div>
