<script lang="ts">
	import { Fragment } from "@smui/core/common/components";
	import { InputField, Icon, HelperText } from "@smui/core/textfield";
	import classes from "./index.module.scss";

	let valueClickable = "";
	let dirtyClickable = false;
	let invalidClickable = false;

	function clickableHandler() {
		alert(`Sending to ${valueClickable}!`);
		valueClickable = "";
		dirtyClickable = false;
	}
</script>

<div>
	<div class={classes.margins}>
		<!--
      Notice that when you bind to `invalid`, but you only want to monitor it
      instead of updating it yourself, you also should include
      `updateInvalid`.
    -->
		<InputField
			type="email"
			withTrailingIcon={valueClickable !== ''}
			bind:dirty={dirtyClickable}
			bind:invalid={invalidClickable}
			updateInvalid
			bind:value={valueClickable}
			style="min-width: 250px;"
			autocomplete="email">
			<div slot="trailingIcon" let:class={className}>
				{#if valueClickable !== '' && dirtyClickable && !invalidClickable}
					<Fragment>
						<Icon
							class="material-icons {className}"
							role="button"
							on:click={clickableHandler}>
							send
						</Icon>
					</Fragment>
				{/if}
			</div>
			<span slot="label">To</span>
			<div slot="helperText">
				<HelperText validationMsg>That's not a valid email address.</HelperText>
			</div>
		</InputField>
	</div>

	<pre class="status">Dirty: {dirtyClickable}, Invalid: {invalidClickable}</pre>
</div>
