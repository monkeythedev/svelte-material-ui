<script context="module" lang="ts">
	export type ActionsLayout =
		| "single"
		| "multi"
		| "icons"
		| "all"
		| "full-bleed";
</script>

<script lang="ts">
	import classes from "./index.module.scss";
	import { Checkbox } from "@smui/core/checkbox";
	import { FormField } from "@smui/core/form-field";
	import {
		Configurator,
		generateSvelteCode,
	} from "src/components/configurator";
	import { Option, Select } from "@smui/core/select";
	import {
		Card,
		PrimaryAction,
		Actions,
		ActionButtons,
		ActionIcons,
		AspectRatio,
	} from "@smui/core/card";
	import { Button, Label } from "@smui/core/button";
	import { IconButton, IconButtonToggle, Icon } from "@smui/core/icon-button";
	import CardConfiguratorBody from "./_CardConfiguratorBody.svelte";
	import { Typography } from "@smui/core/typography";
	import CardConfiguratorContent from "./_CardConfiguratorContent.svelte";
	import UseCardCode from "./UseCardCode.svelte";
	import UseCardStyleCode from "./UseCardStyleCode.svelte";
	import { StringListToFilter } from "@smui/core/common/functions";

	let outlined: boolean = false;

	let showTitle: boolean = false;
	let showSubtitle: boolean = false;
	let showText: boolean = true;

	let showBodyTitle: boolean = false;
	let showBodySubtitle: boolean = false;
	let showBodyText: boolean = false;
	let media: AspectRatio = undefined;
	let showMediaContent: boolean = false;
	let horizontalLayout: boolean = false;
	let clickableBody: boolean = false;

	let actionsLayout: ActionsLayout = undefined;

	let isHeadTextDisabled = true;
	$: isHeadTextDisabled =
		!showTitle &&
		!showSubtitle &&
		!showBodyTitle &&
		!showBodySubtitle &&
		!showBodyText &&
		!media &&
		!showMediaContent;

	let isClickableBodyDisabled = true;
	$: isClickableBodyDisabled =
		!showBodyTitle &&
		!showBodySubtitle &&
		!showBodyText &&
		!media &&
		!showMediaContent;

	let isHorizontalLayoutDisabled = true;
	$: if ((!showBodyTitle && !showBodySubtitle && !showBodyText) || !media) {
		isHorizontalLayoutDisabled = true;
		horizontalLayout = false;
	} else {
		isHorizontalLayoutDisabled = false;
	}

	$: if (!media) showMediaContent = false;

	$: if (isHeadTextDisabled) showText = true;
	$: if (isClickableBodyDisabled) clickableBody = false;

	let svelteCode: string;
	let svelteContentCode: string;
	$: svelteCode = generateSvelteCode({
		tag: "Card",
		props: props(outlined, horizontalLayout),
		content: svelteContentCode,
	});

	let scssCode: string;

	function props(
		outlinedValue: typeof outlined,
		horizontalLayoutValue: typeof horizontalLayout
	): StringListToFilter {
		return [
			`style="min-width: ${!horizontalLayoutValue ? 350 : 550}px"`,
			[outlinedValue, `variant="outlined"`],
		];
	}

	// function getIconCode(selectedIconType: typeof iconType) {
	//   if (selectedIconType === "material-icon") {
	//     return `<Icon>favorite</Icon>`;
	//   } else if (selectedIconType === "svg") {
	//     return `
	// 			<Icon type="svg" props={{ viewBox: '0 0 24 24' }}>
	// 				<circle cx="12" cy="12" r="12" />
	// 			</Icon>
	// 		`;
	//   } else {
	//     return `
	// 			<Icon
	// 				type="img"
	// 				props={{ src: '/icons/emojis/grinning-face.png', alt: 'Grinning face' }}/>
	// 		`;
	//   }
	// }
</script>

<style lang="scss">
	.options-sidebar {
		gap: 0 !important;
	}
</style>

<UseCardCode
	bind:svelteContentCode
	{showTitle}
	{showText}
	{showSubtitle}
	{media}
	{showMediaContent}
	{showBodyTitle}
	{showBodyText}
	{showBodySubtitle}
	{horizontalLayout}
	{clickableBody}
	{actionsLayout} />

<UseCardStyleCode bind:styleCode={scssCode} {media} {horizontalLayout} />

<Configurator {svelteCode} {scssCode}>
	<div slot="preview">
		<Card
			variant={outlined ? 'outlined' : undefined}
			style="min-width: {!horizontalLayout ? 350 : 550}px">
			{#if showTitle || showSubtitle || showText}
				<CardConfiguratorContent
					title={showTitle ? 'Head title' : ''}
					subtitle={showSubtitle ? 'Head subtitle' : ''}
					text={showText ? 'Head text' : ''} />
			{/if}
			{#if showBodyTitle || showBodySubtitle || showBodyText || media || showMediaContent}
				{#if !clickableBody}
					{#if !horizontalLayout}
						<CardConfiguratorBody
							title={showBodyTitle ? 'Body title' : ''}
							subtitle={showBodySubtitle ? 'Body subtitle' : ''}
							text={showBodyText ? 'Body text' : ''}
							{media}
							{showMediaContent} />
					{:else}
						<div class={classes['horizontal-layout']}>
							<CardConfiguratorBody
								title={showBodyTitle ? 'Body title' : ''}
								subtitle={showBodySubtitle ? 'Body subtitle' : ''}
								text={showBodyText ? 'Body text' : ''}
								{media}
								{showMediaContent} />
						</div>
					{/if}
				{:else}
					<PrimaryAction
						class={horizontalLayout ? classes['horizontal-layout'] : undefined}>
						<CardConfiguratorBody
							title={showBodyTitle ? 'Body title' : ''}
							subtitle={showBodySubtitle ? 'Body subtitle' : ''}
							text={showBodyText ? 'Body text' : ''}
							{media}
							{showMediaContent} />
					</PrimaryAction>
				{/if}
			{/if}
			{#if actionsLayout}
				<Actions fullBleed={actionsLayout === 'full-bleed'}>
					{#if actionsLayout === 'full-bleed'}
						<Button>
							<Label>Action</Label>
							<Icon>arrow_forward</Icon>
						</Button>
					{:else}
						{#if actionsLayout === 'single' || actionsLayout === 'multi' || actionsLayout === 'all'}
							<ActionButtons>
								<Button>
									<Label>Action</Label>
								</Button>
								{#if actionsLayout === 'multi' || actionsLayout === 'all'}
									<Button>
										<Label>Another</Label>
									</Button>
								{/if}
							</ActionButtons>
						{/if}
						{#if actionsLayout === 'icons' || actionsLayout === 'all'}
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
						{/if}
					{/if}
				</Actions>
			{/if}
		</Card>
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div>
			<FormField>
				<Checkbox bind:checked={outlined} />
				<span slot="label">Outlined</span>
			</FormField>
		</div>
		<div style="grid-column: span 2">
			<Typography>Head</Typography>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showTitle} />
				<span slot="label">Title</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showSubtitle} />
				<span slot="label">Subtitle</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showText} disabled={isHeadTextDisabled} />
				<span slot="label">Text</span>
			</FormField>
		</div>
		<div style="grid-column: span 2">
			<Typography>Body</Typography>
		</div>
		<div style="grid-column: span 2">
			<FormField>
				<Select bind:value={media}>
					<span slot="label">Media</span>
					<Option />
					<Option value="16x9">16x9</Option>
					<Option value="square">square</Option>
				</Select>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showMediaContent} disabled={!media} />
				<span slot="label">Media content</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showBodyTitle} />
				<span slot="label">Title</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showBodySubtitle} />
				<span slot="label">Subtitle</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox bind:checked={showBodyText} />
				<span slot="label">Text</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox
					bind:checked={clickableBody}
					disabled={isClickableBodyDisabled} />
				<span slot="label">Clickable</span>
			</FormField>
		</div>
		<div>
			<FormField>
				<Checkbox
					bind:checked={horizontalLayout}
					disabled={isHorizontalLayoutDisabled} />
				<span slot="label">Horizontal layout</span>
			</FormField>
		</div>
		<div style="grid-column: span 2">
			<Typography>Actions</Typography>
			<div>
				<FormField>
					<Select bind:value={actionsLayout}>
						<span slot="label">Actions layout</span>
						<Option />
						<Option value="single">Single action</Option>
						<Option value="multi">Multiple actions</Option>
						<Option value="icons">Icons actions</Option>
						<Option value="all">All types actions</Option>
						<Option value="full-bleed">Full bleed</Option>
					</Select>
				</FormField>
			</div>
		</div>
	</div>
</Configurator>
