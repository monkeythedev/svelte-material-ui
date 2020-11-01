<script lang="ts">
	import classes from "./index.module.scss";
	import { TopAppBar, Row, Section, Title } from "@smui/core/top-app-bar";
	import { IconButton } from "@smui/core/icon-button";
	import LoremIpsum from "../LoremIpsum.svelte";

	export let prominent: boolean = false;
	export let dense: boolean = false;
	export let secondaryColor: boolean = false;
</script>

<div class={classes.topAppBarContainer}>
	<TopAppBar
		variant="static"
		{prominent}
		{dense}
		color={secondaryColor ? 'secondary' : 'primary'}>
		<Row>
			<Section>
				<IconButton class="material-icons">menu</IconButton>
				<Title>Static</Title>
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
	<div>
		<LoremIpsum />
	</div>
</div>
