<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";
	export let id: string = "";

	export let dom: HTMLDivElement = null;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Slider
	import { MDCSlider } from "@material/slider";
	import { onMount, onDestroy, getContext } from "svelte";
	import { getDialogContext } from "@smui/dialog";
	import { getFormFieldContext } from "@smui/form-field";
	import { Use } from "@smui/common/hooks";

	export let disabled: boolean = false;
	export let discrete: boolean = false;
	export let displayMarkers: boolean = false;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 0.1;
	export let value: number = null;

	const formFieldContext$ = getFormFieldContext();
	const dialogContext$ = getDialogContext();

	let slider: MDCSlider;
	onMount(() => {
		slider = new MDCSlider(dom);
		slider.listen("MDCSlider:input", handleChange);
	});

	$: if (slider) {
		if (slider.disabled !== disabled) {
			slider.disabled = disabled;
		}

		if (slider.min !== min) {
			slider.min = min;
		}

		if (slider.max !== max) {
			slider.max = max;
		}

		if (slider.step !== step) {
			slider.step = step;
		}

		if (slider.value !== value) {
			slider.value = value;
		}

		// if ($dialogContext$?.isOpen) slider.layout();
	}

	onDestroy(() => {
		slider && slider.destroy();
	});

	function setFormFieldInput() {
		$formFieldContext$?.setInput(slider as any);
	}

	function handleChange() {
		value = slider.value;
	}

	export function layout() {
		return slider.layout();
	}

	export function stepUp(amount = 1) {
		return slider.stepUp(amount);
	}

	export function stepDown(amount = 1) {
		return slider.stepDown(amount);
	}

	$: props.tabindex = props.tabindex || 0;
</script>

<style>
	.mdc-slider {
		min-width: 200px;
	}
</style>

<Use effect once hook={setFormFieldInput} />

<div
	bind:this={dom}
	{...props}
	id={formFieldContext$ ? $formFieldContext$.inputId : id}
	class="mdc-slider {className}
    {discrete ? 'mdc-slider--discrete' : ''}
    {discrete && displayMarkers ? 'mdc-slider--display-markers' : ''}"
	{style}
	use:forwardDOMEvents
	role="slider"
	aria-disabled={disabled ? 'true' : 'false'}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	{...step === 0 ? {} : { 'data-step': step }}>
	<div class="mdc-slider__track-container">
		<div class="mdc-slider__track" />
		{#if discrete && displayMarkers}
			<div class="mdc-slider__track-marker-container" />
		{/if}
	</div>
	<div class="mdc-slider__thumb-container">
		{#if discrete}
			<div class="mdc-slider__pin">
				<span class="mdc-slider__pin-value-marker" />
			</div>
		{/if}
		<svg class="mdc-slider__thumb" width="21" height="21">
			<circle cx="10.5" cy="10.5" r="7.875" />
		</svg>
		<div class="mdc-slider__focus-ring" />
	</div>
</div>
