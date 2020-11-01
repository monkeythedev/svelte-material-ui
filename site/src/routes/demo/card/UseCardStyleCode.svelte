<script lang="ts">
	import { AspectRatio } from "@smui/core/card";

	export let media: AspectRatio = undefined;
	export let horizontalLayout: boolean = false;

	export let styleCode: string = undefined;

	$: {
		styleCode = getCardMediaStyleCode(media);
		if (styleCode)
			styleCode += getHorizontalLayoutStyleCode(media, horizontalLayout);
	}

	function getCardMediaStyleClassCode(mediaValue: typeof media) {
		if (mediaValue === "16x9") {
			return "card-media-16x9";
		} else if (mediaValue === "square") {
			return "card-media-square";
		}
	}

	function getCardMediaStyleCode(mediaValue: typeof media) {
		if (mediaValue === "16x9") {
			return `
				.card-media-16x9 {
					background-image: url(https://via.placeholder.com/320x180.png?text=16x9);
				}`;
		} else if (mediaValue === "square") {
			return `
				.card-media-square {
					background-image: url(https://via.placeholder.com/320x320.png?text=square);
				}`;
		} else {
			return "";
		}
	}

	function getHorizontalLayoutStyleCode(
		mediaValue: typeof media,
		horizontalLayoutValue: typeof horizontalLayout
	) {
		if (horizontalLayoutValue) {
			return `
				.horizontal-layout {
					display: flex;
					flex-direction: row;

					.${getCardMediaStyleClassCode(mediaValue)} {
						width: 250px;
					}
				}
			`;
		} else {
			return "";
		}
	}
</script>
