<script lang="ts">
  import { SelectableList } from "@smui/common/hoc";

  export let value: any = null;
</script>

<SelectableList on:change bind:value>
  <slot />
</SelectableList>
