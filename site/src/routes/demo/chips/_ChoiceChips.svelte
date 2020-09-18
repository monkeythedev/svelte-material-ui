<script lang="ts">
  import { Chip, ChipSet, Icon, Checkmark, Text } from "@smui/chips";
  import Button from "@smui/common/dom/Button.svelte";
  import Label from "@smui/common/dom/Label.svelte";

  let choice: typeof chips[number] = "Morning";

  let chips = ["Morning", "Afternoon", "Evening", "Night"] as [
    "Morning",
    "Afternoon",
    "Evening",
    "Night"
  ];
</script>

<div>
  Choice Chips
  <ChipSet bind:value={choice}>
    {#each chips as chip}
      <Chip value={chip}>
        <Text>{chip}</Text>
      </Chip>
    {/each}
  </ChipSet>
</div>

<div>
  Programmatically select:
  {#each chips as chip}
    <Button on:click={() => (choice = chip)}>
      <Label>chip</Label>
    </Button>
  {/each}
</div>

<pre class="status">Selected: {choice}</pre>
