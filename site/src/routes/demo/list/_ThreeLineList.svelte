<script lang="ts">
	import {
		List,
		Item,
		PrimaryText,
		Text,
		SecondaryText,
	} from "@smui/core/list";
</script>

<div>
	A three-line list:
	<List class="demo-list" threeLine nonInteractive>
		<Item>
			<Text>
				<PrimaryText>FruitPhone 11</PrimaryText>
				<SecondaryText>$1,100</SecondaryText>
				<SecondaryText>A beautiful phone with good specs.</SecondaryText>
			</Text>
		</Item>
		<Item>
			<Text>
				<PrimaryText>Addition Phone</PrimaryText>
				<SecondaryText>$700</SecondaryText>
				<SecondaryText>
					Pretty much the same phone, but a different brand name and OS.
				</SecondaryText>
			</Text>
		</Item>
	</List>
</div>
