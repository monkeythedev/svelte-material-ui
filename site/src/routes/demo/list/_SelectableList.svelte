<script lang="ts">
	import {
		List,
		Item,
		Graphic,
		Meta,
		Text,
		PrimaryText,
		SecondaryText,
	} from "@smui/core/list";
	import { Typography } from "@smui/core/typography";
	import { Icon } from "@smui/core/common/dom";

	let optionsTwoLine = [
		{
			name: "Bruce Willis",
			description: "Actor",
			disabled: false,
		},
		{
			name: "Austin Powers",
			description: "Fictional Character",
			disabled: true,
		},
		{
			name: "Thomas Edison",
			description: "Inventor",
			disabled: false,
		},
		{
			name: "Stephen Hawking",
			description: "Scientist",
			disabled: false,
		},
	];
	let selectionTwoLine = "Stephen Hawking";
</script>

<div>
	A two-line single selection list with avatars, disabled item, and meta:
	<List class="demo-list" twoLine avatarList role="listbox">
		{#each optionsTwoLine as item}
			<Item
				on:selected={() => (selectionTwoLine = item.name)}
				disabled={item.disabled}
				selected={selectionTwoLine === item.name}>
				<Graphic
					style="background-image:
          url(https://via.placeholder.com/40x40.png?text={item.name
						.split(' ')
						.map((val) => val.substring(0, 1))
						.join('')});" />
				<Text>
					<PrimaryText>{item.name}</PrimaryText>
					<SecondaryText>{item.description}</SecondaryText>
				</Text>
				<Meta class="material-icons">info</Meta>
			</Item>
		{/each}
	</List>
</div>

<pre
	class="status">
  Selected: {selectionTwoLine}, value of selectedIndex: {optionsTwoLine
		.map((item) => item.name)
		.indexOf(selectionTwoLine)}
</pre>
