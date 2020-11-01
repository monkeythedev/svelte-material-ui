<script lang="ts">
	import CardConfiguratorContent from "./_CardConfiguratorContent.svelte";
	import CardConfiguratorMedia from "./_CardConfiguratorMedia.svelte";
	import { AspectRatio } from "@smui/core/card";

	export let title: string;
	export let subtitle: string;
	export let text: string;
	export let media: AspectRatio;
	export let showMediaContent: boolean;
</script>

{#if media}
	<CardConfiguratorMedia aspectRatio={media} {showMediaContent} />
{/if}
{#if title || subtitle || text}
	<CardConfiguratorContent {title} {subtitle} {text} />
{/if}
