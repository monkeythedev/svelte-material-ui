<script lang="ts">
	import { Tab, Label } from "@smui/core/tab";
	import { TabBar } from "@smui/core/tab-bar";
</script>

<div>
	Scrolling tabs:
	<TabBar>
		{#each [...Array(20)].map((v, i) => i + 1) as tab}
			<Tab {tab}>
				<Label>Tab {tab}</Label>
			</Tab>
		{/each}
	</TabBar>
</div>
