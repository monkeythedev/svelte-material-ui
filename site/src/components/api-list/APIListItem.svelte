<script lang="ts">
	import { Typography } from "@smui/core/typography";
	import { Pre, Code } from "@smui/core/common/dom";
</script>

<style lang="scss">
	@use "src/styles/_border";

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>

<div class="api">
	<Typography variant="headline6" component={Code}>
		<slot name="api" />
	</Typography>
</div>
<div class="interface">
	<slot name="interface" />
</div>
<div class="description">
	<slot name="description" />
</div>
