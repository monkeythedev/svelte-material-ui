<script lang="ts">
	import { Tab, Label } from "@smui/core/tab";
	import { TabBar } from "@smui/core/tab-bar";
</script>

<div>
	Min width tabs:
	<TabBar>
		{#each ['Home', 'Merchandise', 'About Us'] as tab}
			<Tab minWidth>
				<Label>{tab}</Label>
			</Tab>
		{/each}
	</TabBar>
</div>
