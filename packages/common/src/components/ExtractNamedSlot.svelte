<script lang="ts">
	import { Use } from "../hooks";

	let dom: HTMLDivElement;

	function init() {
		const childSlot = dom.firstChild;
		const target = dom.parentElement;
		if (childSlot && target) {
			while (childSlot.firstChild) {
				target.insertBefore(childSlot.firstChild, dom);
			}
		}
	}
</script>

<style>
	.extract-named-slot-fragment {
		display: none;
	}
</style>

<Use effect once hook={init} />

<div class="extract-named-slot-fragment" bind:this={dom}>
	<slot />
</div>
