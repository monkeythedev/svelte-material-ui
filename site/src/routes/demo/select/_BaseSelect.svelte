<script lang="ts">
	import classes from "./index.module.scss";
	import { Select, Option, SelectVariant } from "@smui/core/select";
	import { HelperText } from "@smui/core/select/helper-text";
	import { Icon } from "@smui/core/select/icon";

	export let options: string[];
	export let variant: SelectVariant;
	let className: string;
	export { className as class };

	let value = "";
	let valuePrefilled = "Orange";
	let valueHelperText = "";
	let valueLeadingIcon = "";
	let valueInvalid = "";
</script>

<div>
	Standard:<br />

	<div class="{classes.columns} {classes.margins}">
		<div>
			<Select class={className} bind:value {variant}>
				<Option value="" />
				{#each options as fruit}
					<Option value={fruit} selected={value === fruit}>{fruit}</Option>
				{/each}
				<span slot="label">Pick a fruit</span>
			</Select>

			<pre class="status">Selected: {value}</pre>
		</div>

		<div>
			<Select class={className} bind:value={valuePrefilled} {variant}>
				<Option value="" />
				{#each options as fruit}
					<Option value={fruit}>{fruit}</Option>
				{/each}
				<span slot="label">Prefilled</span>
			</Select>

			<pre class="status">Selected: {valuePrefilled}</pre>
		</div>

		<div>
			<Select class={className} bind:value={valueHelperText} {variant}>
				<Option value="" />
				{#each options as fruit}
					<Option value={fruit} selected={valueHelperText === fruit}>
						{fruit}
					</Option>
				{/each}
				<span slot="label">With Helper Text</span>
				<span slot="helperText">
					<HelperText>Helper text</HelperText>
				</span>
			</Select>

			<pre class="status">Selected: {valueHelperText}</pre>
		</div>

		<div>
			<Select class={className} bind:value={valueLeadingIcon} {variant}>
				<span slot="leadingIcon">
					<Icon class="material-icons">event</Icon>
				</span>
				<Option value="" />
				{#each options as fruit}
					<Option value={fruit} selected={valueLeadingIcon === fruit}>
						{fruit}
					</Option>
				{/each}
				<span slot="label">Leading Icon</span>
			</Select>

			<pre class="status">Selected: {valueLeadingIcon}</pre>
		</div>

		<div>
			<Select
				class={className}
				bind:value={valueInvalid}
				customValidation={(value) => !!value}
				{variant}>
				<Option value="" />
				{#each options as fruit}
					<Option value={fruit} selected={valueInvalid === fruit}>
						{fruit}
					</Option>
				{/each}
				<span slot="label"> Invalid </span>
				<span slot="helperText">
					<HelperText validationMsg>Select a value</HelperText>
				</span>
			</Select>

			<pre class="status">Selected: {valueInvalid}</pre>
		</div>
	</div>
</div>
