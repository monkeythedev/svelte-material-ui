<script lang="ts">
	import {
		Banner,
		Text,
		Actions,
		Action,
		Label,
		Graphic,
		Icon,
	} from "@smui/core/banner";
	import { Configurator } from "src/components/configurator";
</script>

<Configurator>
	<div slot="preview">
		<Banner open>
			<Graphic>
				<Icon>report_problem</Icon>
			</Graphic>
			<Text>
				There was a problem processing a transaction on your credit card.
			</Text>
			<Actions>
				<Action>
					<Label>Retry</Label>
				</Action>
			</Actions>
		</Banner>
	</div>
	<div slot="optionsSidebar">dsa</div>
</Configurator>
