<script lang="ts">
  import { Dialog, Title, Content, Actions } from "@smui/dialog";
  import { Button, Label } from "@smui/button";
  import { List, Item, Text } from "@smui/list";

  let listDialog;
  let clickedList: string | number = "Nothing yet.";
</script>

<div>
  No actions, and a very long list dialog: <br />

  <Dialog
    bind:this={listDialog}
    aria-labelledby="list-title"
    aria-describedby="list-content">
    <Title id="list-title">Dialog Title</Title>
    <Content>
      <List id="list-content">
        {#each [...Array(100)].map((v, i) => i + 1) as item}
          <Item
            on:click={() => {
              clickedList = item;
              listDialog.close();
            }}>
            <Text>Item #{item}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Dialog>

  <Button on:click={() => listDialog.doOpen()}>
    <Label>Open Dialog</Label>
  </Button>
</div>

<pre
  class="status">Clicked: {clickedList}{clickedList === 69 ? ', nice' : ''}</pre>
