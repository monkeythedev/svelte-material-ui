<script lang="ts">
	import { Icon, IconButtonToggle } from "@smui/core/icon-button";
	import { Button, Label } from "@smui/core/button";

	export let clicked: number = 0;
	let initialOff = false;
	let initialOn = true;
</script>

Toggle buttons:
<div style="display: flex; align-items: center;">
	<IconButtonToggle on:click={() => clicked++} bind:on={initialOff}>
		<Icon on>star</Icon>
		<Icon>star_border</Icon>
	</IconButtonToggle>
</div>
<div style="display: flex; align-items: center;">
	<IconButtonToggle on:click={() => clicked++} bind:on={initialOn}>
		<Icon class="material-icons" on>alarm_on</Icon>
		<Icon class="material-icons">alarm_off</Icon>
	</IconButtonToggle>
	<Button on:click={() => (initialOn = !initialOn)}>
		<Label>Toggle Programmatically</Label>
	</Button>
</div>
