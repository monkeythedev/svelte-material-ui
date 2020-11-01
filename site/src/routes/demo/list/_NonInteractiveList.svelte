<script lang="ts">
	import { List, Item, Separator, Text } from "@smui/core/list";
</script>

<div>
	A non-interactive list with activated item:
	<List class="demo-list" nonInteractive>
		<Item ripple={false}>
			<Text>Thing 1</Text>
		</Item>
		<Separator />
		<Item ripple={false} activated>
			<Text>Thing 2</Text>
		</Item>
		<Item ripple={false}>
			<Text>Thing 3</Text>
		</Item>
		<Separator />
		<Item ripple={false}>
			<Text>Thing 4</Text>
		</Item>
	</List>
</div>
