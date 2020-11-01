<script context="module" lang="ts">
	export type IconType = "material-icon" | "svg" | "img";
</script>

<script lang="ts">
	import { FormField } from "@smui/core/form-field";
	import { Option, Select } from "@smui/core/select";

	export let value: IconType = undefined;
	export let allowEmpty: boolean = false;
	export let label: string = "";
	export let disabled: boolean = false;
</script>

<FormField>
	<Select bind:value style="width: 100%" {disabled} on:change>
		<span slot="label">{label}</span>
		{#if allowEmpty}
			<Option value={null} />
		{/if}
		<Option value="material-icon">Material icon</Option>
		<Option value="svg">SVG</Option>
		<Option value="img">Image</Option>
	</Select>
</FormField>
