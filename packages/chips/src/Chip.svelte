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

  // Chip
  import { MDCChip } from "@material/chips";
  import { onDestroy, onMount, setContext } from "svelte";
  import { Ripple2 } from "@smui/ripple";
  import { getChipSetContext } from "./ChipSetContext";
  import { ChipContext } from "./ChipContext";
  import { Selectable } from "@smui/common/hoc";
  import { setLabelBehaviour } from "@smui/common/dom/LabelContext";
  import { setIconStyle } from "@smui/common/dom";
  import Use from "@smui/common/src/hooks/Use.svelte";

  export let value: any = null;
  export let ripple: boolean = true;
  export let selected: boolean = false;
  export let shouldRemoveOnTrailingIconClick: boolean = true;

  let selectable: Selectable;

  setLabelBehaviour("chip");
  setIconStyle("chip");

  const chipSetContext$ = getChipSetContext();
  
  const context: ChipContext = {
    setChip(_chip: MDCChip) {
      if (chip !== _chip) {
        chip = _chip;
        if (!ripple) {
          chip.ripple && chip.ripple.destroy();
        }
        
        chip.listen("MDCChip:selection", handleSelection);
      }
    },
  } as ChipContext;

  let chip: MDCChip;
  $: Object.assign(context, { ...context, chip, dom, selected });
  
  $: if (chip && chip.selected !== selected) {
    // Add class mdc-chip--selected
    chip.selected = selected;
  }

  $: if (
    chip &&
    chip.shouldRemoveOnTrailingIconClick !== shouldRemoveOnTrailingIconClick
  ) {
    chip.shouldRemoveOnTrailingIconClick = shouldRemoveOnTrailingIconClick;
  }

  onDestroy(() => {
    chip?.destroy();
    $chipSetContext$?.unregisterItem(context);
  });

  function registerChip() {
    if (chipSetContext$) {
      $chipSetContext$.registerItem(context);
    }
  }

  function handleSelection(
    event: CustomEvent<{ chipId: string; selected: boolean }>
  ) {
    selectable.setSelected(event.detail.selected);
  }
</script>

<Selectable bind:this={selectable} bind:selected bind:value>
  <div
    bind:this={dom}
    {...props}
    {id}
    role="row"
    class="mdc-chip {className}"
    {style}>
    <div class="mdc-chip__ripple"></div>
    <slot />
  </div>
</Selectable>

<Use effect hook={registerChip}></Use>