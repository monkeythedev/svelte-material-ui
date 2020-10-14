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
  import { SelectableGroup } from "@smui/common/hoc";
  import { createChipSetContext } from "./ChipSetContext";
  import { ChipContext } from "./ChipContext";
  import { arrRemove, arrAdd, arrHas } from "@smui/common/src/utils";
import Use from "@smui/common/src/hooks/Use.svelte";

  export let value: any = null;
  export let choice: boolean = false;
  export let filter: boolean = false;
  export let input: boolean = false;

  let items: ChipContext[] = [];
  let selectableGroup: SelectableGroup;
  const context$ = createChipSetContext({
    registerItem(chip: ChipContext) {
      if (chipSet && !arrHas(items, chip)) {
        chipSet.addChip(chip.dom);
      }

      items = arrAdd(items, chip);
    },
    unregisterItem(chip: ChipContext) {
      items = arrRemove(items, chip);
    },
  });

  // Update chips instances
  $: if (chipSet && items.length) {
    Array.from(items).forEach((item, index) => {
      if (!item.chip) {
        item.setChip(chipSet.chips[index]);
      }
    });
  }

  let chipSet: MDCChipSet;
  /** Must be an hook because chip uses hooks to initialize */
  function initChipSet() {
    chipSet = new MDCChipSet(dom);
  };

  onDestroy(() => {
    chipSet && chipSet.destroy();
  });
</script>

<SelectableGroup
  bind:this={selectableGroup}
  selectionType={choice ? 'single' : filter || input ? 'multi' : null}
  bind:value>
  <div
    bind:this={dom}
    {...props}
    role="grid"
    {id}
    class="mdc-chip-set {className}
      {choice ? 'mdc-chip-set--choice' : ''}
      {filter ? 'mdc-chip-set--filter' : ''}
      {input ? 'mdc-chip-set--input' : ''}"
    {style}
    use:forwardDOMEvents>
    <slot />
  </div>
</SelectableGroup>

<Use effect hook={initChipSet}></Use>
