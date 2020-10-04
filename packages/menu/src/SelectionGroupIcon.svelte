<script lang="ts">
  import { Graphic, setIsSelectionGroupIcon } from "@smui/list";

  setIsSelectionGroupIcon(true);
</script>

<Graphic class="mdc-menu__selection-group-icon" icon>
  <slot />
</Graphic>
