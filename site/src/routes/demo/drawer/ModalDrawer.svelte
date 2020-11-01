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
		Scrim,
	} from "@smui/core/drawer";
	import {
		List,
		Item,
		Text,
		Graphic,
		Separator,
		Subheader,
	} from "@smui/core/list";
	import { Button, Label } from "@smui/core/button";
	import { H6 } from "@smui/core/common/dom";

	let myDrawer2;
	let myDrawer2Open = false;
	let active2 = "Inbox";

	function setActive2(value) {
		active2 = value;
		myDrawer2Open = false;
	}
</script>

<div>
	A modal drawer with header, activated items, subheading, icons, list groups.

	<div class={classes.drawerContainer}>
		<Drawer variant="modal" bind:this={myDrawer2} bind:open={myDrawer2Open}>
			<Header>
				<Title>Super Mail</Title>
				<Subtitle>It's the best fake mail app drawer.</Subtitle>
			</Header>
			<Content>
				<List>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Inbox')}
						activated={active2 === 'Inbox'}>
						<Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
						<Text>Inbox</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Star')}
						activated={active2 === 'Star'}>
						<Graphic class="material-icons" aria-hidden="true">star</Graphic>
						<Text>Star</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Sent Mail')}
						activated={active2 === 'Sent Mail'}>
						<Graphic class="material-icons" aria-hidden="true">send</Graphic>
						<Text>Sent Mail</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Drafts')}
						activated={active2 === 'Drafts'}>
						<Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
						<Text>Drafts</Text>
					</Item>

					<Separator nav />
					<Subheader component={H6}>Labels</Subheader>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Family')}
						activated={active2 === 'Family'}>
						<Graphic class="material-icons" aria-hidden="true">
							bookmark
						</Graphic>
						<Text>Family</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Friends')}
						activated={active2 === 'Friends'}>
						<Graphic class="material-icons" aria-hidden="true">
							bookmark
						</Graphic>
						<Text>Friends</Text>
					</Item>
					<Item
						href="javascript:void(0)"
						on:click={() => setActive2('Work')}
						activated={active2 === 'Work'}>
						<Graphic class="material-icons" aria-hidden="true">
							bookmark
						</Graphic>
						<Text>Work</Text>
					</Item>
				</List>
			</Content>
		</Drawer>

		<Scrim />
		<AppContent class={classes.appContent}>
			<main class={classes.mainContent}>
				<Button on:click={() => (myDrawer2Open = !myDrawer2Open)}>
					<Label>Toggle Drawer</Label>
				</Button>
				<br />
				<pre class="status">Active: {active2}</pre>
				<div style="height: 700px;">&nbsp;</div>
				And some stuff at the bottom.
			</main>
		</AppContent>
	</div>
</div>
