<script lang="ts">
  import { Switch } from "@smui/switch";
  import { FormField, FormFieldLabelAlign } from "@smui/form-field";

  export let align: FormFieldLabelAlign = "start";

  let selected = false;
</script>

<div>
  <FormField {align}>
    <Switch bind:checked={selected} />
    <span slot="label">Fields of grain.</span>
  </FormField>
</div>

<pre class="status">Checked: {selected}</pre>
