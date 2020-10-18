<script lang="ts" context="module">
  import {
    MDCRipple,
    MDCRippleAdapter,
    MDCRippleFoundation,
  } from "@material/ripple";

  let count = 0;

  interface SMUIRippleProps {
    classForward?: (classList: string[]) => void;
    keyboardEvents?: boolean;
  }

  export class SMUIRipple {
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
              classForward([...classList]);
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

    destroy() {
      this.ripple?.destroy();
    }
  }

  function isSubmitKey(event: KeyboardEvent) {
    const isEnter = event.key === "Enter";
    const isSpace = event.key === "Space";
    return isEnter || isSpace;
  }
</script>

<script lang="ts">
  import { RippleProps } from "./Ripple";
  import { Use } from "@smui/common/hooks";
  import { onDestroy } from "svelte";

  export let target: HTMLElement;
  export let unbounded: RippleProps["unbounded"] = null;
  export let color: RippleProps["color"] = null;
  export let rippleClasses: string = "";
  export let keyboardEvents: RippleProps["keyboardEvents"] = null;
  let className = "";
  export { className as class };

  let ripple: SMUIRipple;
  const id = count++;

  $: if (target) {
    // Fix ripple on selectable items
    // if (target.classList.contains("mdc-ripple-upgraded--background-focused")) {
    //   className += " mdc-ripple-upgraded--background-focused";
    // }
    // if (target.classList.contains("mdc-ripple-upgraded--foreground-activation")) {
    //   className += " mdc-ripple-upgraded--foreground-activation";
    // }

    if (color) target.classList.add("mdc-ripple-surface");
    if (color == "primary") target.classList.add("mdc-ripple-surface--primary");
    if (color == "secondary")
      target.classList.add("mdc-ripple-surface--accent");
    if (className)
      className
        .split(" ")
        .forEach((classToken) => target.classList.add(classToken));
  }

  function classForward(classList: string[]) {
    rippleClasses = classList.join(" ");
  }

  function init() {
    target.classList.add("mdc-ripple-upgraded");

    ripple = new SMUIRipple(target, {
      classForward: classForward,
      keyboardEvents: keyboardEvents,
    });

    ripple.unbounded = unbounded;
  }

  export function reinstantiate() {
    ripple?.destroy();
    init();
  }

  onDestroy(() => {
    ripple?.destroy();
  });
</script>

<Use once effect hook={init} when={!!target} />
