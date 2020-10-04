<script lang="ts" context="module">
  import { BaseProps } from "@smui/common/dom/Props";

  export interface AProps extends BaseProps {
    target?: string;
    href?: string;
  }
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLAnchorElement = null;

  export let props: AProps = {};
  //#endregion

  // A
</script>

<a
  bind:this={dom}
  {...props}
  {id}
  class={className}
  {style}
  href={props.href}
  use:forwardDOMEvents>
  <slot />
</a>
