<script lang="ts">
	import { Label } from "@smui/core/common/dom";
	import { Item, List, Meta } from "@smui/core/list";
	import { Checkbox } from "@smui/core/checkbox";

	let value = [];
</script>

<div>
	A check list with trailing checkboxes:
	<List class="demo-list" role="group" bind:value>
		<Item value="Bruce Willis">
			<Label>Bruce Willis</Label>
			<Meta>
				<Checkbox />
			</Meta>
		</Item>
		<Item value="Tom Hanks">
			<Label>Tom Hanks</Label>
			<Meta>
				<Checkbox />
			</Meta>
		</Item>
		<Item value="Jack Nicholson">
			<Label>Jack Nicholson</Label>
			<Meta>
				<Checkbox />
			</Meta>
		</Item>
		<Item value="Leonardo DiCaprio">
			<Label>Leonardo DiCaprio</Label>
			<Meta>
				<Checkbox />
			</Meta>
		</Item>
		<Item value="Matt Damon">
			<Label>Matt Damon</Label>
			<Meta>
				<Checkbox />
			</Meta>
		</Item>
	</List>
</div>

<pre class="status">Selected: {value.join(', ')}</pre>
