<script lang="ts">
	import { Menu, SelectionGroup, SelectionGroupIcon } from "@smui/core/menu";
	import { List, Item, Separator, Text } from "@smui/core/list";
	import { MenuButton } from "@smui/core/button";

	let menu: Menu;
	let selected1: string = "Red";
	let selected2: string = "Small";
	export let clicked: string;
</script>

<div>
	Selection groups:

	<div style="min-width: 100px;">
		<MenuButton {menu} on:click={() => menu.setOpen(true)}>
			Open Menu
		</MenuButton>
		<Menu bind:this={menu}>
			<List>
				<SelectionGroup>
					{#each ['Red', 'Green', 'Blue'] as item}
						<Item
							on:click={() => ((selected1 = item), (clicked = item))}
							selected={selected1 === item}>
							<SelectionGroupIcon>
								<i class="material-icons">check</i>
							</SelectionGroupIcon>
							<Text>{item}</Text>
						</Item>
					{/each}
				</SelectionGroup>
				<Separator />
				<SelectionGroup>
					{#each ['Small', 'Medium', 'Large'] as item}
						<Item
							on:click={() => ((selected2 = item), (clicked = item))}
							selected={selected2 === item}>
							<SelectionGroupIcon>
								<i class="material-icons">check</i>
							</SelectionGroupIcon>
							<Text>{item}</Text>
						</Item>
					{/each}
				</SelectionGroup>
				<Separator />
				<Item on:click={() => (clicked = 'Save for Later')}>
					<Text>Save for Later</Text>
				</Item>
			</List>
		</Menu>
	</div>

	<pre class="status">Selection 1: {selected1}</pre>
	<pre class="status">Selection 2: {selected2}</pre>
</div>
