<script lang="ts">
	import BaseDrawer from "./BaseDrawer.svelte";
	import DismissibleDrawer from "./DismissibleDrawer.svelte";
	import ModalDrawer from "./ModalDrawer.svelte";
</script>

<svelte:head>
	<title>Drawers - SMUI</title>
</svelte:head>

<section>
	<h2>Drawers</h2>

	<BaseDrawer />
	<DismissibleDrawer />
	<ModalDrawer />
</section>
