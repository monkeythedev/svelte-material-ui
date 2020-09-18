<script lang="ts">
  import { Chip, ChipSet, Icon, Checkmark, Text } from "@smui/chips";
  import { Button, Label } from "@smui/button";

  let chips = [1, 2, 3, 4];

  function addInputChip() {
    chips = [...chips, chips.length + 1];
  }
</script>

<div>
  Input Chips
  <ChipSet input>
    {#each chips as chip}
      <Chip value={chip}>
        <Text>{chip}</Text>
        <Icon class="material-icons" trailing>cancel</Icon>
      </Chip>
    {/each}
  </ChipSet>
  <Button on:click={addInputChip}>
    <Label>Add</Label>
  </Button>
</div>
