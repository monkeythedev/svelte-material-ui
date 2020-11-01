<script lang="ts">
	import { Menu } from "@smui/core/menu";
	import { Corner } from "@smui/core/menu-surface";
	import {
		List,
		Item,
		Separator,
		Text,
		PrimaryText,
		SecondaryText,
	} from "@smui/core/list";
	import { MenuButton } from "@smui/core/button";

	let menu: Menu;
	export let clicked: string;
</script>

<div>
	Two line, anchored manually, corner set to Corner.TOP_RIGHT:

	<div>
		<MenuButton {menu} on:click={() => menu.setOpen(true)}>
			Open Menu
		</MenuButton>
		<Menu bind:this={menu} anchorCorner={Corner.TOP_RIGHT}>
			<List twoLine>
				<Item on:click={() => (clicked = 'Cut')}>
					<Text>
						<PrimaryText>Cut</PrimaryText>
						<SecondaryText>Copy to clipboard and remove.</SecondaryText>
					</Text>
				</Item>
				<Item on:click={() => (clicked = 'Copy')}>
					<Text>
						<PrimaryText>Copy</PrimaryText>
						<SecondaryText>Copy to clipboard.</SecondaryText>
					</Text>
				</Item>
				<Item on:click={() => (clicked = 'Paste')}>
					<Text>
						<PrimaryText>Paste</PrimaryText>
						<SecondaryText>Paste from clipboard.</SecondaryText>
					</Text>
				</Item>
				<Separator />
				<Item on:click={() => (clicked = 'Delete')}>
					<Text>
						<PrimaryText>Delete</PrimaryText>
						<SecondaryText>Remove item.</SecondaryText>
					</Text>
				</Item>
			</List>
		</Menu>
	</div>
</div>
