<script lang="ts">
	import "./index.scss";
	import PlayableLinearProgress from "./_PlayableLinearProgress.svelte";
	import { LinearProgress } from "@smui/core/linear-progress";
</script>

<svelte:head>
	<title>Linear Progress - SMUI</title>
</svelte:head>

<section>
	<h2>Linear Progress</h2>

	<PlayableLinearProgress />

	<div>
		Buffered:

		<LinearProgress progress={0.5} buffer={0.75} />
	</div>

	<div>
		Indeterminate:

		<LinearProgress indeterminate />
	</div>

	<div>
		Reversed:

		<LinearProgress progress={0.5} reversed />
	</div>

	<div>
		Reversed Buffered:

		<LinearProgress progress={0.5} buffer={0.75} reversed />
	</div>

	<div>
		Colored (using Sass mixins):

		<LinearProgress class="my-colored-bar" progress={0.5} buffer={0.75} />
	</div>
</section>
