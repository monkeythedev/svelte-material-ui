<script lang="ts">
	import { Checkbox, CheckboxGroup } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";

	let options = [
		{
			name: "One",
			selected: true,
			disabled: false,
		},
		{
			name: "Two",
			selected: null,
			disabled: false,
		},
		{
			name: "Three",
			selected: false,
			disabled: false,
		},
		{
			name: "Four",
			selected: true,
			disabled: true,
		},
	];

	let selected = undefined;
	let customSelected = [];

	function handleClick(
		event: CustomEvent<Event & { target: HTMLInputElement }>,
		index: number
	) {
		const option = options[index];
		option.selected = event.detail.target.indeterminate
			? null
			: event.detail.target.checked;
		options[index] = { ...option };
		updateCustomSelected();
	}

	updateCustomSelected();
	function updateCustomSelected() {
		customSelected = options
			.filter((item) => item.selected !== false)
			.map((item) =>
				item.selected ? item.name : `${item.name} (indeterminate)`
			);
	}
</script>

<div>
	OnChange Handler with indeterminate values:<br />
	<CheckboxGroup bind:value={selected}>
		{#each options as option, index}
			<FormField>
				<Checkbox
					value={option.name}
					checked={option.selected}
					disabled={option.disabled}
					allowIndeterminated
					on:change={(event) => handleClick(event, index)} />
				<span
					slot="label">{option.name}{option.disabled ? ' (disabled)' : ''}</span>
			</FormField>
		{/each}
	</CheckboxGroup>
</div>

<pre class="status">Basic value: {selected && selected.join(', ')}</pre>
<pre class="status">Enhanced value: {customSelected.join(', ')}</pre>
