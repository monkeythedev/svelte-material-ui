<script lang="ts">
  import { RadioContext } from "./RadioContext";

  import { createRadioGroupContext } from "./RadioGroupContext";

  export let value: any = null;

  const items = new Set<RadioContext>();

  const context$ = createRadioGroupContext({
    value,
    registerItem(item) {
      items.add(item);
    },
    unregisterItem(item) {
      items.delete(item);
    },
    notifySelected(selectedItem) {
      value = selectedItem.value;

      items.forEach(item => {
        if (item !== selectedItem) {
          item.setSelected(false);
        }
      })
    },
    notifyUnselected(deselectedItem) {
      if (value === deselectedItem.value) {
        value = null;
      }
    }
  });

  $: $context$ = { ...$context$, value };
</script>

<slot />
