<script>
  import { getSelectableContext } from "@smui/common/hoc";

  const selectable$ = getSelectableContext();
</script>

<span role="gridcell">
  <span
    role="button"
    tabindex={$selectable$.tabindex}
    class="mdc-chip__primary-action"
    aria-checked={$selectable$.selected}>
    <slot />
  </span>
</span>
