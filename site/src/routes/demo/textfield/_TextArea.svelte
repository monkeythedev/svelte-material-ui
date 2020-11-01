<script lang="ts">
	import { TextArea, HelperText, CharacterCounter } from "@smui/core/textfield";
	import { Fragment } from "@smui/core/common/components";
	import classes from "./index.module.scss";

	let valueTextarea = "";
	let valueTextareaCharCount = "";
	let valueFullwidthTextarea = "";
</script>

<div>
	Textarea:

	<div class="{classes.columns} {classes.margins}">
		<div>
			<TextArea bind:value={valueTextarea}>
				<span slot="label">Standard Text Area</span>
				<div slot="helperText">
					<Fragment>
						<HelperText id="helper-text-textarea">Helper Text</HelperText>
					</Fragment>
				</div>
			</TextArea>
		</div>
		<div>
			<TextArea bind:value={valueTextareaCharCount} maxlength={18}>
				<span slot="label">Text Area with charaters counter</span>
				<div slot="helperText">
					<Fragment>
						<HelperText id="helper-text-textarea">
							Helper Text
							<span slot="character-counter">
								<CharacterCounter>0 / 18</CharacterCounter>
							</span>
						</HelperText>
					</Fragment>
				</div>
			</TextArea>
		</div>
	</div>
</div>

<div>
	Full Width Textarea:

	<div class="margins">
		<TextArea fullWidth bind:value={valueFullwidthTextarea}>
			<span slot="label">Label</span>
			<div slot="helperText">
				<Fragment>
					<HelperText id="helper-text-fullwidth-textarea">
						Helper Text
					</HelperText>
				</Fragment>
			</div>
		</TextArea>
	</div>
</div>
