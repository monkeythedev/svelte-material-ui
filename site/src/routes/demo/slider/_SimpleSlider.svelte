<script lang="ts">
  import { Slider } from "@smui/slider";
  import { FormField } from "@smui/form-field";

  let value = 50;
</script>

<div>
  <FormField align="end" style="display: flex;">
    <Slider bind:value />
    <span
      slot="label"
      style="padding-right: 12px; width: max-content; display: block;">Amount
      of Wonder</span>
  </FormField>
</div>

<pre class="status">Value: {value}</pre>