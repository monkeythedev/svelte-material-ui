<script lang="ts" context="module">
  interface SMUIRippleProps {
    classForward?: (classList: string[]) => void;
    keyboardEvents?: boolean;
  }

  class SMUIRipple {
    public active = false;
    public ripple: MDCRipple;
    #unbounded: boolean = false;

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

      const adapter: Partial<MDCRippleAdapter> = {
        ...MDCRipple.createAdapter(this),
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
      };

      if (keyboardEvents) {
        adapter.isSurfaceActive = () => this.active;
      }

      const foundation = new MDCRippleFoundation(adapter);

      this.ripple = new MDCRipple(this.root, foundation);

      this.root.addEventListener("focusout", (event: KeyboardEvent) => {
        this.ripple.deactivate();
      });
    }

    get unbounded() {
      return this.ripple?.unbounded ?? this.#unbounded;
    }

    set unbounded(unbounded: boolean) {
      this.ripple.unbounded = unbounded;
      this.#unbounded = unbounded;
    }
  }

  function isSubmitKey(event: KeyboardEvent) {
    const isEnter = event.key === "Enter" || event.keyCode === 13;
    const isSpace = event.key === "Space" || event.keyCode === 32;
    return isEnter || isSpace;
  }
</script>

<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";

  export let dom: HTMLDivElement | HTMLLIElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps;
  //#endregion

  // Ripple
  import { Li, Button, A } from "@smui/common/dom";
  import {
    MDCRipple,
    MDCRippleAdapter,
    MDCRippleFoundation,
  } from "@material/ripple";
  import { onMount } from "svelte";
  import H1 from "@smui/common/dom/H1.svelte";
  import { RippleProps } from "./Ripple";

  export let unbounded: RippleProps["unbounded"] = null;
  export let color: RippleProps["color"] = null;
  export let classForward: RippleProps["classForward"] = null;
  export let keyboardEvents: RippleProps["keyboardEvents"] = null;
  export let rippleElement: RippleProps["rippleElement"] = null;
  export let component: RippleProps["component"];

  export let instance: SMUIRipple = null;

  let rippleTarget: HTMLDivElement;

  onMount(() => {
    instance = new SMUIRipple(dom, {
      classForward: classForward,
      keyboardEvents: keyboardEvents,
    });

    instance.unbounded = unbounded;
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
  this={component}
  props={{ ...props }}
  bind:dom
  class="{className} mdc-ripple-upgraded {color != null ? 'mdc-ripple-surface' : ''}
    {color == 'primary' ? 'mdc-ripple-surface--primary' : ''}
    {color == 'secondary' ? 'mdc-ripple-surface--accent' : ''}"
  {style}
  on:domEvent={forwardDOMEvents}>
  {#if rippleElement}
    <span class={rippleElement} bind:this={rippleTarget} />
  {/if}
  <slot />
</svelte:component>
