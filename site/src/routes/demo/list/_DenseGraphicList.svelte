<script>
	import { List, Item, Graphic, Separator, Text } from "@smui/core/list";

	let clickedDense = "nothing yet";
</script>

<div>
	A dense list with graphics and tabindex:
	<List class="demo-list" dense>
		<Item on:selected={() => (clickedDense = 'Edit')}>
			<Graphic icon>edit</Graphic>
			<Text>Edit</Text>
		</Item>
		<Item on:selected={() => (clickedDense = 'Send')}>
			<Graphic icon>send</Graphic>
			<Text>Send</Text>
		</Item>
		<Item on:selected={() => (clickedDense = 'Archive')}>
			<Graphic icon>archive</Graphic>
			<Text>Archive</Text>
		</Item>
		<Separator />
		<Item on:selected={() => (clickedDense = 'Delete')}>
			<Graphic icon>clear</Graphic>
			<Text>Delete</Text>
		</Item>
	</List>
</div>

<pre class="status">Clicked: {clickedDense}</pre>
