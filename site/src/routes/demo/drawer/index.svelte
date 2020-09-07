<script lang="ts">
  import {
    Drawer,
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
    Scrim,
  } from "@smui/drawer";
  import { Button, Label } from "@smui/button";
  import { List, Item, Text, Graphic, Separator, Subheader } from "@smui/list";
  import H6 from "@smui/common/dom/H6.svelte";
  import BaseDrawer from "./BaseDrawer.svelte";
  import DismissibleDrawer from "./DismissibleDrawer.svelte";
  import ModalDrawer from "./ModalDrawer.svelte";
</script>

<svelte:head>
  <title>Drawers - SMUI</title>
</svelte:head>

<section>
  <h2>Drawers</h2>

  <BaseDrawer />
  <DismissibleDrawer />
  <ModalDrawer />
</section>
