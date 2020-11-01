<script lang="ts">
	import { Snackbar, Actions, Label } from "@smui/core/snackbar";
	import { Button } from "@smui/core/button";
	import { IconButton } from "@smui/core/icon-button";

	let stackedSnackbar;
	let stackedAction: string;
	let stackedReason: string;

	function handleClosedStacked(e) {
		stackedReason = e.detail.reason;
	}
</script>

<div>
	Stacked with Action:

	<Snackbar
		stacked
		bind:this={stackedSnackbar}
		on:closed={handleClosedStacked}
		text="This is a stacked snackbar. Use it when you have really long text."
		action="Action" />

	<Button on:click={() => stackedSnackbar.doOpen()}>
		<Label>Open Snackbar</Label>
	</Button>
</div>

<pre class="status">Closed Reason: {stackedReason}</pre>
