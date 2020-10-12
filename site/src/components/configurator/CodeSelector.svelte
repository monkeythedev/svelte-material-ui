<script lang="ts">
  import classes from "./CodeSelector.module.scss";
  import { ExtractNamedSlot } from "@smui/common/components";
  import Code from "./code/Code.svelte";
  import { Item, List, Text } from "@smui/list";

  export let svelte: string;
  export let scss: string;

  let selection: "svelte" | "scss" = "svelte";

  $: if (selection === "scss" && !scss) {
    selection = "svelte"
  }
</script>

<div class={classes['code-selector']}>
  <div class={classes['source']}>
    {#if selection === 'svelte'}
      <Code language="html" source={svelte}></Code>
    {:else}
      <Code language="scss" source={scss}></Code>
    {/if}
  </div>
  {#if scss}
    <div class={classes['selection-list']}>
      <List class={classes['list']} bind:value={selection} role="listbox">
        <Item value="svelte">
          <Text>Svelte</Text>
        </Item>
          <Item value="scss">
            <Text>SCSS</Text>
          </Item>
      </List>
    </div>
  {/if}
</div>
