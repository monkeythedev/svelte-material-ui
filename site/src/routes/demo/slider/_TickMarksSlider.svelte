<script lang="ts">
	import { Slider } from "@smui/core/slider";
	import { FormField } from "@smui/core/form-field";

	let value = 0;
</script>

<div>
	Discrete with min/max/step and tick marks:

	<Slider bind:value min={-10} max={10} step={2} discrete displayMarkers />
</div>

<pre class="status">Value: {value}</pre>
