<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLSpanElement = null;
  import { BaseProps } from "../Props";
  export let props: BaseProps = {};

  // Icon
  import { getContext } from "svelte";
  import { getIconStyle } from "./IconContextProps";

  export let on: boolean = false;
  export let leading: boolean = false;
  export let leadingHidden: boolean = false;
  export let trailing: boolean = false;

  const context = getContext("SMUI:icon:context");
  const iconStyle = getIconStyle();
</script>

<i
  bind:this={dom}
  {...props}
  class="{className}
    {iconStyle === 'button' ? 'mdc-button__icon' : ''}
    {iconStyle === 'fab' ? 'mdc-fab__icon' : ''}
    {iconStyle === 'icon-button' ? 'mdc-icon-button__icon' : ''}
    {iconStyle === 'icon-button' && on ? 'mdc-icon-button__icon--on' : ''}
    {iconStyle === 'chip' ? 'mdc-chip__icon' : ''}
    {iconStyle === 'chip' && leading ? 'mdc-chip__icon--leading' : ''}
    {iconStyle === 'chip' && leadingHidden ? 'mdc-chip__icon--leading-hidden' : ''}
    {iconStyle === 'chip' && trailing ? 'mdc-chip__icon--trailing' : ''}
    {iconStyle === 'tab' ? 'mdc-tab__icon' : ''}"
  {style}
  use:forwardDOMEvents
  aria-hidden="true">
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
