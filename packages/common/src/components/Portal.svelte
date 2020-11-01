<script lang="ts">
	// import { onDestroy } from "svelte";
	import { Use } from "../hooks";

	export let target: HTMLElement;

	// let dom: HTMLDivElement;

	// onDestroy(() => {
	//   target?.removeChild(dom);
	// });

	// function init() {
	//   target?.appendChild(dom);
	// }

	let dom: HTMLDivElement;

	function init() {
		while (dom.firstChild) {
			target.appendChild(dom.firstChild);
		}
	}
</script>

<style>
	.portal {
		display: none;
	}

	/* .portal-wrapper {
    display: contents;
  } */
</style>

<Use once effect hook={init} when={!!target} />

<!-- {#if target}
  <div class="portal">
    <div class="portal-wrapper" bind:this={dom}>
      <slot />
    </div>
  </div>
{/if} -->

<div class="portal" bind:this={dom}>
	<slot />
</div>
