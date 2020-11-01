<script lang="ts">
	import { Checkbox, CheckboxGroup } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";

	let options = [
		{
			name: "Bashful",
			disabled: false,
		},
		{
			name: "Doc",
			disabled: true,
		},
		{
			name: "Dopey",
			disabled: false,
		},
		{
			name: "Happy",
			disabled: false,
		},
		{
			name: "Sleepy",
			disabled: false,
		},
		{
			name: "Sneezy",
			disabled: false,
		},
		{
			name: "Grumpy",
			disabled: false,
		},
	];
	let selected = ["Happy", "Grumpy"];
</script>

<div>
	Group checkbox:<br />
	<CheckboxGroup bind:value={selected}>
		{#each options as option}
			<FormField>
				<Checkbox value={option.name} disabled={option.disabled} />
				<span
					slot="label">{option.name}{option.disabled ? ' (disabled)' : ''}</span>
			</FormField>
		{/each}
	</CheckboxGroup>
</div>

<pre class="status">Selected: {selected.join(', ')}</pre>
