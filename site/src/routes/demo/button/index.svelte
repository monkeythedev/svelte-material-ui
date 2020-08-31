<script lang="ts">
  import "./button.scss";
  import * as classes from "./button.module.scss";
  import { Button, Icon, Label } from "@smui/button";
  import { Group, GroupItem } from "@smui/button/group";
  import { Menu } from "@smui/menu";
  import { List, Item, Text, Separator } from "@smui/list";
  import { Corner } from "@smui/menu-surface/MenuSurface.svelte";
  import { A } from "@smui/common/dom";
  import { IconButton } from "@smui/icon-button";
  import { Typography } from "@smui/typography";

  let clicked = 0;
  let menu: Menu;
  let menu2: Menu;
</script>

<section>
  <Typography variant="headline2">Button</Typography>
  <div>
    <Button on:click={() => clicked++}>
      <Label>Default</Label>
    </Button>
    <Button on:click={() => clicked++} disabled>
      <Label>Disabled</Label>
    </Button>
    <Button on:click={() => clicked++} ripple={false}>
      <Label>No Ripple</Label>
    </Button>
    <Button on:click={() => clicked++} variant="raised">
      <Label>Raised</Label>
    </Button>
    <Button on:click={() => clicked++} variant="unelevated">
      <Label>Unelevated</Label>
    </Button>
    <Button on:click={() => clicked++} variant="outlined">
      <Label>Outlined</Label>
    </Button>
    <Button on:click={() => clicked++} class={classes.dense}>
      <Label>Dense</Label>
    </Button>
    <Button on:click={() => clicked++} class={classes.myClass}>
      <Label>With a Class</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      href="http://example.com"
      target="_blank">
      <Label>Link Button</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      href="http://example.com"
      target="_blank"
      disabled>
      <Label>Link Button Disabled</Label>
    </Button>
  </div>

  <div>
    <Button on:click={() => clicked++}>
      <Icon class="material-icons">favorite</Icon>
      <Label>Icon</Label>
    </Button>
    <Button on:click={() => clicked++}>
      <Label>Trailing Icon</Label>
      <Icon class="material-icons">favorite</Icon>
    </Button>
  </div>

  <div>
    Secondary color:
    <br />
    <Button color="secondary" on:click={() => clicked++}>
      <Label>Default</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++} disabled>
      <Label>Disabled</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++} ripple={false}>
      <Label>No Ripple</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++} variant="raised">
      <Label>Raised</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++} variant="unelevated">
      <Label>Unelevated</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++} variant="outlined">
      <Label>Outlined</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++} class={classes.dense}>
      <Label>Dense</Label>
    </Button>
    <Button
      color="secondary"
      on:click={() => clicked++}
      class={classes.myClass}>
      <Label>With a Class</Label>
    </Button>
    <Button
      color="secondary"
      on:click={() => clicked++}
      href="http://example.com"
      target="_blank">
      <Label>Link Button</Label>
    </Button>
  </div>

  <div>
    <Button color="secondary" on:click={() => clicked++}>
      <Icon class="material-icons">favorite</Icon>
      <Label>Icon</Label>
    </Button>
    <Button color="secondary" on:click={() => clicked++}>
      <Label>Trailing Icon</Label>
      <Icon class="material-icons">favorite</Icon>
    </Button>
  </div>

  <div>
    Button groups:
    <br />
    <Group>
      <Button on:click={() => clicked++}>
        <Label>One</Label>
      </Button>
      <Button on:click={() => clicked++}>
        <Label>Two</Label>
      </Button>
      <Button on:click={() => clicked++}>
        <Label>Three</Label>
      </Button>
    </Group>
    <Group variant="raised">
      <Button on:click={() => clicked++} variant="raised">
        <Label>One</Label>
      </Button>
      <Button on:click={() => clicked++} variant="raised">
        <Label>Two</Label>
      </Button>
      <Button on:click={() => clicked++} variant="raised">
        <Label>Three</Label>
      </Button>
    </Group>
    <Group variant="unelevated">
      <Button on:click={() => clicked++} variant="unelevated">
        <Label>One</Label>
      </Button>
      <Button on:click={() => clicked++} variant="unelevated">
        <Label>Two</Label>
      </Button>
      <Button on:click={() => clicked++} variant="unelevated">
        <Label>Three</Label>
      </Button>
    </Group>
    <Group variant="outlined">
      <Button on:click={() => clicked++} variant="outlined">
        <Label>One</Label>
      </Button>
      <Button on:click={() => clicked++} variant="outlined">
        <Label>Two</Label>
      </Button>
      <Button on:click={() => clicked++} variant="outlined">
        <Label>Three</Label>
      </Button>
    </Group>

    <br />
    <br />

    <Group variant="outlined" style="display: flex;">
      <Button
        on:click={() => clicked++}
        variant="unelevated"
        color="primary"
        style="flex-grow: 3;">
        <Label>Primary</Label>
      </Button>
      <Button
        on:click={() => clicked++}
        variant="unelevated"
        color="secondary"
        style="flex-grow: 1;">
        <Label>Secondary</Label>
      </Button>
      <Button
        on:click={() => clicked++}
        variant="unelevated"
        color="secondary"
        style="flex-grow: 1;">
        <Label>Secondary</Label>
      </Button>
    </Group>
  </div>

  <div>
    Split buttons using a button group:
    <br />
    <Group variant="raised">
      <Button on:click={() => clicked++} variant="raised">
        <Label>Do the thing</Label>
      </Button>
      <div use:GroupItem>
        <Button
          on:click={() => menu.setOpen(true)}
          variant="raised"
          style="padding: 0; min-width: 36px;">
          <Icon class="material-icons" style="margin: 0;">arrow_drop_down</Icon>
        </Button>
        <Menu bind:this={menu} anchorCorner={Corner.TOP_LEFT}>
          <List>
            <Item on:SMUI:action={() => clicked++}>
              <Text>Thing 1</Text>
            </Item>
            <Item on:SMUI:action={() => clicked++}>
              <Text>Thing 2</Text>
            </Item>
            <Separator />
            <Item on:SMUI:action={() => clicked++}>
              <Text>Thing 3</Text>
            </Item>
          </List>
        </Menu>
      </div>
    </Group>

    <Group variant="outlined">
      <Button on:click={() => clicked++} variant="outlined">
        <Label>Do the thing</Label>
      </Button>
      <div use:GroupItem>
        <Button
          on:click={() => menu2.setOpen(true)}
          variant="outlined"
          style="padding: 0; min-width: 36px;">
          <Icon class="material-icons" style="margin: 0;">arrow_drop_down</Icon>
        </Button>
        <Menu bind:this={menu2} anchorCorner={Corner.TOP_LEFT}>
          <List>
            <Item on:SMUI:action={() => clicked++}>
              <Text>Thing 1</Text>
            </Item>
            <Item on:SMUI:action={() => clicked++}>
              <Text>Thing 2</Text>
            </Item>
            <Separator />
            <Item on:SMUI:action={() => clicked++}>
              <Text>Thing 3</Text>
            </Item>
          </List>
        </Menu>
      </div>
    </Group>
  </div>

  <div>
    Creating rounded buttons with Sass mixins:
    <br />
    <Button
      on:click={() => clicked++}
      variant="raised"
      class={classes.buttonShapedRound}>
      <Label>Raised</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="unelevated"
      class={classes.buttonShapedRound}>
      <Label>Unelevated</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="outlined"
      class={classes.buttonShapedRound}>
      <Label>Outlined</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="unelevated"
      class={classes.buttonShapedRound}>
      <Icon class="material-icons">favorite</Icon>
      <Label>Icon</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="outlined"
      class={classes.buttonShapedRound}>
      <Label>Trailing Icon</Label>
      <Icon class="material-icons">favorite</Icon>
    </Button>
  </div>

  <div>
    Creating notched buttons with vanilla Sass:
    <br />
    <Button
      on:click={() => clicked++}
      variant="raised"
      class={classes.buttonShapedNotch}>
      <Label>Raised</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="unelevated"
      class={classes.buttonShapedNotch}>
      <Label>Unelevated</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="unelevated"
      class={classes.buttonShapedNotch}>
      <Icon class="material-icons">favorite</Icon>
      <Label>Icon</Label>
    </Button>
    <Button
      on:click={() => clicked++}
      variant="unelevated"
      class={classes.buttonShapedNotch}>
      <Label>Trailing Icon</Label>
      <Icon class="material-icons">favorite</Icon>
    </Button>
  </div>
  <pre class="status">Clicked: {clicked}</pre>
</section>
