<script context="module" lang="ts">
  export type FabColor = "primary" | "secondary";
  export type FabVariant = "extended" | "mini";
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  import { setLabelBehaviour } from "@smui/common/dom/LabelContext";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLInputElement = undefined;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Fab
  import { Ripple3 } from "@smui/ripple";
  import { parseClassList } from "@smui/common/functions";

  export let ripple: boolean = true;
  export let color: FabColor = "secondary";
  export let show: boolean = true;
  export let ariaLabel: string = undefined;
  export let variant: FabVariant = undefined;

  let rippleClasses: string;
</script>

<button
  bind:this={dom}
  {...props}
  {id}
  class={parseClassList([
    className,
    'mdc-fab',
    [variant === 'mini', 'mdc-fab--mini'],
    [variant === 'extended', 'mdc-fab--extended'],
    [!show, 'mdc-fab--exited'],
    [color === 'primary', 'smui-fab--color-primary'],
    rippleClasses,
  ])}
  {style}
  aria-label={ariaLabel}
  use:forwardDOMEvents>
  {#if ripple}
    <Ripple3 rippleElement="mdc-fab__ripple" target={dom} bind:rippleClasses />
  {/if}
  <slot />
</button>
