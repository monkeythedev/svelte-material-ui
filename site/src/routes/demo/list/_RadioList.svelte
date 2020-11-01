<script lang="ts">
	import { Label } from "@smui/core/common/dom";
	import { Graphic, Item, List } from "@smui/core/list";
	import { Radio } from "@smui/core/radio";

	let value;
</script>

<div>
	A radio list
	<List class="demo-list" role="radiogroup" bind:value>
		<Item>
			<Graphic>
				<Radio value="Bruce Willis" />
			</Graphic>
			<Label>Bruce Willis</Label>
		</Item>
		<Item>
			<Graphic>
				<Radio value="Tom Hanks" />
			</Graphic>
			<Label>Tom Hanks</Label>
		</Item>
		<Item>
			<Graphic>
				<Radio value="Jack Nicholson" />
			</Graphic>
			<Label>Jack Nicholson</Label>
		</Item>
		<Item>
			<Graphic>
				<Radio value="Leonardo DiCaprio" />
			</Graphic>
			<Label>Leonardo DiCaprio</Label>
		</Item>
		<Item>
			<Graphic>
				<Radio value="Matt Damon" />
			</Graphic>
			<Label>Matt Damon</Label>
		</Item>
	</List>
</div>

<pre class="status">Selected: {value}</pre>
