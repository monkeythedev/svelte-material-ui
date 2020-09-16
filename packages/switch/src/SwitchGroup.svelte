<script lang="ts">
  import { SelectableList } from "@smui/common/src/hoc";

  export let value: any;
</script>

<SelectableList bind:value>
  <slot />
</SelectableList>
