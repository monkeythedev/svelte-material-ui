<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// LinearProgress
	import { MDCLinearProgress } from "@material/linear-progress";
	import { onMount, onDestroy } from "svelte";
	import { UseDebounce } from "@smui/common/src/hooks";
	import { getCreateMDCLinearProgressInstance } from "./LinearProgressContext";

	export let indeterminate: boolean = false;
	export let reversed: boolean = false;
	export let closed: boolean = false;
	export let progress: number = 0;
	export let buffer: number = 1;
	export let ariaLabel: string = undefined;

	let debouncedProgress: number = progress;

	let createMDCLinearProgressInstance = getCreateMDCLinearProgressInstance();

	$: if (progress < 0) progress = 0;
	$: if (progress > 1) progress = 1;

	let linearProgress: MDCLinearProgress;
	onMount(() => {
		if (createMDCLinearProgressInstance !== false) {
			linearProgress = new MDCLinearProgress(dom);
		}
	});

	$: if (linearProgress) {
		if (linearProgress.determinate !== !indeterminate) {
			linearProgress.determinate = !indeterminate;
		}

		if (linearProgress.progress !== debouncedProgress) {
			linearProgress.progress = debouncedProgress;
		}

		if (linearProgress.reverse !== reversed) {
			linearProgress.reverse = reversed;
		}

		if (linearProgress.buffer !== buffer) {
			linearProgress.buffer = buffer;
		}
	}

	$: if (linearProgress) {
		if (closed) {
			linearProgress.close();
		} else {
			linearProgress.open();
		}
	}

	onDestroy(() => {
		linearProgress && linearProgress.destroy();
	});
</script>

<UseDebounce
	value={progress}
	bind:debounced={debouncedProgress}
	interval={500} />

<div
	bind:this={dom}
	{id}
	class="
    mdc-linear-progress
    {className}
    {indeterminate ? 'mdc-linear-progress--indeterminate' : ''}
    {reversed ? 'mdc-linear-progress--reversed' : ''}
    {closed ? 'mdc-linear-progress--closed' : ''}
  "
	{style}
	role="progressbar"
	aria-label={ariaLabel}
	aria-valuemin="0"
	aria-valuemax="1"
	use:forwardDOMEvents>
	<div class="mdc-linear-progress__buffer">
		<div class="mdc-linear-progress__buffer-bar" />
		<div class="mdc-linear-progress__buffer-dots" />
	</div>
	<div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
		<span class="mdc-linear-progress__bar-inner" />
	</div>
	<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
		<span class="mdc-linear-progress__bar-inner" />
	</div>
</div>
