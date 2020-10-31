<script lang="ts">
  import { SelectableGroup } from "@smui/common/src/hoc";

  export let value: any;
</script>

<SelectableGroup bind:value>
  <slot />
</SelectableGroup>
