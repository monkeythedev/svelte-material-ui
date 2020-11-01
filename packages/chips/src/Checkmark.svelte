<script lang="ts">
	// Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: GraphicElement = undefined;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};

	// Icon
	import { GraphicElement } from "@smui/common/components";
	import { parseClassList } from "@smui/common/functions";
</script>

<svelte:options immutable={true} />

<span class={parseClassList(['mdc-chip__checkmark', className])} on:click>
	<svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
		{#if !$$slots.default}
			<path
				class="mdc-chip__checkmark-path"
				fill="none"
				stroke="black"
				d="M1.73,12.91 8.1,19.28 22.79,4.59" />
		{:else}
			<slot class="mdc-chip__checkmark-path" />
		{/if}
	</svg>
</span>
