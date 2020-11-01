<script lang="ts">
	import { Use } from "../hooks";

	let dom: HTMLDivElement;

	function init() {
		const isSlot = dom.parentElement.getAttribute("slot");
		let target = isSlot ? dom.parentElement : dom;
		if (
			target.parentElement.classList.contains("extract-named-slot-fragment")
		) {
			target = target.parentElement;
		}
		while (dom.firstChild) {
			target.parentElement.insertBefore(dom.firstChild, target);
		}
	}
</script>

<style>
	.fragment {
		display: none;
	}
</style>

<Use effect once hook={init} />

<div class="fragment" bind:this={dom}>
	<slot />
</div>
