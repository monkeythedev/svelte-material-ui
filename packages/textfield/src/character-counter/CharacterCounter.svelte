<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = null;
  export let id: string = null;

  export let dom: HTMLInputElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // CharacterCounter
  import { MDCTextFieldCharacterCounter } from "@material/textfield/character-counter";
  import { onMount, onDestroy } from "svelte";

  let characterCounter: MDCTextFieldCharacterCounter;
  onMount(() => {
    characterCounter = new MDCTextFieldCharacterCounter(dom);
  });

  onDestroy(() => {
    characterCounter && characterCounter.destroy();
  });
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-text-field-character-counter {className}"
  {style}
  use:forwardDOMEvents>
  <slot />
</div>
