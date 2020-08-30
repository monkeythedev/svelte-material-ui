<script lang="ts">
  import "./app.scss";
  import { Button, Icon, Label } from "@smui/button";
  import { Group, GroupItem } from "@smui/button/group";
  import * as classes from "./button.module.scss";
  import * as appClasses from "./_app.module.scss";
  import { Menu } from "@smui/menu";
  import { List, Item, Text, Separator } from "@smui/list";
  import { Corner } from "@smui/menu-surface/MenuSurface.svelte";
  import { TopAppBar, Row, Section, Title } from "@smui/top-app-bar";
  import { A } from "@smui/common/dom";
  import { IconButton } from "@smui/icon-button";
  import { Drawer, Content, Scrim, AppContent } from "@smui/drawer";
  import { onMount } from "svelte";
  import { menuItems } from "./menuItems";
  import { stores } from "@sapper/app";
  import { mdiFileDocument, mdiCodeTags, mdiTwitter, mdiGithub } from "@mdi/js";

  let clicked = 0;
  let menu: Menu;
  let menu2: Menu;

  const { page } = stores();
  const iframe = $page.path.startsWith("/demo/top-app-bar-iframe");

  let mainContent;
  let miniWindow = false;
  let drawerOpen = false;

  const sections = menuItems;

  let activeSection = sections.find(
    (section) => "route" in section && section.route === $page.path
  );
  $: repos =
    activeSection && "repos" in activeSection ? activeSection.repos : [];

  onMount(setMiniWindow);

  function pickSection(section) {
    drawerOpen = false;
    mainContent.scrollTop = 0;

    // Svelte/Sapper is not updated the components correctly, so I need this.
    // sections.forEach((section) => section.component.$set({ activated: false }));
    // section.component.$set({ activated: true });

    activeSection =
      "shortcut" in section
        ? sections.find((sec) => sec.route === section.shortcut)
        : section;
  }

  function setMiniWindow() {
    miniWindow = window.innerWidth < 720;
  }
</script>

<style lang="scss">
  .drawer-container {
    flex-grow: 1;
    height: 0;
    display: flex;
  }
</style>

<svelte:window on:resize={setMiniWindow} />

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<TopAppBar variant="static" class={appClasses.demoTopAppBar}>
  <Row>
    <Section>
      {#if miniWindow}
        <IconButton
          class="material-icons"
          on:click={() => (drawerOpen = !drawerOpen)}>
          menu
        </IconButton>
      {/if}
      <Title
        component={A}
        href="/"
        on:click={() => (activeSection = null)}
        class="mdc-theme--primary"
        style={miniWindow ? 'padding-left: 0;' : ''}>
        Svelte Material UI
      </Title>
    </Section>
    <Section align="end" toolbar>
      {#each repos as repo}
        <IconButton
          href={repo}
          title={`View Component: ${repo.split('/').slice(-1)[0]}`}>
          <Icon>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#000000" d={mdiFileDocument} />
            </svg>
          </Icon>
        </IconButton>
      {/each}
      {#if activeSection}
        <IconButton
          href={`https://github.com/hperrin/svelte-material-ui/blob/master/site/src/routes${activeSection.route}.svelte`}
          title={`View Demo Code: ${activeSection.route
              .split('/')
              .slice(-1)[0]}`}>
          <Icon>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#000000" d={mdiCodeTags} />
            </svg>
          </Icon>
        </IconButton>
      {/if}
      <IconButton href="https://twitter.com/SciActive">
        <Icon>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d={mdiTwitter} />
          </svg>
        </Icon>
      </IconButton>
      <IconButton href="https://github.com/hperrin/svelte-material-ui">
        <Icon>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d={mdiGithub} />
          </svg>
        </Icon>
      </IconButton>
    </Section>
  </Row>
</TopAppBar>

<div class="drawer-container">
  <Drawer
    variant={miniWindow ? 'modal' : null}
    bind:open={drawerOpen}
    class="{appClasses.demoDrawer} mdc-theme--secondary-bg {miniWindow ? appClasses.demoDrawerAdjust : ''}">
    <Content>
      <List>
        {#each sections as section (section.name)}
          <Item
            bind:this={section.component}
            href={section.route || section.shortcut}
            on:click={() => pickSection(section)}
            activated={'route' in section && section.route === $page.path}
            title={section.name}
            style={section.indent ? 'margin-left: ' + section.indent * 25 + 'px;' : ''}>
            <Text class="mdc-theme--on-secondary">{section.name}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>

  {#if miniWindow}
    <Scrim />
  {/if}
  <AppContent class={appClasses.demoAppContent}>
    <main class={appClasses.demoMainContent} bind:this={mainContent}>
      <slot />
    </main>
  </AppContent>
</div>

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
  <Button on:click={() => clicked++} href="http://example.com" target="_blank">
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
  <Button color="secondary" on:click={() => clicked++} class={classes.myClass}>
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
clicked: {clicked}
