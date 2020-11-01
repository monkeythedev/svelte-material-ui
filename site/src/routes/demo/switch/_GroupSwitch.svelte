<script lang="ts">
	import { Switch, SwitchGroup } from "@smui/core/switch";
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
	Group switch:<br />
	<SwitchGroup bind:value={selected}>
		{#each options as option}
			<div style="margin: 18px 0;">
				<FormField>
					<Switch value={option.name} disabled={option.disabled} />
					<span
						slot="label">{option.name}{option.disabled ? ' (disabled)' : ''}</span>
				</FormField>
			</div>
		{/each}
	</SwitchGroup>
</div>

<pre class="status">Selected: {selected.join(', ')}</pre>
