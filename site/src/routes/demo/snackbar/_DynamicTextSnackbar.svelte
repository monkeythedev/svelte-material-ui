<script lang="ts">
	import { Snackbar, Label } from "@smui/core/snackbar";
	import { Button } from "@smui/core/button";
	import { InputField } from "@smui/core/textfield";

	let dynSnackbar;
	let dynText = "This is a snackbar with dynamic text.";
</script>

<div>
	Using dynamic text:
	<br />

	<Snackbar bind:this={dynSnackbar} text={dynText} />

	<InputField bind:value={dynText} required>
		<span slot="label"> Dynamic Text </span>
	</InputField>

	<Button on:click={() => dynSnackbar && dynSnackbar.doOpen()}>
		<Label>Open Snackbar</Label>
	</Button>
</div>
