<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = null;
	export let id: string = `SMUI-TextField-${count++}`;

	export let dom: HTMLLabelElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// TextField
	import { createInputFieldContext } from "./TextFieldContext";
	import { LineRipple } from "@smui/line-ripple";
	import UseTextField from "./hooks/UseTextField.svelte";
	import { onMount } from "svelte";
	import { RippleProps, Ripple3 } from "@smui/ripple";
	import { ExtractNamedSlot } from "@smui/common/components";

	//#region UseTextField params
	export let ripple: boolean = true;
	export let value: any = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let color: RippleProps["color"] = undefined;

	let nativeInputInvalid: boolean = false;
	export let customValidation: (
		value: any,
		nativeInputInvalid: boolean
	) => boolean = undefined;

	let textFieldClassList: string = "";
	//#endregion

	export let name: string = undefined;

	export let prefix: string = undefined;
	export let suffix: string = undefined;

	export let type: "text" | "search" = "text";

	export let dirty: boolean = false;

	export let autocomplete: string = undefined;
	export let placeholder: string = undefined;
	export let required: boolean = undefined;
	export let pattern: string = undefined;
	export let readonly: boolean = undefined;

	export let maxlength: number = undefined;

	//#region internal props
	let helperTextId: string;
	let inputElement: HTMLInputElement;
	//#endregion

	createInputFieldContext({
		setHelperTextId(id: string) {
			helperTextId = id;
		},
	});

	onMount(() => {
		updateNativeInputInvalid();
	});

	function changeHandler(e) {
		dirty = true;
		updateNativeInputInvalid();
	}

	function updateNativeInputInvalid() {
		nativeInputInvalid = inputElement.matches(":invalid");
	}
</script>

<div class="smui-text-field__wrapper smui-text-field__wrapper--fullwidth">
	<label
		bind:this={dom}
		for={id}
		class="{textFieldClassList}
    {className}
      {$$slots.leadingIcon ? 'mdc-text-field--with-leading-icon' : ''}
      {$$slots.trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}"
		{style}>
		{#if ripple}
			<Ripple3
				target={dom}
				unbounded={false}
				{color}
				rippleElement="mdc-text-field__ripple" />
		{/if}
		{#if $$slots.leadingIcon}
			<ExtractNamedSlot>
				<slot name="leadingIcon" class="mdc-text-field__icon--leading" />
			</ExtractNamedSlot>
		{/if}
		{#if prefix}
			<span
				class="mdc-text-field__affix mdc-text-field__affix--prefix">{prefix}</span>
		{/if}
		<input
			bind:this={inputElement}
			{...props}
			{id}
			class="mdc-text-field__input"
			{type}
			{name}
			{maxlength}
			{autocomplete}
			{pattern}
			{required}
			{readonly}
			on:input={(e) => (value = e.target.value)}
			on:change={changeHandler}
			aria-controls={helperTextId}
			aria-describedby={helperTextId}
			aria-label={placeholder}
			{placeholder}
			use:forwardDOMEvents />
		{#if suffix}
			<span
				class="mdc-text-field__affix mdc-text-field__affix--suffix">{suffix}</span>
		{/if}
		{#if $$slots.trailingIcon}
			<ExtractNamedSlot>
				<slot name="trailingIcon" class="mdc-text-field__icon--trailing" />
			</ExtractNamedSlot>
		{/if}

		{#if ripple}
			<LineRipple />
		{/if}
	</label>
	<ExtractNamedSlot>
		<slot name="helperText" />
	</ExtractNamedSlot>
</div>

<UseTextField
	bind:value
	bind:invalid
	{ripple}
	{disabled}
	label={false}
	fullWidth
	{nativeInputInvalid}
	{customValidation}
	variant="filled"
	bind:classList={textFieldClassList}
	{dom} />
