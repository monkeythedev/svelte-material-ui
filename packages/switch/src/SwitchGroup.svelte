<script lang="ts">
	import { SelectableGroup } from "@smui/common/hoc";

	export let value: any;
</script>

<SelectableGroup bind:value>
	<slot />
</SelectableGroup>
