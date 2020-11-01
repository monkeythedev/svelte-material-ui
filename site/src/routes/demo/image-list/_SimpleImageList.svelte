<script lang="ts">
	import {
		ImageList,
		Item,
		ImageAspectContainer,
		Image,
		Supporting,
		Label,
	} from "@smui/core/image-list";
	import "./image-list.scss";
</script>

<div>
	<ImageList class="simple-image-list">
		{#each Array(15) as _, i}
			<Item>
				<ImageAspectContainer>
					<Image
						src="https://via.placeholder.com/190x190.png?text=square"
						alt="Image {i + 1}" />
				</ImageAspectContainer>
				<Supporting>
					<Label>Image {i + 1}</Label>
				</Supporting>
			</Item>
		{/each}
	</ImageList>
</div>
