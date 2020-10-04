<script lang="ts">
  import { Snackbar, Label } from "@smui/snackbar";
  import { Button } from "@smui/button";
  import { InputField } from "@smui/textfield";

  let dynSnackbar;
  let dynText = "This is a snackbar with dynamic text.";
</script>

<div>
  Using dynamic text:
  <br />

  <Snackbar bind:this={dynSnackbar} text={dynText} />

  <InputField bind:value={dynText} required>
    <span slot="label"> Dynamic Text </span>
  </InputField>

  <Button on:click={() => dynSnackbar && dynSnackbar.doOpen()}>
    <Label>Open Snackbar</Label>
  </Button>
</div>
