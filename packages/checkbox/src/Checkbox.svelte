<script context="module" lang="ts">
	let count: number = 0;

	export interface SMUICheckboxChangeEvent {
		checked: boolean;
		dom: HTMLInputElement;
	}
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/checkbox/Checkbox:${count++}`;

	export let dom: HTMLInputElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Checkbox
	//#region  imports
	import { MDCCheckbox } from "@material/checkbox";
	import { onMount, onDestroy } from "svelte";
	import {
		CheckboxContext,
		getCheckboxBehaviour,
		getDisableCheckboxMDCIstance,
	} from "./CheckboxContext";
	import { getFormFieldContext } from "@smui/form-field/src/FormFieldContext";
	import { Selectable } from "@smui/common/src/hoc";
	import { createEventDispatcher } from "svelte";
	//#endregion

	//#region exports
	export let disabled: boolean = false;
	export let checked: boolean = false;
	export let value: any = undefined;
	export let allowIndeterminated: boolean = false;

	export let required: boolean = false;

	export let input$class: string = "";
	export let input$props: BaseProps = {};
	//#endregion

	const dispatch = createEventDispatcher<{
		change: SMUICheckboxChangeEvent;
	}>();
	const behaviour = getCheckboxBehaviour();

	//#region Init contexts
	//const itemContext$ = getItemContext();
	const formFieldContext$ = getFormFieldContext();
	const disableMDC = getDisableCheckboxMDCIstance();

	const context = {} as CheckboxContext;
	$: Object.assign(context, {
		value,
	});
	//#endregion

	// let addChangeHandler = getContext("SMUI:generic:input:addChangeHandler");
	// let context = getContext("SMUI:checkbox:context");
	// let getDataTableRowIndex = getContext("SMUI:data-table:row:getIndex");
	// let instantiate = getContext("SMUI:checkbox:instantiate");
	// let getInstance = getContext("SMUI:checkbox:getInstance");

	//#region MDC init/destroy
	let checkbox: MDCCheckbox;
	onMount(async () => {
		if (!disableMDC) checkbox = new MDCCheckbox(dom);
	});

	$: if (checkbox) {
		if (!checkbox.indeterminate && checked === null) {
			checkbox.indeterminate = true;
		} else if (checkbox.indeterminate && checked !== null) {
			checkbox.indeterminate = false;
		}

		if (checkbox.checked !== checked) {
			checkbox.checked = checked;
		}

		if (checkbox.disabled !== disabled) {
			checkbox.disabled = disabled;
		}

		if (checkbox.value !== value) {
			checkbox.value = value;
		}
	}

	$: if (checkbox && $formFieldContext$?.instance) {
		$formFieldContext$.instance.input = checkbox;
	}

	onDestroy(() => {
		checkbox && checkbox.destroy();
	});
	//#endregion

	function setChecked(newValue: boolean) {
		if (checked !== newValue) {
			checked = newValue;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			setChecked(!checked);
		}
	}

	function handleChange() {
		if (checkbox) {
			if (allowIndeterminated && checked === false && checkbox.checked) {
				checkbox.checked = false;
				setChecked(null);
			} else {
				setChecked(checkbox.checked);
			}
		}

		dispatch("change", {
			checked,
			dom,
		});
	}
</script>

<Selectable bind:value bind:selected={checked}>
	<div
		bind:this={dom}
		{...props}
		{id}
		class="mdc-checkbox {className}
      {disabled ? 'mdc-checkbox--disabled' : ''}
      {behaviour === 'data-table-header' ? 'mdc-data-table__header-row-checkbox' : ''}
      {behaviour === 'data-table-row' ? 'mdc-data-table__row-checkbox' : ''}"
		{style}>
		<input
			{...input$props}
			class="mdc-checkbox__native-control {input$class}"
			id={formFieldContext$ && $formFieldContext$.inputId}
			type="checkbox"
			{disabled}
			{checked}
			{value}
			{required}
			on:change={handleChange}
			on:keyup={handleKeyPress} />
		<div class="mdc-checkbox__background">
			<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
				<path
					class="mdc-checkbox__checkmark-path"
					fill="none"
					d="M1.73,12.91 8.1,19.28 22.79,4.59" />
			</svg>
			<div class="mdc-checkbox__mixedmark" />
		</div>
		<div class="mdc-checkbox__ripple" />
	</div>
</Selectable>
<!-- <div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="mdc-checkbox {className}
    {disabled ? 'mdc-checkbox--disabled' : ''}
    {context === 'data-table' && dataTableHeader ? 'mdc-data-table__header-row-checkbox' : ''}
    {context === 'data-table' && !dataTableHeader ? 'mdc-data-table__row-checkbox' : ''}"
  {...exclude($$props, [
    'use',
    'class',
    'disabled',
    'indeterminate',
    'group',
    'checked',
    'value',
    'valueKey',
    'input$',
  ])}>
  <input
    use:useActions={input$use}
    class="mdc-checkbox__native-control {input$class}"
    type="checkbox"
    {...inputProps}
    {disabled}
    bind:checked={nativeChecked}
    value={valueKey === uninitializedValue ? value : valueKey}
    on:change={handleChange}
    on:input={handleChange}
    on:change
    on:input
    {...exclude(prefixFilter($$props, 'input$'), ['use', 'class'])} />
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
      <path
        class="mdc-checkbox__checkmark-path"
        fill="none"
        d="M1.73,12.91 8.1,19.28 22.79,4.59" />
    </svg>
    <div class="mdc-checkbox__mixedmark" />
  </div>
</div> -->
