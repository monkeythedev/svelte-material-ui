<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = null;
	export let id: string = null;

	export let dom: HTMLLabelElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Icon
	import { onMount, onDestroy } from "svelte";
	import { getInputFieldContext } from "@smui/textfield";
	import { MDCSelectIcon } from "@material/select/icon";

	export let role: "button" = undefined;
	export let tabindex: number = role === "button" ? 0 : -1;
	export let ariaLabel: string = undefined;

	const inputFieldContext$ = getInputFieldContext();

	let icon: MDCSelectIcon;
	onMount(() => {
		if (!inputFieldContext$) icon = new MDCSelectIcon(dom);
	});

	onDestroy(() => {
		icon && icon.destroy();
	});
</script>

<i
	bind:this={dom}
	{id}
	{...props}
	class="mdc-select__icon {className}"
	{style}
	{tabindex}
	{role}
	aria-hidden={tabindex === -1 ? 'true' : 'false'}
	aria-label={ariaLabel}
	use:forwardDOMEvents><slot /></i>
