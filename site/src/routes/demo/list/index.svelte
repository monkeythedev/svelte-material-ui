<script>
  import {
    List,
    Group,
    Item,
    Graphic,
    Meta,
    Label,
    Separator,
    Subheader,
    Text,
    PrimaryText,
    SecondaryText,
  } from "@smui/list";
  import { Radio } from "@smui/radio";
  import { Checkbox } from "@smui/checkbox";
  import { Typography } from "@smui/typography";
  import { Icon } from "@smui/common/dom";

  let clickedSimple = "nothing yet";
  let clickedDense = "nothing yet";
  let optionsTwoLine = [
    {
      name: "Bruce Willis",
      description: "Actor",
      disabled: false,
    },
    {
      name: "Austin Powers",
      description: "Fictional Character",
      disabled: true,
    },
    {
      name: "Thomas Edison",
      description: "Inventor",
      disabled: false,
    },
    {
      name: "Stephen Hawking",
      description: "Scientist",
      disabled: false,
    },
  ];
  let selectionTwoLine = "Stephen Hawking";
  // This value is updated when the component is initialized, based on the
  // selected Item's `selected` prop.
  let selectionIndex = null;
  let clickedGroup = "nothing yet";
  let selectedRadio = "Tom Hanks";
  let selectedCheckbox = ["Tom Hanks"];

  let selectedIndexListVal = 0;
</script>

<style>
  * :global(.demo-list) {
    max-width: 600px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>

<svelte:head>
  <title>Lists - SMUI</title>
</svelte:head>

<section>
  <Typography variant="headline2">Lists</Typography>

  <div>
    A simple list:
    <List class="demo-list">
      <Item on:selected={() => (clickedSimple = 'Cut')}>
        <Text>Cut</Text>
      </Item>
      <Item on:selected={() => (clickedSimple = 'Copy')}>
        <Text>Copy</Text>
      </Item>
      <Item on:selected={() => (clickedSimple = 'Paste')}>
        <Text>Paste</Text>
      </Item>
      <Separator />
      <Item on:selected={() => (clickedSimple = 'Delete')}>
        <Text>Delete</Text>
      </Item>
    </List>
  </div>

  <pre class="status">Clicked: {clickedSimple}</pre>

  <div>
    A simple horizontal list:
    <List class="demo-list" orientation={"horizontal"}>
      <Item>
        <Text>Cut</Text>
      </Item>
      <Item>
        <Text>Copy</Text>
      </Item>
      <Item>
        <Text>Paste</Text>
      </Item>
      <Separator />
      <Item>
        <Text>Delete</Text>
      </Item>
    </List>
  </div>

  <div>
    A dense list with graphics and tabindex:
    <List class="demo-list" dense>
      <Item on:selected={() => (clickedDense = 'Edit')}>
        <Graphic icon>edit</Graphic>
        <Text>Edit</Text>
      </Item>
      <Item on:selected={() => (clickedDense = 'Send')}>
        <Graphic icon>send</Graphic>
        <Text>Send</Text>
      </Item>
      <Item on:selected={() => (clickedDense = 'Archive')}>
        <Graphic icon>archive</Graphic>
        <Text>Archive</Text>
      </Item>
      <Separator />
      <Item on:selected={() => (clickedDense = 'Delete')}>
        <Graphic icon>clear</Graphic>
        <Text>Delete</Text>
      </Item>
    </List>
  </div>

  <pre class="status">Clicked: {clickedDense}</pre>
  
  <div>
    A non-interactive list with activated item:
    <List class="demo-list" nonInteractive>
      <Item ripple={false}>
        <Text>Thing 1</Text>
      </Item>
      <Separator />
      <Item ripple={false} activated>
        <Text>Thing 2</Text>
      </Item>
      <Item ripple={false}>
        <Text>Thing 3</Text>
      </Item>
      <Separator />
      <Item ripple={false}>
        <Text>Thing 4</Text>
      </Item>
    </List>
  </div>

  <div>
    A two-line single selection list with avatars, disabled item, and meta:
    <List
      class="demo-list"
      twoLine
      avatarList
      role="listbox"
      bind:selectedIndex={selectionIndex}>
      {#each optionsTwoLine as item}
        <Item
          on:selected={() => (selectionTwoLine = item.name)}
          disabled={item.disabled}
          selected={selectionTwoLine === item.name}>
          <Graphic
            style="background-image:
            url(https://via.placeholder.com/40x40.png?text={item.name
              .split(' ')
              .map((val) => val.substring(0, 1))
              .join('')});" />
          <Text>
            <PrimaryText>{item.name}</PrimaryText>
            <SecondaryText>{item.description}</SecondaryText>
          </Text>
          <Meta class="material-icons">info</Meta>
        </Item>
      {/each}
    </List>
  </div>

  <pre class="status">
    Selected: {selectionTwoLine}, value of selectedIndex: {selectionIndex}
  </pre>

  <div>
    A three-line list:
    <List class="demo-list" threeLine nonInteractive>
      <Item>
        <Text>
          <PrimaryText>FruitPhone 11</PrimaryText>
          <SecondaryText>$1,100</SecondaryText>
          <SecondaryText>A beautiful phone with good specs.</SecondaryText>
        </Text>
      </Item>
      <Item>
        <Text>
          <PrimaryText>Addition Phone</PrimaryText>
          <SecondaryText>$700</SecondaryText>
          <SecondaryText>
            Pretty much the same phone, but a different brand name and OS.
          </SecondaryText>
        </Text>
      </Item>
    </List>
  </div>

  <div>
    A list group:
    <Group>
      <Subheader>Actors</Subheader>
      <List class="demo-list">
        <Item on:selected={() => (clickedGroup = 'Bruce Willis')}>
          <Text>Bruce Willis</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = 'Tom Hanks')}>
          <Text>Tom Hanks</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = 'Jack Nicholson')}>
          <Text>Jack Nicholson</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = 'Leonardo DiCaprio')}>
          <Text>Leonardo DiCaprio</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = 'Matt Damon')}>
          <Text>Matt Damon</Text>
        </Item>
      </List>
      <Subheader>Books</Subheader>
      <List class="demo-list">
        <Item on:selected={() => (clickedGroup = 'To Kill a Mockingbird')}>
          <Text>To Kill a Mockingbird</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = 'The Great Gatsby')}>
          <Text>The Great Gatsby</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = '1984')}>
          <Text>1984</Text>
        </Item>
        <Item on:selected={() => (clickedGroup = 'Catch-22')}>
          <Text>Catch-22</Text>
        </Item>
        <Item
          on:selected={() => (clickedGroup = "Alice's Adventures in Wonderland")}>
          <Text>Alice's Adventures in Wonderland</Text>
        </Item>
      </List>
    </Group>
  </div>

  <pre class="status">Clicked: {clickedGroup}</pre>

  <div>
    Select item list using selectedIndex prop:
    <input type="number" bind:value={selectedIndexListVal} />
    <List class="demo-list" bind:selectedIndex={selectedIndexListVal} role="listbox">
      <Item>
        <Text>Bruce Willis</Text>
      </Item>
      <Item>
        <Text>Tom Hanks</Text>
      </Item>
      <Item>
        <Text>Jack Nicholson</Text>
      </Item>
      <Item>
        <Text>Leonardo DiCaprio</Text>
      </Item>
      <Item>
        <Text>Matt Damon</Text>
      </Item>
    </List>
  </div>

  <pre class="status">Clicked: {clickedGroup}</pre>
<!-- 
  <div>
    A radio list:
    <List class="demo-list" role="radiogroup">
      <Item>
        <Graphic>
          <Radio bind:group={selectedRadio} value="Bruce Willis" />
        </Graphic>
        <Label>Bruce Willis</Label>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={selectedRadio} value="Tom Hanks" />
        </Graphic>
        <Label>Tom Hanks</Label>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={selectedRadio} value="Jack Nicholson" />
        </Graphic>
        <Label>Jack Nicholson</Label>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={selectedRadio} value="Leonardo DiCaprio" />
        </Graphic>
        <Label>Leonardo DiCaprio</Label>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={selectedRadio} value="Matt Damon" />
        </Graphic>
        <Label>Matt Damon</Label>
      </Item>
    </List>
  </div>

  <pre class="status">Selected: {selectedRadio}</pre>

  <div>
    A check list with trailing checkboxes:
    <List class="demo-list" role="group">
      <Item>
        <Label>Bruce Willis</Label>
        <Meta>
          <Checkbox bind:group={selectedCheckbox} value="Bruce Willis" />
        </Meta>
      </Item>
      <Item>
        <Label>Tom Hanks</Label>
        <Meta>
          <Checkbox bind:group={selectedCheckbox} value="Tom Hanks" />
        </Meta>
      </Item>
      <Item>
        <Label>Jack Nicholson</Label>
        <Meta>
          <Checkbox bind:group={selectedCheckbox} value="Jack Nicholson" />
        </Meta>
      </Item>
      <Item>
        <Label>Leonardo DiCaprio</Label>
        <Meta>
          <Checkbox bind:group={selectedCheckbox} value="Leonardo DiCaprio" />
        </Meta>
      </Item>
      <Item>
        <Label>Matt Damon</Label>
        <Meta>
          <Checkbox bind:group={selectedCheckbox} value="Matt Damon" />
        </Meta>
      </Item>
    </List>
  </div>

  <pre class="status">Selected: {selectedCheckbox.join(', ')}</pre> -->
</section>
