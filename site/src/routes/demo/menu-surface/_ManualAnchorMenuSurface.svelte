<script lang="ts">
	import { MenuSurface, Corner } from "@smui/core/menu-surface";
	import {
		ImageList,
		Item as ImageListItem,
		ImageAspectContainer,
		Image,
	} from "@smui/core/image-list";
	import { Button } from "@smui/core/button";

	let imageListSurface: MenuSurface;
	let anchor: HTMLButtonElement;
</script>

<div>
	Anchored manually:

	<div>
		<Button bind:dom={anchor} on:click={() => imageListSurface.setOpen(true)}>
			Open Menu Surface
		</Button>
		<MenuSurface
			bind:this={imageListSurface}
			anchorElement={anchor}
			anchorCorner={Corner.BOTTOM_LEFT}>
			<ImageList class="menu-surface-image-list">
				{#each Array(4) as _unused, i}
					<ImageListItem>
						<ImageAspectContainer>
							<Image
								src="https://via.placeholder.com/100x100.png?text=Image%20{i + 1}"
								alt="Image {i + 1}" />
						</ImageAspectContainer>
					</ImageListItem>
				{/each}
			</ImageList>
		</MenuSurface>
		<div>To force menu surface to open above me :S</div>
	</div>
</div>
