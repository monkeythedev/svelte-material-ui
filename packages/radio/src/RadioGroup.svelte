<script lang="ts">
  import { SelectableList } from "@smui/common/src/hoc";

  export let value: any = null;
</script>

<SelectableList selectionType="single" bind:value>
  <slot />
</SelectableList>
