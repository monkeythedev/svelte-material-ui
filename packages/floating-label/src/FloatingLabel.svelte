<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = `smui-FloatingLabel-${count++}`;

	export let dom: HTMLLabelElement | HTMLSpanElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// FloatingLabel
	import { MDCFloatingLabel } from "@material/floating-label";
	import { onMount, onDestroy, getContext } from "svelte";
	import { getFormFieldContext } from "@smui/form-field";
	import { Span, Label } from "@smui/common/dom";
	import { getInputFieldContext } from "../../../packages/textfield"; // TODO: fix circular dep

	export let component: typeof Span | typeof Label = Label;

	const formFieldContext$ = getFormFieldContext(); //TODO: serve???
	const inputFieldContext$ = getInputFieldContext();

	$: $inputFieldContext$?.setLabelId(id);

	let floatingLabel: MDCFloatingLabel;
	onMount(() => {
		if (!inputFieldContext$) floatingLabel = new MDCFloatingLabel(dom);
	});

	onDestroy(() => {
		floatingLabel && floatingLabel.destroy();
	});

	// export function shake(shouldShake, ...args) {
	//   return floatingLabel.shake(shouldShake, ...args);
	// }

	// export function float(shouldFloat, ...args) {
	//   return floatingLabel.float(shouldFloat, ...args);
	// }

	// export function getWidth(...args) {
	//   return floatingLabel.getWidth(...args);
	// }

	$: props = { ...props, for: $formFieldContext$?.inputId };
</script>

<svelte:component
	this={component}
	bind:dom
	{...props}
	{id}
	class="mdc-floating-label {className}"
	{style}
	on:domEvent={forwardDOMEvents}>
	<slot />
</svelte:component>
