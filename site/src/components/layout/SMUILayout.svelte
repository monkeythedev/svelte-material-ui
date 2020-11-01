<script lang="ts">
	import * as appClasses from "./app.module.scss";
	import { TopAppBar, Row, Section, Title } from "@smui/core/top-app-bar";
	import { List, Item, Text } from "@smui/core/list";
	import { A } from "@smui/core/common/dom";
	import { IconButton, Icon } from "@smui/core/icon-button";
	import { Drawer, Content, Scrim, AppContent } from "@smui/core/drawer";
	import { onMount } from "svelte";
	import { menuItems } from "./menuItems";
	import { stores } from "@sapper/app";
	import { mdiFileDocument, mdiCodeTags, mdiTwitter, mdiGithub } from "@mdi/js";

	const { page } = stores();

	let mainContent;
	let miniWindow = false;
	let drawerOpen = false;

	const sections = menuItems;

	let activeSection = sections.find(
		(section) => "route" in section && section.route === $page.path
	);
	$: repos =
		activeSection && "repos" in activeSection ? activeSection.repos : [];

	onMount(setMiniWindow);

	function pickSection(section) {
		drawerOpen = false;
		mainContent.scrollTop = 0;

		// Svelte/Sapper is not updated the components correctly, so I need this.
		// sections.forEach((section) => section.component.$set({ activated: false }));
		// section.component.$set({ activated: true });

		activeSection =
			"shortcut" in section
				? sections.find((sec) => sec.route === section.shortcut)
				: section;
	}

	function setMiniWindow() {
		miniWindow = window.innerWidth < 720;
	}
</script>

<style lang="scss">
	.drawer-container {
		flex-grow: 1;
		height: 0;
		display: flex;
	}
</style>

<svelte:window on:resize={setMiniWindow} />

<TopAppBar variant="static" class={appClasses.demoTopAppBar}>
	<Row>
		<Section>
			{#if miniWindow}
				<IconButton
					class="material-icons"
					on:click={() => (drawerOpen = !drawerOpen)}>
					menu
				</IconButton>
			{/if}
			<Title
				component={A}
				href="/"
				on:click={() => (activeSection = null)}
				class="mdc-theme--primary"
				style={miniWindow ? 'padding-left: 0;' : ''}>
				Svelte Material UI
			</Title>
		</Section>
		<Section align="end" toolbar>
			{#each repos as repo}
				<IconButton
					href={repo}
					title={`View Component: ${repo.split('/').slice(-1)[0]}`}>
					<Icon>
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000" d={mdiFileDocument} />
						</svg>
					</Icon>
				</IconButton>
			{/each}
			{#if activeSection}
				<IconButton
					href={`https://github.com/hperrin/svelte-material-ui/blob/master/site/src/routes${activeSection.route}.svelte`}
					title={`View Demo Code: ${activeSection.route
							.split('/')
							.slice(-1)[0]}`}>
					<Icon>
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000" d={mdiCodeTags} />
						</svg>
					</Icon>
				</IconButton>
			{/if}
			<IconButton href="https://twitter.com/SciActive">
				<Icon>
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#000000" d={mdiTwitter} />
					</svg>
				</Icon>
			</IconButton>
			<IconButton href="https://github.com/hperrin/svelte-material-ui">
				<Icon>
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#000000" d={mdiGithub} />
					</svg>
				</Icon>
			</IconButton>
		</Section>
	</Row>
</TopAppBar>

<div class="drawer-container">
	<Drawer
		variant={miniWindow ? 'modal' : null}
		bind:open={drawerOpen}
		class="{appClasses.demoDrawer} mdc-theme--secondary-bg {miniWindow ? appClasses.demoDrawerAdjust : ''}">
		<Content>
			<List>
				{#each sections as section (section.name)}
					<Item
						bind:this={section.component}
						style={section.indent ? 'margin-left: ' + section.indent * 25 + 'px;' : ''}
						on:click={() => pickSection(section)}
						activated={'route' in section && section.route === $page.path}
						href={section.route || section.shortcut}
						props={{ title: section.name }}>
						<Text class="mdc-theme--on-secondary">{section.name}</Text>
					</Item>
				{/each}
			</List>
		</Content>
	</Drawer>

	{#if miniWindow}
		<Scrim />
	{/if}
	<AppContent class={appClasses.demoAppContent}>
		<main class={appClasses.demoMainContent} bind:this={mainContent}>
			<slot />
		</main>
	</AppContent>
</div>
