<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	import { Writable } from "svelte/store";
	import { Use, UseState } from "../../hooks";
	import {
		getSelectableContext,
		SelectableContext,
		setSelectableContext,
	} from "./SelectableContext";
	import {
		getSelectableGroupContext,
		SelectableGroupContext,
	} from "../selectable-group";
	import { onMount, onDestroy, tick } from "svelte";
	import UseSelectable from "./UseSelectable.svelte";

	export let selected: boolean = undefined;
	export let disabled: boolean = undefined;
	export let value: any = undefined;
	export let tabindex: number = undefined;
	export let contextOverride$: Writable<SelectableContext> = undefined;
	export let selectableGroupContext$: Writable<SelectableGroupContext> = undefined;
	export const id: string = `@smui/common/hoc/Selectable:${count++}`;

	let selectable: UseSelectable;

	selectableGroupContext$ = getSelectableGroupContext();

	const parentContext$ = getSelectableContext();
	if (parentContext$ && contextOverride$ === undefined) {
		contextOverride$ = parentContext$;
	}

	const context = {} as SelectableContext;
	let context$: Writable<SelectableContext>;

	//#region context init
	if (contextOverride$) {
		context$ = setSelectableContext({
			setSelected(selected: boolean) {
				$contextOverride$.setSelected(selected);
			},
			setValue(newValue: typeof value) {
				$contextOverride$.setValue(newValue);
			},
			setTabIndex(tabindex: number) {
				$contextOverride$.setTabIndex(tabindex);
			},
			selected: $contextOverride$?.selected,
			value: $contextOverride$?.value,
			tabindex: $contextOverride$?.tabindex,
			disabled: $contextOverride$?.disabled,
		});
	} else {
		context$ = setSelectableContext({
			setSelected(selected: boolean) {
				selectable.setSelected(selected);
			},
			setValue(newValue: typeof value) {
				selectable.setValue(newValue);
			},
			setTabIndex(tabindex: number) {
				selectable.setTabIndex(tabindex);
			},
			selected,
			value,
			tabindex,
			disabled,
		});
	}
	//#endregion

	//#region context sync
	Object.assign(context, $context$);

	$: if (contextOverride$) {
		$context$ = {
			...Object.assign(context, {
				...$context$,
				selected: $contextOverride$.selected,
				value: $contextOverride$.value,
				tabindex: $contextOverride$.tabindex,
				disabled: $contextOverride$.disabled,
			}),
		};
	} else {
		$context$ = {
			...Object.assign(context, {
				...$context$,
				selected,
				value,
				tabindex,
				disabled,
			}),
		};
	}

	onMount(() => {
		if (contextOverride$) {
			onContextOverrideUpdate($contextOverride$);
		} else {
			$selectableGroupContext$?.registerItem(context);
		}
	});

	onDestroy(() => {
		//tick().then(() => { Causes problem with each blocks
		$selectableGroupContext$?.unregisterItem(context);
		//});
	});
	//#endregion

	//#region values update
	function onSelfUpdated() {
		$contextOverride$?.setSelected(selected);
		$contextOverride$?.setValue(value);
	}

	function onContextOverrideUpdate(contextOverride: SelectableContext) {
		if (contextOverride) {
			if (contextOverride.selected !== selected) {
				selected = contextOverride.selected;
			}

			if (contextOverride.value !== value) {
				value = contextOverride.value;
			}

			if (contextOverride.disabled !== disabled) {
				disabled = contextOverride.disabled;
			}

			if (contextOverride.tabindex !== tabindex) {
				tabindex = contextOverride.tabindex;
			}
		}
	}
	//#endregion

	//#region connector
	function notifySelected() {
		$selectableGroupContext$?.notifySelected(context);
	}

	function notifyUnselected() {
		$selectableGroupContext$?.notifyUnselected(context);
	}

	export function notifyFocus() {
		$selectableGroupContext$?.notifyFocus($context$);
	}

	export function setSelected(_selected: boolean) {
		$context$.setSelected(_selected);
	}

	export function setValue(_value: any) {
		$context$.setValue(_value);
		//@ts-ignore
		context.value = newValue;
	}
	//#endregion
</script>

<svelte:options immutable={true} />

{#if contextOverride$}
	<UseState value={[selected, value]} onUpdate={onSelfUpdated} />
	<Use effect hook={() => onContextOverrideUpdate($contextOverride$)} />
{:else}
	<UseSelectable
		bind:this={selectable}
		bind:selected
		bind:disabled
		bind:value
		bind:tabindex
		on:notifySelected={notifySelected}
		on:notifyUnselected={notifyUnselected}
		on:change />
{/if}

<slot />
