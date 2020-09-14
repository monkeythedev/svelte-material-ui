<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement = null;
  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // Dialog
  import {
    onMount,
    onDestroy,
    getContext,
    setContext,
    createEventDispatcher,
  } from "svelte";
  import { createDialogContext } from "./DialogContext";
  import { memo } from "@smui/common/utils";
  import { MDCDialog, MDCDialogCloseEvent } from "@material/dialog";

  export let escapeKeyAction = "close";
  export let scrimClickAction = "close";
  export let autoStackButtons = true;
  export let initialFocus: HTMLElement = null;
  export let open: boolean = false;

  const dispatch = createEventDispatcher();
  let mounted: boolean = false;

  let context$ = createDialogContext();
  $: $context$ = { ...$context$, _open: isOpen };

  const openMemo = memo();
  $: if (mounted && openMemo.val !== open) {
    if (open) doOpen();
    else doClose();
  }

  onMount(() => {
    mounted = true;
  });

  let dialog: MDCDialog;

  $: dialog && (dialog.escapeKeyAction = escapeKeyAction);
  $: dialog && (dialog.scrimClickAction = scrimClickAction);
  $: dialog && (dialog.autoStackButtons = autoStackButtons);

  function setInitialFocusElement() {
    const currentInitalFocusElement = dom.querySelector(
      "[data-mdc-dialog-initial-focus]"
    );

    if (initialFocus && currentInitalFocusElement !== initialFocus) {
      removeInitialFocusAttr(currentInitalFocusElement);
      setInitialFocusAttr(initialFocus);
    }

    if (
      !initialFocus &&
      (!currentInitalFocusElement || !dom.contains(currentInitalFocusElement))
    ) {
      const defaultAction = dom.querySelector(
        "[data-mdc-dialog-button-default]"
      );
      if (defaultAction) {
        removeInitialFocusAttr(currentInitalFocusElement);
        setInitialFocusAttr(defaultAction);
      }
    }
  }

  function setInitialFocusAttr(element: Element) {
    if (element) element.setAttribute("data-mdc-dialog-initial-focus", "");
  }

  function removeInitialFocusAttr(element: Element) {
    if (element) element.removeAttribute("data-mdc-dialog-initial-focus");
  }

  function handleDialogOpened() {
    if (!open) open = true;

    dispatch("opened");
  }

  function handleDialogClosed(event: MDCDialogCloseEvent) {
    if (open) open = false;

    dialog.destroy();
    dialog = null;

    dispatch("closed", event.detail);
  }

  export function doOpen() {
    if (dialog) return;

    open = true;
    openMemo.val = open;

    setInitialFocusElement();
    
    dialog = new MDCDialog(dom);

    dialog.listen("MDCDialog:opened", handleDialogOpened);
    dialog.listen("MDCDialog:closed", handleDialogClosed);

    dialog.open();
  }

  export function doClose() {
    open = false;
    openMemo.val = open;

    dialog?.close();
  }

  export function isOpen() {
    return dialog?.isOpen;
  }

  export function layout() {
    return dialog?.layout();
  }
</script>

<div
  bind:this={dom}
  {...props}
  {id}
  class="mdc-dialog {className}"
  {style}
  use:forwardDOMEvents
  role="alertdialog"
  aria-modal="true">
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface">
      <slot />
    </div>
  </div>
  <div class="mdc-dialog__scrim" />
</div>
