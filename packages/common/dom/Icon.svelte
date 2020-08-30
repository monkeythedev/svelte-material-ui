<script lang="ts">
  import { getContext } from "svelte";
  import { createEventDispatcher } from "svelte/internal";
  import { forwardAllDOMEvents } from "../forwardEvents";
  // import { exclude } from "../exclude.js";
  // import { useActions } from "../useActions.js";

  const dispatcher = createEventDispatcher();

  export let dom: HTMLElement = null;
  // export let use = [];
  let className: string = "";
  export { className as class };

  export let on: boolean = false;
  export let leading: boolean = false;
  export let leadingHidden: boolean = false;
  export let trailing: boolean = false;
  export let style = "";

  const context = getContext("SMUI:icon:context");
</script>

<i
  bind:this={dom}
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
  {style}>
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
