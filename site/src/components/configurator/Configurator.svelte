<script lang="ts">
	import CodeSelector from "./CodeSelector.svelte";

	export let svelteCode: string;
	export let scssCode: string;
</script>

<style lang="scss">
	@use "src/styles/smui/_variables";
	$padding: 1em;
	$border: variables.$border-color 1px solid;

	.configurator {
		max-width: 80em;
		display: grid;
		grid-template:
			"preview options-sidebar"
			"code options-sidebar"
			/ 1fr minmax(200px, min-content);
		white-space: normal;
		border: $border;
	}

	.preview {
		grid-area: preview;
		padding: $padding;
		background-color: #efefef;
		border-right: $border;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.preview-slot {
			flex-grow: 1;
			align-items: center;
			display: flex;
		}

		.values {
			display: flex;
			align-self: flex-end;
		}
	}

	.code {
		grid-area: code;
		min-width: 0;
		min-height: 0;
		overflow: auto;

		:global(pre) {
			white-space: break-spaces;
		}
	}

	.options-sidebar {
		grid-area: options-sidebar;
		padding: $padding;

		> :global(.options-sidebar) {
			display: grid;
			grid-template: auto / minmax(150px, auto) minmax(150px, auto);
			gap: 0.6em;
			white-space: nowrap;
			width: max-content;

			> :global(div) {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
	}
</style>

<div class="configurator">
	<div class="preview">
		<div class="preview-slot">
			<slot name="preview" />
		</div>
		{#if $$slots.values}
			<div class="values">
				<slot name="values" />
			</div>
		{/if}
	</div>
	<div class="options-sidebar">
		<slot name="optionsSidebar" />
	</div>
	<div class="code">
		<CodeSelector svelte={svelteCode} scss={scssCode} />
	</div>
</div>
