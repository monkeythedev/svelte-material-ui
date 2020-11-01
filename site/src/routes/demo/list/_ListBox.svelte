<script lang="ts">
	import { Item, List, Text } from "@smui/core/list";

	let value;
</script>

<div>
	Select item list using value prop:
	<input type="number" bind:value />
	<List class="demo-list" bind:value role="listbox">
		<Item>
			<Text>Bruce Willis</Text>
		</Item>
		<Item>
			<Text>Tom Hanks</Text>
		</Item>
		<Item>
			<Text>Jack Nicholson</Text>
		</Item>
		<Item>
			<Text>Leonardo DiCaprio</Text>
		</Item>
		<Item>
			<Text>Matt Damon</Text>
		</Item>
	</List>
</div>
