<script lang="ts">
	import { FormField } from "@smui/core/form-field";
	import { Radio, RadioGroup } from "@smui/core/radio";
	import { Checkbox } from "@smui/core/checkbox";

	let selected = "yes";
</script>

<div>
	<RadioGroup bind:value={selected}>
		{#each ['yes', 'no'] as option}
			<FormField style="margin-right: 1em;">
				<Radio value={option} />
				<span
					slot="label">{`${option[0].toUpperCase()}${option.slice(1)}`}</span>
			</FormField>
		{/each}
	</RadioGroup>
</div>

<pre class="status">Selected: {selected}</pre>
