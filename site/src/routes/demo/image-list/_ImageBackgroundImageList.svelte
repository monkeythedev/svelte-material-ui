<script lang="ts">
	import {
		ImageList,
		Item,
		ImageAspectContainer,
		ImageBackground,
		Supporting,
		Label,
	} from "@smui/core/image-list";
	import "./image-list.scss";
	import { getUnevenImageSize } from "./getUnevenImageSize";
</script>

<div>
	Using a
	<code>div</code>
	instead of an
	<code>img</code>
	to enforce aspect ratio:

	<ImageList class="image-background-image-list">
		{#each Array(15) as _, i}
			<Item>
				<ImageAspectContainer>
					<ImageBackground
						src="https://via.placeholder.com/190x{getUnevenImageSize(i, 190, 10)}.png?text=190x{getUnevenImageSize(i, 190, 10)}" />
				</ImageAspectContainer>
				<Supporting>
					<Label>Image {i + 1}</Label>
				</Supporting>
			</Item>
		{/each}
	</ImageList>
</div>
