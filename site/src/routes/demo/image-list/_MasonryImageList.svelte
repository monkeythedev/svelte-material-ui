<script lang="ts">
	import {
		ImageList,
		Item,
		Image,
		Supporting,
		Label,
	} from "@smui/core/image-list";
	import "./image-list.scss";
	import { getUnevenImageSize } from "./getUnevenImageSize";
</script>

<div>
	Masonry, with rounded shapes:

	<ImageList class="masonry-image-list" masonry>
		{#each Array(15) as _, i}
			<Item>
				<Image
					src="https://via.placeholder.com/190x{getUnevenImageSize(i, 107, 200, Math.abs)}.png?text=190x{getUnevenImageSize(i, 107, 200, Math.abs)}"
					alt="Image {i + 1}" />
				<Supporting>
					<Label>Image {i + 1}</Label>
				</Supporting>
			</Item>
		{/each}
	</ImageList>
</div>
