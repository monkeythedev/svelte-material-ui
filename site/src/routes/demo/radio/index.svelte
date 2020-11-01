<script lang="ts">
	import { Radio, RadioGroup } from "@smui/core/radio";
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
	let selected = "Grumpy";
</script>

<svelte:head>
	<title>Radio - SMUI</title>
</svelte:head>

<section>
	<h2>Radio</h2>

	<div>
		<RadioGroup bind:value={selected}>
			{#each options as option}
				<FormField>
					<Radio value={option.name} disabled={option.disabled} />
					<span
						slot="label">{option.name}{option.disabled ? ' (disabled)' : ''}</span>
				</FormField>
			{/each}
		</RadioGroup>
	</div>

	<pre class="status">Selected: {selected}</pre>
</section>
