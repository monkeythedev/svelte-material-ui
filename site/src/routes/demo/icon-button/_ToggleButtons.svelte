<script lang="ts">
  import { IconButton, Icon, IconButtonToggle } from "@smui/icon-button";
  import { Button, Label } from "@smui/button";

  export let clicked: number = 0;
  let initialOff = false;
  let initialOn = true;
  let usingEvents = false;
</script>

Toggle buttons:
<div style="display: flex; align-items: center;">
  <IconButtonToggle on:click={() => clicked++} bind:pressed={initialOff}>
    <Icon class="material-icons" on>star</Icon>
    <Icon class="material-icons">star_border</Icon>
  </IconButtonToggle>
</div>
<div style="display: flex; align-items: center;">
  <IconButtonToggle on:click={() => clicked++} bind:pressed={initialOn}>
    <Icon class="material-icons" on>alarm_on</Icon>
    <Icon class="material-icons">alarm_off</Icon>
  </IconButtonToggle>
  <Button on:click={() => (initialOn = !initialOn)}>
    <Label>Toggle Programmatically</Label>
  </Button>
</div>
<div style="display: flex; align-items: center;">
  <IconButton
    on:click={() => clicked++}
    on:click={() => (usingEvents = !usingEvents)}
    pressed={usingEvents}>
    <Icon class="material-icons" on>bookmark</Icon>
    <Icon class="material-icons">bookmark_border</Icon>
  </IconButton>
  (Using events instead of bound variables. Note: don't use&nbsp;<code>toggle</code>&nbsp;prop
  in this case.)
</div>
