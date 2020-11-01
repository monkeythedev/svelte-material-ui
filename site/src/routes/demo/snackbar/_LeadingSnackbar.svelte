<script lang="ts">
	import { Snackbar, Actions, Label } from "@smui/core/snackbar";
	import { Button } from "@smui/core/button";

	let leadingSnackbar;
	let leadingReason = "nothing yet";

	function handleClosedLeading(e) {
		leadingReason = e.detail.reason;
	}
</script>

<div>
	Leading with Action:

	<Snackbar
		leading
		bind:this={leadingSnackbar}
		on:closed={handleClosedLeading}
		text="This is a leading snackbar."
		action={{ type: 'dismiss' }} />

	<Button on:click={() => leadingSnackbar.doOpen()}>
		<Label>Open Snackbar</Label>
	</Button>
</div>

<pre class="status">Closed Reason: {leadingReason}</pre>
