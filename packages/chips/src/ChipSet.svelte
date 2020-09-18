<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // ChipSet
  import { MDCChipSet } from "@material/chips";
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { SelectableList } from "@smui/common/hoc";
  import { ChipContext, createChipSetContext } from "./ChipSetContext";

  export let value: any = null;
  export let choice: boolean = false;
  export let filter: boolean = false;
  export let input: boolean = false;

  let items = new Set<ChipContext>();
  let selectableList: SelectableList;
  const context$ = createChipSetContext({
    registerItem(chip: ChipContext) {
      items.add(chip);
    },
    unregisterItem(chip: ChipContext) {
      items.delete(chip);
    },
  });

  // Update chips instances
  $: if (chipSet && items.size) {
    Array.from(items).forEach((item, index) => {
      if (!item.chip) {
        item.setChip(chipSet.chips[index]);
      }
    });
  }

  let chipSet: MDCChipSet;
  onMount(() => {
    chipSet = new MDCChipSet(dom);
  });

  // Update the MDCChip when the selection changes.
  $: if (chipSet) {
  }

  onDestroy(() => {
    chipSet && chipSet.destroy();
  });
</script>

<SelectableList
  bind:this={selectableList}
  selectionType={choice ? 'single' : filter || input ? 'multi' : null}
  bind:value>
  <div
    bind:this={dom}
    {id}
    {...props}
    class="mdc-chip-set {className}
      {choice ? 'mdc-chip-set--choice' : ''}
      {filter ? 'mdc-chip-set--filter' : ''}
      {input ? 'mdc-chip-set--input' : ''}"
    {style}
    use:forwardDOMEvents>
    <slot />
  </div>
</SelectableList>
