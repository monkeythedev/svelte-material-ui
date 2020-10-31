<script lang="ts">
  import { SelectableGroup } from "@smui/common/hoc";

  export let value: any = null;
</script>

<SelectableGroup on:change bind:value>
  <slot />
</SelectableGroup>
