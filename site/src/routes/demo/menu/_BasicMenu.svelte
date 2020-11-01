<script lang="ts">
	import { Menu } from "@smui/core/menu";
	import { List, Item, Separator, Text } from "@smui/core/list";
	import { MenuButton } from "@smui/core/button";

	export let clicked: string;
	let menu;
</script>

<div>
	Anchored automatically:

	<div style="min-width: 100px;">
		<MenuButton {menu} on:click={() => menu.setOpen(true)}>
			Open Menu
		</MenuButton>
		<Menu bind:this={menu}>
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
</div>
