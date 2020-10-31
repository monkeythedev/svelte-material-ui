<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Paper
  export let square: boolean = false;
  export let color: "default" | "primary" | "secondary" = "default";
  export let elevation: number = 1;
  export let transition: boolean = false;
</script>

<div
  bind:this={dom}
  {id}
  class="
    smui-paper
    {className}
    {elevation !== 0 ? 'mdc-elevation--z' + elevation : ''}
    {!square ? 'smui-paper--rounded' : ''}
    {color === 'primary' ? 'smui-paper--color-primary' : ''}
    {color === 'secondary' ? 'smui-paper--color-secondary' : ''}
    {transition ? 'mdc-elevation-transition' : ''}
  "
  {style}
  use:forwardDOMEvents>
  <slot />
</div>
