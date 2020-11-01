<script lang="ts">
	import "./app.scss";
	import { stores } from "@sapper/app";
	import SmuiLayout from "src/components/layout/SMUILayout.svelte";
	// import Test from "src/components/layout/Test.svelte";

	const { page } = stores();
	const iframe = $page.path.startsWith("/demo/top-app-bar/iframe");
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

{#if iframe}
	<slot />
{:else}
	<SmuiLayout>
		<slot />
	</SmuiLayout>
	<!-- <Test /> -->
{/if}
