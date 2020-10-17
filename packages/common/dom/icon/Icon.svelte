<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  export let dom: HTMLSpanElement = undefined;
  import { BaseProps } from "../Props";
  export let props: BaseProps = {};

  // Icon
  import { getIconBehaviour } from "./IconContextProps";

  export let leading: boolean = false;
  export let leadingHidden: boolean = false;
  export let trailing: boolean = false;

  const iconStyle = getIconBehaviour();
</script>

<i
  bind:this={dom}
  {...props}
  {id}
  class="{className || 'material-icons'}
    {iconStyle === 'fab' ? 'mdc-fab__icon' : ''}
    {iconStyle === 'chip' ? 'mdc-chip__icon' : ''}
    {iconStyle === 'chip' && leading ? 'mdc-chip__icon--leading' : ''}
    {iconStyle === 'chip' && leadingHidden ? 'mdc-chip__icon--leading-hidden' : ''}
    {iconStyle === 'chip' && trailing ? 'mdc-chip__icon--trailing mdc-chip-trailing-action' : ''}
    {iconStyle === 'tab' ? 'mdc-tab__icon' : ''}"
  {style}
  use:forwardDOMEvents>
  <slot />
</i>

<!-- <i
  bind:this={dom}
  use:useActions={use}
  use:forwardAllDOMEvents={dispatcher}
  class="
  {className}
  {context === 'button' ? 'mdc-button__icon' : ''}
  {context === 'fab' ? 'mdc-fab__icon' : ''}
  {context === 'icon-button' ? 'mdc-icon-button__icon' : ''}
  {context === 'icon-button' && on ? 'mdc-icon-button__icon--on' : ''}
  {context === 'chip' ? 'mdc-chip__icon' : ''}
  {context === 'chip' && leading ? 'mdc-chip__icon--leading' : ''}
  {context === 'chip' && leadingHidden ? 'mdc-chip__icon--leading-hidden' : ''}
  {context === 'chip' && trailing ? 'mdc-chip__icon--trailing' : ''}
  {context === 'tab' ? 'mdc-tab__icon' : ''}
  "
  aria-hidden="true"
  {...exclude($$props, [
    'use',
    'class',
    'on',
    'leading',
    'leadingHidden',
    'trailing',
  ])}>
  <slot />
</i> -->
