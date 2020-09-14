<script lang="ts">
  import { Dialog, Title, Content, Actions } from "@smui/dialog";
  import { Button, Label } from "@smui/button";
  
  let open = true;
  let response = "Nothing yet.";

  function closeHandler(e) {
    switch (e.detail.action) {
      case "none":
        response = "Ok, well, you're wrong.";
        break;
      case "all":
        response = "You are correct. All dogs are the best dog.";
        break;
      default:
        response = "It's a simple question. You should be able to answer it.";
        break;
    }
  }
</script>

<div>
  Using dialog events instead of button clicks, with a default button that is
  initially focused: <br />

  <Dialog
    props={{
      "aria-labelledby": "event-title",
      "aria-describedby": "event-content"
    }}
    bind:open
    on:closed={closeHandler}>
    <Title id="event-title">The Best Dog</Title>
    <Content id="event-content">
      Out of all the dogs, which is the best dog?
    </Content>
    <Actions>
      <Button action="none">
        <Label>None of Them</Label>
      </Button>
      <Button action="all" default>
        <Label>All of Them</Label>
      </Button>
    </Actions>
  </Dialog>

  <Button on:click={() => open = true}>
    <Label>Open Dialog</Label>
  </Button>
</div>

<pre class="status">Response: {response}</pre>