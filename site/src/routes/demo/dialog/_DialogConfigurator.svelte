<script lang="ts">
	import {
		Dialog,
		Title,
		Content,
		Actions,
		OnCloseEventDetail,
		Action,
	} from "@smui/core/dialog";
	import { Button, Label } from "@smui/core/button";
	import { List, Item, Text } from "@smui/core/list";
	import { FormField } from "@smui/core/form-field";
	import {
		Configurator,
		generateSvelteCode,
	} from "src/components/configurator";
	import { Select, Option } from "@smui/core/select";

	let open: boolean;
	let closeReason: string;

	let layout: "alert" | "list" | "confirmation";

	let svelteCode: string;
	let scssCode: string;

	$: svelteCode = generateSvelteCode({
		tag: "Dialog",
		props: [`bind:open`, `on:closed={closeHandler}`],
		content: `
			<Title id="event-title">Dialog title</Title>
			${getContentCode(layout)}
		`,
	});

	function getContentCode(layoutValue: typeof layout) {
		if (layoutValue === "alert") {
			return `
			<Content id="event-content">
				Out of all the dogs, which is the best dog?
			</Content>
			<Actions>
				<Action action="none">
					<Label>None of Them</Label>
				</Action>
				<Action action="all" default>
					<Label>All of Them</Label>
				</Action>
			</Actions>
			`;
		} else if (layoutValue === "list") {
			return `
			<List>
				{#each [...Array(100)].map((v, i) => i + 1) as item}
					<Item
						props={{ 'data-mdc-dialog-action': \`item #\${item}\` }}>
						<Text>Item #{item}</Text>
					</Item>
				{/each}
			</List>
			`;
		} else {
			return `
			<Content id="event-content">
				Confirm? (ESC and click outside is like click on "close" action)
			</Content>
			<Actions>
				<Action action="close">
					<Label>Cancel</Label>
				</Action>
				<Action action="accept" default>
					<Label>Accept</Label>
				</Action>
			</Actions>
			`;
		}
	}

	function closeHandler(eventDetail: OnCloseEventDetail) {
		closeReason = eventDetail.action;
	}
</script>

<svelte:options immutable={true} />

<Configurator {svelteCode} {scssCode}>
	<div slot="preview">
		<Dialog bind:open on:closed={(event) => closeHandler(event.detail)}>
			<Title id="event-title">Dialog title</Title>
			{#if layout === 'alert'}
				<Content id="event-content">
					Out of all the dogs, which is the best dog?
				</Content>
				<Actions>
					<Action action="none">
						<Label>None of Them</Label>
					</Action>
					<Action action="all" default>
						<Label>All of Them</Label>
					</Action>
				</Actions>
			{:else if layout === 'list'}
				<List>
					{#each [...Array(100)].map((v, i) => i + 1) as item}
						<Item props={{ 'data-mdc-dialog-action': `item #${item}` }}>
							<Text>Item #{item}</Text>
						</Item>
					{/each}
				</List>
			{:else if layout === 'confirmation'}
				<Content id="event-content">
					Confirm? (ESC and click outside is like click on "close" action)
				</Content>
				<Actions>
					<Action action="close">
						<Label>Cancel</Label>
					</Action>
					<Action action="accept" default>
						<Label>Accept</Label>
					</Action>
				</Actions>
			{/if}
		</Dialog>

		<Button on:click={() => (open = true)}>
			<Label>Open Dialog</Label>
		</Button>
	</div>
	<div slot="values">
		{#if closeReason}closeReason: {closeReason}{/if}
	</div>
	<div slot="optionsSidebar" class="options-sidebar">
		<div>
			<FormField>
				<Select bind:value={layout} nullable={false}>
					<span slot="label">Dialog layout</span>
					<Option value="alert">Alert</Option>
					<Option value="list">List</Option>
					<Option value="confirmation">Confirmation</Option>
				</Select>
			</FormField>
		</div>
	</div>
</Configurator>
