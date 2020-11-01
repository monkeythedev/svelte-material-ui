<script lang="ts">
	import { AspectRatio } from "@smui/core/card";
	import { ActionsLayout } from "./_CardConfigurator.svelte";

	export let showTitle: boolean = false;
	export let showSubtitle: boolean = false;
	export let showText: boolean = true;

	export let showBodyTitle: boolean = false;
	export let showBodySubtitle: boolean = false;
	export let showBodyText: boolean = false;
	export let media: AspectRatio = undefined;
	export let showMediaContent: boolean = false;
	export let horizontalLayout: boolean = false;
	export let clickableBody: boolean = false;

	export let actionsLayout: ActionsLayout = undefined;

	export let svelteContentCode: string = undefined;

	$: svelteContentCode = `
		${getContentCode("Head", showTitle, showSubtitle, showText)}
		${getBodyCode(
			showBodyTitle,
			showBodySubtitle,
			showBodyText,
			media,
			showMediaContent,
			clickableBody,
			horizontalLayout
		)}
		${getActionsCode(actionsLayout)}
	`;

	function getBodyCode(
		showBodyTitleValue: typeof showBodyTitle,
		showBodySubtitleValue: typeof showBodySubtitle,
		showBodyTextValue: typeof showBodyText,
		mediaValue: typeof media,
		showMediaContentValue: typeof showMediaContent,
		clickableBodyValue: typeof clickableBody,
		horizontalLayoutValue: typeof horizontalLayout
	) {
		if (
			!showBodyTitleValue &&
			!showBodySubtitleValue &&
			!showBodyTextValue &&
			!mediaValue &&
			!showMediaContentValue
		)
			return "";
		if (!clickableBodyValue) {
			if (horizontalLayout) {
				return `
				<div class="horizontal-layout">
					${getMediaCode(mediaValue, showMediaContentValue).replace(/\n/g, "\n	")}
					${getContentCode(
						"Body",
						showBodyTitleValue,
						showBodySubtitleValue,
						showBodyTextValue
					).replace(/\n/g, "\n	")}
				</div>`;
			} else {
				return `
					${getMediaCode(mediaValue, showMediaContentValue)}
					${getContentCode(
						"Body",
						showBodyTitleValue,
						showBodySubtitleValue,
						showBodyTextValue
					)}`;
			}
		} else {
			return `
				<PrimaryAction${horizontalLayoutValue ? ` class="horizontal-layout"` : ""}>
					${getMediaCode(mediaValue, showMediaContentValue).replace(/\n/g, "\n	")}
					${getContentCode(
						"Body",
						showBodyTitleValue,
						showBodySubtitleValue,
						showBodyTextValue
					).replace(/\n/g, "\n	")}
				</PrimaryAction>
			`;
		}
	}

	function getContentCode(
		tag: string,
		showTitle: boolean,
		showSubtitle: boolean,
		showText: boolean
	) {
		if (!showTitle && !showSubtitle && !showText) {
			return "";
		}

		return `
				<Content>
					${showTitle ? `<Typography variant="headline6">${tag} title</Typography>` : ""}
					${
						showSubtitle
							? `<Typography variant="subtitle2">${tag} subtitle</Typography>`
							: ""
					}
					${showText ? `${tag} text` : ""}
				</Content>`;
	}

	function getMediaCode(
		mediaValue: typeof media,
		showMediaContentValue: typeof showMediaContent
	) {
		if (!mediaValue) return "";
		return `
				<Media
					class="card-media-${media}"
					aspectRatio="${media}">
					${
						showMediaContentValue
							? `
					<MediaContent>
						<Typography
							variant="headline6"
							style="color: #fff; position: absolute; bottom: 1em; left: 1em; margin: 0;">
							Card media content
						</Typography>
					</MediaContent>
					`
							: ""
					}
				</Media>`;
	}

	function getActionsCode(actionsLayoutValue: typeof actionsLayout) {
		if (!actionsLayoutValue) return "";

		if (actionsLayoutValue === "full-bleed") {
			return `
				<Actions fullBleed>
					<Button>
						<Label>Action</Label>
						<Icon>arrow_forward</Icon>
					</Button>
				</Actions>
			`;
		}

		function getButtonCode(label: string) {
			return `
						<Button>
							<Label>${label}</Label>
						</Button>
			`;
		}

		function getActionButtonsCode() {
			if (
				actionsLayoutValue !== "single" &&
				actionsLayoutValue !== "multi" &&
				actionsLayoutValue !== "all"
			)
				return "";

			return `
					<ActionButtons>
						${getButtonCode("Action")}
						${
							actionsLayoutValue === "multi" || actionsLayoutValue === "all"
								? getButtonCode("Another")
								: ""
						}
					</ActionButtons>
			`;
		}

		function getActionIconsCode() {
			if (actionsLayout !== "icons" && actionsLayout !== "all") return "";

			return `
					<ActionIcons>
						<IconButtonToggle title="Add to favorites">
							<Icon on>favorite</Icon>
							<Icon>favorite_border</Icon>
						</IconButtonToggle>
						<IconButton title="Share">
							<Icon>share</Icon>
						</IconButton>
						<IconButton title="More options">
							<Icon>more_vert</Icon>
						</IconButton>
					</ActionIcons>
			`;
		}

		return `
				<Actions>
					${getActionButtonsCode()}
					${getActionIconsCode()}
				</Actions>`;
	}
</script>
