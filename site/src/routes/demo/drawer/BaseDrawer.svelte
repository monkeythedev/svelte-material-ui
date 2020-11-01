<script lang="ts">
	import "./index.scss";
	import classes from "./index.module.scss";
	import { Drawer, AppContent, Content } from "@smui/core/drawer";
	import { List, Item, Text } from "@smui/core/list";

	let clicked = "nothing yet";
</script>

<div>
	A permanent drawer.

	<div class={classes.drawerContainer}>
		<Drawer>
			<Content>
				<List>
					<Item
						href="javascript:void(0)"
						on:click={() => (clicked = 'Gray Kittens')}>
						<Text>Gray Kittens</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => (clicked = 'A Space Rocket')}>
						<Text>A Space Rocket</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => (clicked = '100 Pounds of Gravel')}>
						<Text>100 Pounds of Gravel</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => (clicked = 'All of the Shrimp')}>
						<Text>All of the Shrimp</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => (clicked = 'A Planet with a Mall')}>
						<Text>A Planet with a Mall</Text>
					</Item>
				</List>
			</Content>
		</Drawer>

		<AppContent class={classes.appContent}>
			<main class={classes.mainContent}>
				App content.
				<br />
				<pre class="status">Clicked: {clicked}</pre>
			</main>
		</AppContent>
	</div>
</div>
