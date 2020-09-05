<script lang="ts" context="module">
  interface SMUIRippleProps {
    classForward?: (classList: string[]) => void;
    keyboardEvents?: boolean;
  }

  class SMUIRipple {
    public active = false;
    public ripple: MDCRipple;

    constructor(
      public root: HTMLElement,
      { classForward, keyboardEvents }: SMUIRippleProps
    ) {
      let classList: string[] = [];

      if (keyboardEvents) {
        this.root.addEventListener("keydown", (event: KeyboardEvent) => {
          if (isSubmitKey(event)) this.active = true;
        });

        this.root.addEventListener("keyup", (event: KeyboardEvent) => {
          if (isSubmitKey(event)) this.active = false;
        });
      }

      const foundation = new MDCRippleFoundation({
        ...MDCRipple.createAdapter(this),
        isSurfaceActive: keyboardEvents ? () => this.active : null,
        addClass: (className: string) => {
          const idx = classList.indexOf(className);
          if (idx === -1) {
            this.root.classList.add(className);
            classList.push(className);
            if (classForward) {
              classForward(classList);
            }
          }
        },
        removeClass: (className: string) => {
          const idx = classList.indexOf(className);
          if (idx !== -1) {
            this.root.classList.remove(className);
            classList.splice(idx, 1);
            if (classForward) {
              classForward(classList);
            }
          }
        },
      });

      this.ripple = new MDCRipple(this.root, foundation);

      this.root.addEventListener("focusout", (event: KeyboardEvent) => {
        this.ripple.deactivate();
      });
    }
  }

  function isSubmitKey(event: KeyboardEvent) {
    const isEnter = event.key === "Enter" || event.keyCode === 13;
    const isSpace = event.key === "Space" || event.keyCode === 32;
    return isEnter || isSpace;
  }
</script>

<script lang="ts">
  // Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement | HTMLLIElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps;

  // Ripple
  import { Li, Button, A } from "@smui/common/dom";
  import { MDCRipple, MDCRippleFoundation } from "@material/ripple";
  import { onMount } from "svelte";
  import H1 from "@smui/common/dom/H1.svelte";
  import { RippleProps } from "./Ripple";


  export let rippleProps: RippleProps;
  export let instance: SMUIRipple = null;

  onMount(() => {
    instance = new SMUIRipple(dom, {
      classForward: rippleProps.classForward,
      keyboardEvents: rippleProps.keyboardEvents,
    });
    instance.ripple.unbounded = rippleProps.unbounded;
  });

  // Fix ripple on selectable items
  $: {
    if (dom?.classList.contains("mdc-ripple-upgraded--background-focused")) {
      className += " mdc-ripple-upgraded--background-focused";
    }

    if (dom?.classList.contains("mdc-ripple-upgraded--foreground-activation")) {
      className += " mdc-ripple-upgraded--foreground-activation";
    }
  }
</script>

<svelte:component
  this={rippleProps.component}
  props={{ ...props }}
  bind:dom
  class="{className}
    mdc-ripple-upgraded
    {rippleProps.color !== null ? 'mdc-ripple-surface' : ''}
    {rippleProps.color === 'primary' ? 'mdc-ripple-surface--primary' : ''}
    {rippleProps.color === 'secondary' ? 'mdc-ripple-surface--accent' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}>
  <slot />
</svelte:component>
