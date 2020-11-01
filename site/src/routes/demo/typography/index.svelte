<script lang="ts">
	import { Typography } from "@smui/core/typography";
</script>

<svelte:head>
	<title>Typography - SMUI</title>
</svelte:head>

<section>
	<Typography variant="headline2">Typography</Typography>

	<Typography variant="headline1">Headline 1</Typography>
	<Typography variant="headline2">Headline 2</Typography>
	<Typography variant="headline3">Headline 3</Typography>
	<Typography variant="headline4">Headline 4</Typography>
	<Typography variant="headline5">Headline 5</Typography>
	<Typography variant="headline6">Headline 6</Typography>
	<Typography variant="subtitle1">Subtitle 1</Typography>
	<Typography variant="subtitle2">Subtitle 2</Typography>
	<Typography variant="body1">Body 1</Typography>
	<Typography variant="body2">Body 2</Typography>
	<Typography variant="caption">Caption</Typography>
	<Typography variant="button">Button</Typography>
	<Typography variant="overline">Overline</Typography>

	<Typography variant="body1">
		<small>small</small>
		<big>big</big>
		<sup>sup</sup>
		<sub>sub</sub>
		<strong>strong</strong>
		<em>em</em>
	</Typography>
</section>
