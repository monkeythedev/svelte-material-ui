<script lang="ts">
  import { Dialog, Title, Content, Actions, InitialFocus } from "@smui/dialog";
  import { Button, Label } from "@smui/button";

  let simpleDialog;
  let clicked = "Nothing yet.";
</script>

<div>
  <Dialog
    bind:this={simpleDialog}
    aria-labelledby="simple-title"
    aria-describedby="simple-content">
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Title id="simple-title">Dialog Title</Title>
    <Content id="simple-content">Super awesome dialog body text?</Content>
    <Actions>
      <Button on:click={() => (clicked = 'No')}>
        <Label>No</Label>
      </Button>
      <Button on:click={() => (clicked = 'Yes')}>
        <Label>Yes</Label>
      </Button>
    </Actions>
  </Dialog>

  <Button on:click={() => simpleDialog.doOpen()}>
    <Label>Open Dialog</Label>
  </Button>
</div>

<pre class="status">Clicked: {clicked}</pre>