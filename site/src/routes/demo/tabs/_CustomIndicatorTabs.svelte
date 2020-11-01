<script lang="ts">
	import { Tab, Icon, Label } from "@smui/core/tab";
	import { TabBar } from "@smui/core/tab-bar";
	import { TabIndicator } from "@smui/core/tab-indicator";

	let keyedTabs = [
		{
			icon: "code",
			label: "Code",
		},
		{
			icon: "two_wheeler",
			label: "Bike",
		},
		{
			icon: "shopping_cart",
			label: "Cart",
		},
		{
			icon: "android",
			label: "Android",
		},
	];
	let keyedTabsActive = keyedTabs[2];
</script>

<div>
	Keyed tabs with icons above labels, preselected tab, indicators restricted to
	content, and fade transition:
	<TabBar tabs={keyedTabs} bind:active={keyedTabsActive}>
		{#each keyedTabs as tab}
			<Tab key={tab} stacked indicatorSpanOnlyContent>
				<Icon class="material-icons">{tab.icon}</Icon>
				<Label>{tab.label}</Label>
				<span slot="tabIndicator" let:active>
					<TabIndicator {active} transition="fade" />
				</span>
			</Tab>
		{/each}
	</TabBar>

	<pre class="status">Selected: {JSON.stringify(keyedTabsActive)}</pre>
</div>
