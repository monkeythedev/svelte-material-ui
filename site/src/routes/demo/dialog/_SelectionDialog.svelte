<script lang="ts">
  import { Dialog, Title, Content, Actions, InitialFocus } from "@smui/dialog";
  import { Button, Label } from "@smui/button";
  import { List, Item, Graphic, Text } from "@smui/list";
  import { Radio } from "@smui/radio";

  let listSelectionDialog;
  let selection = "Radishes";
  let selected = "Nothing yet.";

  let initialFocusTarget: HTMLElement;

  function selectionCloseHandler(e) {
    if (e.detail.action === "accept") {
      selected = selection;
    }
    selection = "Radishes";
  }
</script>

<div>
  A selection dialog: <br />

  <Dialog
    bind:this={listSelectionDialog}
    aria-labelledby="list-selection-title"
    aria-describedby="list-selection-content"
    on:closed={selectionCloseHandler}
    initialFocus={initialFocusTarget}>
    <Title id="list-selection-title">Dialog Title</Title>
    <Content id="list-selection-content">
      <List role="radiogroup" bind:value={selection}>
        <Item bind:dom={initialFocusTarget}>
          <Graphic>
            <Radio value="Radishes" />
          </Graphic>
          <Text>Radishes</Text>
        </Item>
        <Item>
          <Graphic>
            <Radio value="Turnips" />
          </Graphic>
          <Text>Turnips</Text>
        </Item>
        <Item>
          <Graphic>
            <Radio value="Broccoli" />
          </Graphic>
          <Text>Broccoli</Text>
        </Item>
      </List>
    </Content>
    <Actions>
      <Button>
        <Label>Cancel</Label>
      </Button>
      <Button action="accept">
        <Label>Accept</Label>
      </Button>
    </Actions>
  </Dialog>

  <Button on:click={() => listSelectionDialog.doOpen()}>
    <Label>Open Dialog</Label>
  </Button>
</div>

<pre class="status">Selected: {selected}</pre>