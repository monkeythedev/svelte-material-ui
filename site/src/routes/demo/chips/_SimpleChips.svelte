<script lang="ts">
  import {Chip, ChipSet, Icon, Checkmark, Text} from '@smui/chips';
</script>

<div>
  <ChipSet>
    <Chip>
      <Text>one</Text>
    </Chip>
    <Chip>
      <Text>two</Text>
    </Chip>
    <Chip>
      <Text>three</Text>
    </Chip>
    <Chip>
      <Icon class="material-icons" leading>book</Icon>
      <Text>four</Text>
    </Chip>
    <Chip shouldRemoveOnTrailingIconClick={false}>
      <Text>four</Text>
      <Icon class="material-icons" trailing>commute</Icon>
    </Chip>
  </ChipSet>
</div>