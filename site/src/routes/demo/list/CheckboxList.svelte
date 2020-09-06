<script lang="ts">
  import { Label } from "@smui/common/dom";
  import { Graphic, Item, List, Meta } from "@smui/list";
  import { Checkbox } from "@smui/checkbox";

  let value = [];
</script>

<div>
  A check list with trailing checkboxes:
  <List class="demo-list" role="group" bind:value>
    <Item>
      <Label>Bruce Willis</Label>
      <Meta>
        <Checkbox value="Bruce Willis" />
      </Meta>
    </Item>
    <Item>
      <Label>Tom Hanks</Label>
      <Meta>
        <Checkbox value="Tom Hanks" />
      </Meta>
    </Item>
    <Item>
      <Label>Jack Nicholson</Label>
      <Meta>
        <Checkbox value="Jack Nicholson" />
      </Meta>
    </Item>
    <Item>
      <Label>Leonardo DiCaprio</Label>
      <Meta>
        <Checkbox value="Leonardo DiCaprio" />
      </Meta>
    </Item>
    <Item>
      <Label>Matt Damon</Label>
      <Meta>
        <Checkbox value="Matt Damon" />
      </Meta>
    </Item>
  </List>
</div>

<pre class="status">Selected: {value.join(', ')}</pre>