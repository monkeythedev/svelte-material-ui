<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	import { ItemRole, ListItemDOMElement } from "../types";
	export let dom: ListItemDOMElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { Ripple3 } from "@smui/ripple";
	import { Li, A, Span } from "@smui/common/dom";
	import { getListContext } from "../";
	import { createItemContext, ItemContext, getIsSelectionGroup } from "./";
	import { getMenuSurfaceContext } from "@smui/menu-surface/src/MenuSurfaceContext";
	import { Selectable, OnSelectableChange } from "@smui/common/hoc";
	import { MDCDialogCloseEvent } from "@material/dialog";
	//#endregion

	export let ripple: boolean = true;
	export let color = undefined;
	export let activated: boolean = false;
	export let role: ItemRole = undefined; //TODO: forse si può togliere dagli export
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let href: string = undefined;
	export let value: any = undefined;

	const dispatch = createEventDispatcher<{
		opened: undefined;
		closed: MDCDialogCloseEvent;
		selected: ListItemDOMElement;
	}>();

	let rippleClasses: string = "";
	let selectable: Selectable;

	const listContext$ = getListContext();
	const menuSurfaceContext$ = getMenuSurfaceContext();
	const context$ = createItemContext({
		sendOnSelected() {
			dispatch("selected", dom);
		},
	});

	$: if ($listContext$.role === "radiogroup") {
		role = "radio";
	} else if ($listContext$.role === "menu" || menuSurfaceContext$) {
		role = "menuitem";
	} else if ($listContext$.role === "listbox") {
		role = "option";
	} else if ($listContext$.role === "group") {
		role = "checkbox";
	}

	$: if (disabled && selected) selected = false;

	const context = {} as ItemContext;
	$: $context$ = Object.assign({}, context, {
		...$context$,
		disabled,
		selected,
		tabindex,
		dom,
		value,
	});

	function handleChange(event: CustomEvent<OnSelectableChange>) {
		if (event.detail.selected) {
			dispatch("selected", dom);
		}
	}

	function onFocus() {
		selectable.notifyFocus();
	}

	onMount(() => {
		$listContext$.registerItem(context);

		$context$ = Object.assign({}, context, {
			...$context$,
			setSelected: selectable?.setSelected,
			setValue: selectable?.setValue,
		});
	});

	onDestroy(() => {
		$listContext$.unregisterItem(context);
	});

	$: props = {
		...props,
		tabindex,
		href,
		"aria-current": activated ? "page" : null,
		"data-value": value,
		//"aria-selected": $listContext$.role === "listbox" ? selected : null, Lo setta MDC
		// "aria-checked":
		//   $listContext$.role === "group" || $listContext$.role === "radiogroup"
		//     ? `${selected}`
		//     : null,
		role,
	};
</script>

<Selectable
	bind:this={selectable}
	bind:value
	bind:selected
	on:change={handleChange}
	bind:tabindex>
	<svelte:component
		this={$listContext$.isNav && href ? A : Li}
		bind:dom
		props={{ ...props }}
		{id}
		class="mdc-list-item {className}
      {disabled ? 'mdc-list-item--disabled' : ''}
      {(role === 'option' || role === 'menuitem') && selected ? 'mdc-list-item--selected' : ''}
      {role === 'menuitem' && selected ? 'mdc-menu-item--selected' : ''}
      {rippleClasses}"
		{style}
		on:domEvent={forwardDOMEvents}
		on:focus={onFocus}>
		{#if ripple}
			<Ripple3
				rippleElement="mdc-list-item__ripple"
				{color}
				target={dom}
				keyboardEvents
				bind:rippleClasses />
		{/if}
		<slot />
	</svelte:component>
</Selectable>

<!-- 
{#if nav && href}
  <a
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-item {className}
    {activated ? 'mdc-list-item--activated' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {disabled ? 'mdc-list-item--disabled' : ''}
    "
    use:Ripple={{ ripple, unbounded: false, color }}
    {href}
    {...activated ? { 'aria-current': 'page' } : {}}
    {tabindex}
    on:click={action}
    on:keydown={handleKeydown}
    {...props}>
    <slot />
  </a>
{:else if nav && !href}
  <span
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-item {className}
    {activated ? 'mdc-list-item--activated' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {disabled ? 'mdc-list-item--disabled' : ''}
    "
    use:Ripple={{ ripple, unbounded: false, color }}
    {...activated ? { 'aria-current': 'page' } : {}}
    {tabindex}
    on:click={action}
    on:keydown={handleKeydown}
    {...props}>
    <slot />
  </span>
{:else}
  <li
    bind:this={element}
    use:useActions={use}
    use:forwardEvents
    class=" mdc-list-item {className}
    {activated ? 'mdc-list-item--activated' : ''}
    {selected ? 'mdc-list-item--selected' : ''}
    {disabled ? 'mdc-list-item--disabled' : ''}
    {role === 'menuitem' && selected ? 'mdc-menu-item--selected' : ''}
    "
    use:Ripple={{ ripple, unbounded: false, color }}
    {role}
    {...role === 'option' ? { 'aria-selected': selected ? 'true' : 'false' } : {}}
    {...role === 'radio' || role === 'checkbox' ? { 'aria-checked': checked ? 'true' : 'false' } : {}}
    {tabindex}
    on:click={action}
    on:keydown={handleKeydown}
    {...props}>
    <slot />
  </li>
{/if} -->
