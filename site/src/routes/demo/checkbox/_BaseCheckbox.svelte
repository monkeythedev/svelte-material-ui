<script lang="ts">
	import { Checkbox } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";

	let simpleSelected = false;
	let simpleSelected2 = false;

	let indeterminateChecked = null;
	let oldIntedeterminateValue = indeterminateChecked;
	function handleIndeterminableCheckbox() {
		if (oldIntedeterminateValue === true) {
			indeterminateChecked = false;
		} else if (oldIntedeterminateValue === false) {
			indeterminateChecked = null;
		} else {
			indeterminateChecked = true;
		}
		oldIntedeterminateValue = indeterminateChecked;
	}
</script>

<div>
	<FormField>
		<Checkbox bind:checked={simpleSelected} />
		<span slot="label">Remember me.</span>
	</FormField>
</div>

<pre class="status">Checked: {simpleSelected}</pre>

<div>
	<FormField align="end">
		<Checkbox bind:checked={simpleSelected2} />
		<span slot="label">Remember me.</span>
	</FormField>
</div>

<pre class="status">Checked: {simpleSelected2}</pre>

<div>
	Indeterminate:<br />
	<FormField>
		<Checkbox
			bind:checked={indeterminateChecked}
			allowIndeterminated
			required />
		<span slot="label">I agree to the terms.</span>
	</FormField>
</div>

<pre class="status">Checked: {indeterminateChecked}</pre>
