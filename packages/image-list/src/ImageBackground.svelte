<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";
	export let id: string = null;

	export let dom: HTMLDivElement = null;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// ImageBackground
	export let src: string;
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class="mdc-image-list__image {className}"
	style="background-image: url({src}) {style}"
	use:forwardDOMEvents>
	<slot />
</div>
