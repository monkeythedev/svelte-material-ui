<script lang="ts">
	import classes from "./index.module.scss";
	import { TopAppBar, Row, Section, Title } from "@smui/core/top-app-bar";
	import { IconButton } from "@smui/core/icon-button";
	import LoremIpsum from "../LoremIpsum.svelte";

	export let prominent: boolean = false;
	export let dense: boolean = false;
	export let secondaryColor: boolean = false;
</script>

<style>
	.flexor {
		display: inline-flex;
		flex-direction: column;
	}

	.flexor-content {
		flex-basis: 0;
		height: 0;
		flex-grow: 1;
		overflow: auto;
	}
</style>

<div class="{classes.topAppBarContainer} flexor">
	<TopAppBar
		variant="static"
		{prominent}
		{dense}
		color={secondaryColor ? 'secondary' : 'primary'}>
		<Row>
			<Section>
				<IconButton class="material-icons">menu</IconButton>
				<Title>Flex Static</Title>
			</Section>
			<Section align="end" toolbar>
				<IconButton class="material-icons" aria-label="Download">
					file_download
				</IconButton>
				<IconButton class="material-icons" aria-label="Print this page">
					print
				</IconButton>
				<IconButton class="material-icons" aria-label="Bookmark this page">
					bookmark
				</IconButton>
			</Section>
		</Row>
	</TopAppBar>
	<div class="flexor-content">
		<LoremIpsum />
	</div>
</div>
