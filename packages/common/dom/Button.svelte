<script lang="ts" context="module">
	import { BaseProps } from "./Props";

	export interface ButtonProps extends BaseProps {
		disabled?: boolean;
	}
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../src/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLButtonElement = undefined;

	export let props: ButtonProps = {};
	//#endregion

	// Button
</script>

<button
	bind:this={dom}
	{...props}
	{id}
	class={className}
	{style}
	use:forwardDOMEvents>
	<slot />
</button>
