<script lang="ts">
  import { MenuSurface } from "@smui/menu-surface";
  import {List, Item, Separator, Text} from '@smui/list';

  let clicked = "";
</script>

<div>
  <MenuSurface static>
    <List>
      <Item on:click={() => (clicked = 'Cut')}>
        <Text>Cut</Text>
      </Item>
      <Item on:click={() => (clicked = 'Copy')}>
        <Text>Copy</Text>
      </Item>
      <Item on:click={() => (clicked = 'Paste')}>
        <Text>Paste</Text>
      </Item>
      <Separator />
      <Item on:click={() => (clicked = 'Delete')}>
        <Text>Delete</Text>
      </Item>
    </List>
  </MenuSurface>
</div>

<pre class="status">Clicked: {clicked}</pre>
