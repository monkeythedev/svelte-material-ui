<script lang="ts">
  import { Snackbar, Actions, Label } from "@smui/snackbar";
  import { Button } from "@smui/button";
  import { IconButton } from "@smui/icon-button";

  let mySnackbar;
  let mySnackbarB;
</script>

<div>
  <Snackbar bind:this={mySnackbar} text="This is a snackbar." />

  <Snackbar
    bind:this={mySnackbarB}
    text="This is a snackbar."
    action={{ type: 'dismiss' }} />

  <Button on:click={() => mySnackbar.doOpen()}>
    <Label>Open Snackbar</Label>
  </Button>
  <Button on:click={() => mySnackbarB.doOpen()}>
    <Label>Open Snackbar With Dismiss</Label>
  </Button>
</div>
