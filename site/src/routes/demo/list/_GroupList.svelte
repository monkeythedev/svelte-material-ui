<script lang="ts">
	import { List, Group, Item, Subheader, Text } from "@smui/core/list";

	let clickedGroup = "nothing yet";
</script>

<div>
	A list group:
	<Group>
		<Subheader>Actors</Subheader>
		<List class="demo-list">
			<Item on:selected={() => (clickedGroup = 'Bruce Willis')}>
				<Text>Bruce Willis</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = 'Tom Hanks')}>
				<Text>Tom Hanks</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = 'Jack Nicholson')}>
				<Text>Jack Nicholson</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = 'Leonardo DiCaprio')}>
				<Text>Leonardo DiCaprio</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = 'Matt Damon')}>
				<Text>Matt Damon</Text>
			</Item>
		</List>
		<Subheader>Books</Subheader>
		<List class="demo-list">
			<Item on:selected={() => (clickedGroup = 'To Kill a Mockingbird')}>
				<Text>To Kill a Mockingbird</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = 'The Great Gatsby')}>
				<Text>The Great Gatsby</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = '1984')}>
				<Text>1984</Text>
			</Item>
			<Item on:selected={() => (clickedGroup = 'Catch-22')}>
				<Text>Catch-22</Text>
			</Item>
			<Item
				on:selected={() => (clickedGroup = "Alice's Adventures in Wonderland")}>
				<Text>Alice's Adventures in Wonderland</Text>
			</Item>
		</List>
	</Group>
</div>

<pre class="status">Clicked: {clickedGroup}</pre>
