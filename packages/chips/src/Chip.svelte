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
  import { getChipSetContext, ChipContext } from "./ChipSetContext";
  import { Selectable } from "@smui/common/hoc";
  import { setLabelBehaviour } from "@smui/common/dom/LabelContext";
  import { setIconStyle } from "@smui/common/dom";

  export let value: any = null;
  export let ripple: boolean = true;
  export let selected: boolean = false;
  export let shouldRemoveOnTrailingIconClick: boolean = true;

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
  $: Object.assign(context, { ...context, chip });

  $: if (chip && chip.selected !== selected) {
    chip.selected = selected;
  }

  $: if (
    chip &&
    chip.shouldRemoveOnTrailingIconClick !== shouldRemoveOnTrailingIconClick
  ) {
    chip.shouldRemoveOnTrailingIconClick = shouldRemoveOnTrailingIconClick;
  }

  onDestroy(() => {
    chip.destroy();
    $chipSetContext$.unregisterItem(context);
  });

  function handleSelection(
    event: CustomEvent<{ chipId: string; selected: boolean }>
  ) {
    selected = event.detail.selected;
  }
</script>

<Selectable bind:selected bind:value>
  <div
    bind:this={dom}
    {...props}
    {id}
    role="row"
    class="mdc-chip {className} {selected ? 'mdc-chip--selected' : ''}"
    {style}>
    <span role="gridcell">
      <span role="button" tabindex="0" class="mdc-chip__primary-action">
        <slot />
      </span>
    </span>
  </div>
</Selectable>
