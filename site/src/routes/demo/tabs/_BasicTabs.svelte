<script lang="ts">
	import { Tab, Icon, Label } from "@smui/core/tab";
	import { TabBar } from "@smui/core/tab-bar";
	import { Button } from "@smui/core/button";

	let active = "Merchandise";

	let tabs = ["Home", "Merchandise", "About Us"];
</script>

<div>
	<TabBar bind:active>
		{#each tabs as tab}
			<Tab key={tab}>
				<Label>{tab}</Label>
			</Tab>
		{/each}
	</TabBar>

	<div style="margin-top: 15px;">
		Programmatically select:
		{#each tabs as tab}
			<Button on:click={() => (active = tab)}>
				<Label>{tab}</Label>
			</Button>
		{/each}
	</div>

	<pre class="status">Selected: {active}</pre>
</div>
