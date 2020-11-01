<script lang="ts">
	import { UseRipple, Ripple3 } from "@smui/core/ripple";

	let rippleTarget: HTMLSpanElement;
</script>

<style>
	p {
		padding: 10px;
		border-radius: 5px;
	}

	.unbounded {
		display: inline-flex;
		width: 50px;
		height: 50px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 20px;
	}
</style>

<svelte:head>
	<title>Ripple - SMUI</title>
</svelte:head>

<section>
	<h2>Ripple</h2>

	<p tabindex="0">
		<Ripple3 color="surface" />
		SMUI ripples can be added to arbitrary elements, like this
		<code>p</code>
		element. Try clicking it to see the ripple.
	</p>

	<p>
		Unbounded with hook:
		<span bind:this={rippleTarget} tabindex="0" class="unbounded">
			&copy;
		</span>
		<UseRipple target={rippleTarget} color="surface" />
	</p>

	<p tabindex="0">
		<Ripple3 color="primary" />
		Primary color.
	</p>

	<p tabindex="0">
		<Ripple3 color="secondary" />
		Secondary color.
	</p>
</section>
