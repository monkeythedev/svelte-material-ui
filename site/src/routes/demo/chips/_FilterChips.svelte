<script lang="ts">
  import {Chip, ChipSet, Icon, Checkmark, Text} from '@smui/chips';

  let filter: typeof chips[number][] = ['Shoes', 'Shirts'];

  let chips = ['Shoes', 'Pants', 'Shirts', 'Hats'] as ['Shoes', 'Pants', 'Shirts', 'Hats'];
</script>

<div>
  Filter Chips
  <ChipSet filter bind:value={filter}>
    {#each chips as chip}
      <Chip value={chip}><Checkmark /><Text>{chip}</Text></Chip>
    {/each}
  </ChipSet>
</div>

<pre class="status">Selected: {filter.join(', ')}</pre>