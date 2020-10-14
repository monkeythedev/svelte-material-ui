<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { UseState } from "../../hooks";

  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let value: any = undefined;
  export let tabindex: number = undefined;

  const dispatch = createEventDispatcher<{
    change: {
      value: typeof value;
      selected: boolean;
    };
    notifySelected: void;
    notifyUnselected: void;
  }>();

  $: if (disabled && tabindex === 0) tabindex = -1;

  function onSelectedUpdate() {
    if (selected) {
      dispatch("notifySelected");
    } else {
      dispatch("notifyUnselected");
    }

    dispatch("change", {
      value,
      selected,
    });
  }

  export function setSelected(_selected: boolean) {
    if (selected !== _selected) {
      selected = _selected;
    }
  }

  export function setValue(newValue: any) {
    if (value !== newValue) {
      value = newValue;
    }
  }

  export function setTabIndex(newTabindex: number) {
    if (tabindex !== newTabindex) {
      tabindex = newTabindex;
    }
  }
</script>

<UseState value={selected} onUpdate={onSelectedUpdate} />