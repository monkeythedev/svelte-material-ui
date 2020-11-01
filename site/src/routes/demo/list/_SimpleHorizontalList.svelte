<script lang="ts">
	import { List, Item, Separator, Text } from "@smui/core/list";

	let clickedSimple = "nothing yet";
</script>

<div>
	A simple horizontal list:
	<List class="demo-list" orientation={'horizontal'}>
		<Item>
			<Text>Cut</Text>
		</Item>
		<Item>
			<Text>Copy</Text>
		</Item>
		<Item>
			<Text>Paste</Text>
		</Item>
		<Separator />
		<Item>
			<Text>Delete</Text>
		</Item>
	</List>
</div>

<pre class="status">Clicked: {clickedSimple}</pre>
