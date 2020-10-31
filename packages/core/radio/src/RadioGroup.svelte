<script lang="ts">
  import { SelectableGroup } from "@smui/common/src/hoc";

  export let value: any = null;
</script>

<SelectableGroup selectionType="single" bind:value>
  <slot />
</SelectableGroup>
