<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = `SMUI-Select-HelperText-${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// HelperText
	import { MDCSelectHelperText } from "@material/select/helper-text";
	import { onMount, onDestroy } from "svelte";
	import { getInputFieldContext } from "@smui/textfield";

	export let validationMsg: boolean = false;

	const inputFieldContext$ = getInputFieldContext();
	$: $inputFieldContext$?.setHelperTextId(id);

	let helperText: MDCSelectHelperText;
	onMount(() => {
		helperText = new MDCSelectHelperText(dom);
	});

	onDestroy(() => {
		helperText && helperText.destroy();
	});
</script>

<p
	bind:this={dom}
	{...props}
	class="
    mdc-select-helper-text
    {className}
    {validationMsg ? 'mdc-select-helper-text--validation-msg' : 'mdc-select-helper-text--validation-msg-persistent'}
  "
	{style}
	aria-hidden="true"
	use:forwardDOMEvents>
	<slot />
</p>
