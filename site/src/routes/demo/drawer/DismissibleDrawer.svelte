<script lang="ts">
	import "./index.scss";
	import classes from "./index.module.scss";
	import {
		Drawer,
		AppContent,
		Content,
		Header,
		Title,
		Subtitle,
	} from "@smui/core/drawer";
	import { List, Item, Text } from "@smui/core/list";
	import { Button, Label } from "@smui/core/button";

	let myDrawer;
	let myDrawerOpen = false;
	let active = "Gray Kittens";

	function setActive(value) {
		active = value;
		myDrawerOpen = false;
	}
</script>

<div>
	A dismissible drawer with a header and activated items.

	<div class={classes.drawerContainer}>
		<Drawer variant="dismissible" bind:this={myDrawer} bind:open={myDrawerOpen}>
			<Header>
				<Title>Super Drawer</Title>
				<Subtitle>It's the best drawer.</Subtitle>
			</Header>
			<Content>
				<List>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive('Gray Kittens')}
						activated={active === 'Gray Kittens'}>
						<Text>Gray Kittens</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive('A Space Rocket')}
						activated={active === 'A Space Rocket'}>
						<Text>A Space Rocket</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive('100 Pounds of Gravel')}
						activated={active === '100 Pounds of Gravel'}>
						<Text>100 Pounds of Gravel</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive('All of the Shrimp')}
						activated={active === 'All of the Shrimp'}>
						<Text>All of the Shrimp</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive('A Planet with a Mall')}
						activated={active === 'A Planet with a Mall'}>
						<Text>A Planet with a Mall</Text>
					</Item>
				</List>
			</Content>
		</Drawer>

		<AppContent class={classes.appContent}>
			<main class={classes.mainContent}>
				<Button on:click={() => (myDrawerOpen = !myDrawerOpen)}>
					<Label>Toggle Drawer</Label>
				</Button>
				<br />
				<pre class="status">Active: {active}</pre>
			</main>
		</AppContent>
	</div>
</div>
