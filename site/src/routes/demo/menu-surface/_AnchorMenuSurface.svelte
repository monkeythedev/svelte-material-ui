<script lang="ts">
	import { Corner, MenuSurface } from "@smui/core/menu-surface";
	import { Button } from "@smui/core/button";
	import { InputField } from "@smui/core/textfield";

	let formSurface;
	let name = "";
	let email = "";
</script>

<div>
	Anchored automatically on parent element, corner set to bottom-left:

	<div style="min-width: 100px;">
		<div>
			<Button on:click={() => formSurface.setOpen(true)}>
				Open Menu Surface
			</Button>
			<MenuSurface bind:this={formSurface} anchorCorner={Corner.BOTTOM_LEFT}>
				<div
					style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;">
					<InputField bind:value={name}>
						<span slot="label">Name</span>
					</InputField>
					<InputField bind:value={email} type="email">
						<span slot="label">Email</span>
					</InputField>
					<Button
						style="margin-top: 1em;"
						on:click={() => formSurface.setOpen(false)}>
						Submit
					</Button>
				</div>
			</MenuSurface>
		</div>
		<div>The menu surface will anchor to its parent and will cover me :S</div>
		<!-- <div>
      So menu surface will be under me :)
    </div> -->
	</div>
</div>
