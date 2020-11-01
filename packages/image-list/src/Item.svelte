<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = null;
	export let id: string = null;

	export let dom: HTMLLIElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
</script>

<li
	bind:this={dom}
	{...props}
	{id}
	class="mdc-image-list__item {className}"
	{style}
	use:forwardDOMEvents>
	<slot />
</li>
