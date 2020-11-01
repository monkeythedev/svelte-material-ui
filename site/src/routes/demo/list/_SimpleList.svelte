<script lang="ts">
	import { List, Item, Separator, Text } from "@smui/core/list";

	let clickedSimple = "nothing yet";
</script>

<div>
	A simple list:
	<List class="demo-list">
		<Item on:selected={() => (clickedSimple = 'Cut')}>
			<Text>Cut</Text>
		</Item>
		<Item on:selected={() => (clickedSimple = 'Copy')}>
			<Text>Copy</Text>
		</Item>
		<Item on:selected={() => (clickedSimple = 'Paste')}>
			<Text>Paste</Text>
		</Item>
		<Separator />
		<Item on:selected={() => (clickedSimple = 'Delete')}>
			<Text>Delete</Text>
		</Item>
	</List>
</div>

<pre class="status">Clicked: {clickedSimple}</pre>
