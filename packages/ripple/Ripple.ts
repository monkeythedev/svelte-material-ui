import { MDCRipple, MDCRippleAdapter } from "@material/ripple";
import { BaseProps } from "@smui/common/dom/Props";
import { getContext } from "svelte";

export interface RippleProps extends BaseProps {
  ripple?: {
    unbounded?: boolean;
    color?: "surface" | "primary" | "secondary";
    classForward?: (classList: string[]) => void;
    keyboardEvents?: boolean;
    component: any;
  };
}

export function Ripple(node: HTMLElement, props: RippleProps) {
  let instance: MDCRipple = null;
  let addLayoutListener = getContext("SMUI:addLayoutListener") as any;
  let removeLayoutListener;
  let classList = [];

  function addClass(className) {
    const idx = classList.indexOf(className);
    if (idx === -1) {
      node.classList.add(className);
      classList.push(className);
      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function removeClass(className) {
    const idx = classList.indexOf(className);
    if (idx !== -1) {
      node.classList.remove(className);
      classList.splice(idx, 1);
      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function handleProps() {
    if (props && !instance) {
      // Override the Ripple component's adapter, so that we can forward classes
      // to Svelte components that overwrite Ripple's classes.
      const _createAdapter = MDCRipple.createAdapter;
      MDCRipple.createAdapter = function (...args) {
        const adapter: MDCRippleAdapter = _createAdapter.apply(this, args);

        adapter.addClass = function (className) {
          return addClass(className);
        };

        adapter.removeClass = function (className) {
          return removeClass(className);
        };

        adapter.isSurfaceActive = () => this.active;

        node.addEventListener("keydown", (evt) => {
          this.active = true;
        });

        node.addEventListener("keyup", (evt) => {
          this.active = false;
        });

        return adapter;
      };

      instance = new MDCRipple(node);
      instance.deactivate();
      MDCRipple.createAdapter = _createAdapter;
    } else if (instance && !props) {
      instance.destroy();
      instance = null;
    }
    if (props) {
      instance.unbounded = !!props.unbounded;
      switch (props.color) {
        case "surface":
          addClass("mdc-ripple-surface");
          removeClass("mdc-ripple-surface--primary");
          removeClass("mdc-ripple-surface--accent");
          return;
        case "primary":
          addClass("mdc-ripple-surface");
          addClass("mdc-ripple-surface--primary");
          removeClass("mdc-ripple-surface--accent");
          return;
        case "secondary":
          addClass("mdc-ripple-surface");
          removeClass("mdc-ripple-surface--primary");
          addClass("mdc-ripple-surface--accent");
          return;
      }
    }
    removeClass("mdc-ripple-surface");
    removeClass("mdc-ripple-surface--primary");
    removeClass("mdc-ripple-surface--accent");
  }

  handleProps();

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  function layout() {
    if (instance) {
      instance.layout();
    }
  }

  return {
    update(newProps: RippleProps) {
      props = newProps;
      handleProps();
    },

    destroy() {
      if (instance) {
        instance.destroy();
        instance = null;
        removeClass("mdc-ripple-surface");
        removeClass("mdc-ripple-surface--primary");
        removeClass("mdc-ripple-surface--accent");
      }

      if (removeLayoutListener) {
        removeLayoutListener();
      }
    },
  };
}
