<script lang="ts">
  import { memo } from "../utils";
  import { SelectableContext, setSelectableContext } from "./SelectableContext";
  import { getSelectableListContext } from "./SelectableListContext";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  export let selected: boolean = false;
  export let value: any = null;

  const dispatch = createEventDispatcher();

  const selectableListContext$ = getSelectableListContext();

  const context = {} as SelectableContext;
  const context$ = setSelectableContext({
    setSelected,
    setValue,
  });

  $: $context$ = Object.assign(context, { ...$context$, selected, value });

  const selectedMemo = memo(selected);

  //#region on selected value changed from outside
  $: if (selectedMemo.val !== selected) {
    _setSelected(selected);

    if (selectableListContext$) {
      if (selected) {
        $selectableListContext$.notifySelected(context);
      } else {
        $selectableListContext$.notifyDeselected(context);
      }
    }

    dispatch("change", {
      value, selected
    })
  }
  //#endregion

  onMount(() => {
    $selectableListContext$?.registerItem(context);
  })

  onDestroy(() => {
    $selectableListContext$?.unregisterItem(context);
  })

  function _setSelected(_selected: boolean) {
    if (selectedMemo.val !== _selected) {
      selected = _selected;
      selectedMemo.val = selected;
    }
  }

  export function setSelected(_selected: boolean) {
    if (selected !== _selected) {
      selected = _selected;
    }
  }

  export function setValue(_value: any) {
    if (value !== _value) value = _value;
  }
</script>

<slot />
