<script lang="ts">
  import { Tab, Label } from "@smui/tab";
  import { TabBar } from "@smui/tab-bar";
</script>

<div>
  Min width tabs:
  <TabBar>
    {#each ['Home', 'Merchandise', 'About Us'] as tab}
      <Tab minWidth>
        <Label>{tab}</Label>
      </Tab>
    {/each}
  </TabBar>
</div>