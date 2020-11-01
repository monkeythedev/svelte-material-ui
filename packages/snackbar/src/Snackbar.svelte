<script context="module" lang="ts">
	import { SnackbarContext } from "./";

	let currentOpenSnackbar: SnackbarContext = undefined;
	let enterTimeout: number = undefined;
	const OPEN_DEBOUNCE = 250; //ms

	namespace SnackbarModule {
		export function open(snackbar: SnackbarContext) {
			SnackbarModule.close(currentOpenSnackbar);

			if (enterTimeout) clearTimeout(enterTimeout);
			enterTimeout = window.setTimeout(async () => {
				currentOpenSnackbar = snackbar;
				currentOpenSnackbar.open();
			}, OPEN_DEBOUNCE);
		}

		export function close(snackbar: SnackbarContext) {
			if (snackbar?.isOpen) {
				currentOpenSnackbar.close();
				currentOpenSnackbar = null;
			}
		}
	}
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Snackbar
	import { MDCSnackbar } from "@material/snackbar";
	import { onMount, onDestroy, setContext } from "svelte";
	import { setIconButtonBehaviour } from "@smui/icon-button";
	import { createEventDispatcher } from "svelte";
	import { MDCSelectEvent, MDCSelectEventDetail } from "@material/select";
	import { UseState } from "@smui/common/hooks";

	export let stacked: boolean = false;
	export let leading: boolean = false;
	export let timeoutMs: number = 5000;
	export let closeOnEscape: boolean = true;
	export let action:
		| string
		| {
				type: "action";
				text: string;
		  }
		| {
				type: "dismiss";
		  } = undefined;
	export let text: string = "";
	export let open: boolean = false;

	const dispatch = createEventDispatcher<{
		closed: MDCSelectEventDetail;
	}>();

	let openState: UseState;

	const context: SnackbarContext = {
		open: _open,
		close: _close,
		isOpen: open,
	};

	$: Object.assign(context, { ...context, isOpen: open });

	setIconButtonBehaviour("snackbar");

	let snackbar: MDCSnackbar;
	onMount(() => {
		snackbar = new MDCSnackbar(dom);
		snackbar.listen("MDCSnackbar:closed", handleClosed);
	});

	$: if (snackbar) {
		if (snackbar.timeoutMs !== timeoutMs) {
			snackbar.timeoutMs = timeoutMs;
		}

		if (snackbar.closeOnEscape !== closeOnEscape) {
			snackbar.closeOnEscape = closeOnEscape;
		}

		if (snackbar.labelText !== text) {
			snackbar.labelText = text;
		}
	}

	onDestroy(() => {
		cleanModule();
		snackbar && snackbar.destroy();
	});

	function cleanModule() {
		if (currentOpenSnackbar === context) currentOpenSnackbar = null;
	}

	function handleClosed(e: MDCSelectEvent) {
		openState.setValue(false);
		cleanModule();
		dispatch("closed", e.detail);
	}

	function onOpenUpdated(oldValue: boolean) {
		if (snackbar.isOpen !== open) {
			if (open) {
				SnackbarModule.open(context);
			} else {
				SnackbarModule.close(context);
			}
		}
	}

	function _open() {
		snackbar.open();
		openState.setValue(true);
	}

	function _close() {
		snackbar.close();
		openState.setValue(false);
	}

	export function doOpen() {
		if (open) {
			_close();
		}

		SnackbarModule.open(context);
	}

	export function doClose() {
		SnackbarModule.close(context);
	}

	export function isOpen() {
		return open;
	}
</script>

<style>
	.smui-snackbar-origin {
		display: none;
	}
</style>

<svelte:options immutable={true} />

<UseState bind:this={openState} bind:value={open} onUpdate={onOpenUpdated} />

<div class="smui-snackbar-origin" />

<div
	bind:this={dom}
	{...props}
	{id}
	class="
    mdc-snackbar
    {className}
    {leading ? 'mdc-snackbar--leading' : ''}
    {stacked ? 'mdc-snackbar--stacked' : ''}
  "
	{style}
	use:forwardDOMEvents>
	<div class="mdc-snackbar__surface">
		<span
			class="mdc-snackbar__label"
			role="status"
			aria-live="polite">{text}</span>
		{#if action}
			<div class="mdc-snackbar__actions">
				{#if typeof action === 'object' && action.type === 'dismiss'}
					<button
						type="button"
						class="mdc-icon-button material-icons mdc-snackbar__dismiss"
						title="dismiss">
						close
					</button>
				{:else if typeof action !== 'object' || action.type === 'action'}
					<button type="button" class="mdc-button mdc-snackbar__action">
						<span class="mdc-button__ripple" />
						<span class="mdc-button__label">
							{typeof action === 'string' ? action : action.text}
						</span>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
