<script lang="ts">
	import { Menu } from "@smui/core/menu";
	import { List, Item, Separator, Text } from "@smui/core/list";

	export let clicked: string;
</script>

<style>
	:global(.static-menu) {
		position: unset;
	}
</style>

<div>
	<Menu class="static-menu" open>
		<List>
			<Item on:click={() => (clicked = 'Cut')}>
				<Text>Cut</Text>
			</Item>
			<Item on:click={() => (clicked = 'Copy')}>
				<Text>Copy</Text>
			</Item>
			<Item on:click={() => (clicked = 'Paste')}>
				<Text>Paste</Text>
			</Item>
			<Separator />
			<Item on:click={() => (clicked = 'Delete')}>
				<Text>Delete</Text>
			</Item>
		</List>
	</Menu>
</div>
