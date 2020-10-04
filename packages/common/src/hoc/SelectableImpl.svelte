<script lang="ts">
  import {
    SelectableContext,
    setSelectableContext,
  } from "./SelectableContext";
  import { getSelectableListContext } from "./SelectableListContext";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { UseState } from "../hooks";

  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let value: any = null;
  export let tabindex: number = null;

  const dispatch = createEventDispatcher<{
    change: {
      value: typeof value,
      selected: boolean,
    }
  }>();

  const selectableListContext$ = getSelectableListContext();

  const context = {} as SelectableContext;
  const context$ = setSelectableContext({
    setSelected,
    setValue,
    setTabIndex(_tabindex: number) {
      tabindex = _tabindex;
    },
    selected,
    value,
    tabindex,
    disabled,
  });

  $: $context$ = Object.assign(context, {
    ...$context$,
    selected,
    value,
    tabindex,
    disabled,
  });

  $: if (disabled && tabindex === 0) tabindex = -1;

  function onSelectedUpdate() {
    if (selectableListContext$) {
      if (selected) {
        $selectableListContext$.notifySelected(context);
      } else {
        $selectableListContext$.notifyUnselected(context);
      }
    }

    dispatch("change", {
      value,
      selected,
    });
  }

  onMount(() => {
    $selectableListContext$?.registerItem(context);
  });

  onDestroy(() => {
    $selectableListContext$?.unregisterItem(context);
  });

  export function setSelected(_selected: boolean) {
    if (selected !== _selected) {
      selected = _selected;
    }
  }

  export function setValue(_value: any) {
    if (value !== _value) value = _value;
  }

  export function notifyFocus() {
    $selectableListContext$.notifyFocus($context$);
  }
</script>

<UseState value={selected} onUpdate={onSelectedUpdate} />

<slot />
