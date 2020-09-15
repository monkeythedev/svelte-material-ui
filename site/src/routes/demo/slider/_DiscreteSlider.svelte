<script lang="ts">
  import { Slider } from "@smui/slider";
  import { FormField } from "@smui/form-field";

  let value = 0;
</script>

<div>
  Discrete with min/max/step:

  <Slider bind:value min={-10} max={10} step={2} discrete />
</div>

<pre class="status">Value: {value}</pre>