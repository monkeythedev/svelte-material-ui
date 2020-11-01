<script lang="ts">
	import {
		InputField,
		Icon,
		HelperText,
		TextFieldVariant,
		CharacterCounter,
	} from "@smui/core/textfield";
	import classes from "./index.module.scss";
	import "./index.scss";

	export let variant: TextFieldVariant;
	export let textFieldClass: string = "";
	export let title: string;

	let valueA = "";
	let valueB = "";
	let valueC = "";
	let valueD = "";
	let valueE = "";
	let valueF = "";
	let valueG = "";
	let valueH = "";
	let valueI = "";
	let valueJ = "";
	let valueK = "";
	let valueL = "";
	let valueM = "";
	let readonly = "Readonly value";
	let pattern = "";
</script>

<div>
	{title}:

	<div class="{classes.columns} {classes.margins}">
		<div>
			<InputField class={textFieldClass} {variant} bind:value={valueA}>
				<span slot="label">Label</span>
				<div slot="helperText">
					<HelperText>Helper Text</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueA}</pre>
		</div>
		<div>
			<InputField class={textFieldClass} {variant} bind:value={valueB}>
				<div slot="leadingIcon" let:class={className}>
					<Icon class="material-icons {className}">event</Icon>
				</div>
				<span slot="label">Leading Icon</span>
				<div slot="helperText">
					<HelperText>Helper Text</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueB}</pre>
		</div>
		<div>
			<InputField class={textFieldClass} {variant} bind:value={valueC}>
				<div slot="trailingIcon" let:class={className}>
					<Icon
						class="material-icons {className}"
						role="button"
						on:click={() => (valueC = '')}
						ariaLabel="delete">
						delete
					</Icon>
				</div>
				<span slot="label">Trailing Icon</span>
				<div slot="helperText">
					<HelperText>Helper Text</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueC}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				customValidation={() => false}
				bind:value={valueD}>
				<span slot="label">Invalid</span>
				<div slot="helperText">
					<HelperText>Helper Text</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueD}</pre>
		</div>
		<div>
			<InputField class={textFieldClass} {variant} disabled>
				<span slot="label">Disabled</span>
				<div slot="helperText">
					<HelperText>Helper Text</HelperText>
				</div>
			</InputField>
		</div>
		<div>
			<!-- due to a bug on MDC, label is not visible when variant is "filled" -->
			<InputField
				class="dense-text-field--{variant} {textFieldClass}"
				{variant}
				bind:value={valueE}>
				<span slot="label">Dense</span>
				<div slot="helperText">
					<HelperText>Helper Text</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueE}</pre>
		</div>
		<!-- Too broken MDC side <div>
      <InputField
        class="dense-text-field--{variant}--with-leading-icon {textFieldClass}"
        {variant}
        bind:value={valueF}
        label="Dense Leading Icon">
        <Icon position="leading" class="material-icons">event</Icon>
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </InputField>
  
      <pre class="status">Value: {valueF}</pre>
    </div> -->
		<div>
			<InputField class={textFieldClass} {variant} bind:value={valueG} />

			<pre class="status">Value: {valueG}</pre>
		</div>
		<div>
			<InputField class={textFieldClass} {variant} bind:value={valueH}>
				<span slot="label">Persistent Helper Text</span>
				<div slot="helperText">
					<HelperText persistent>Helper Text</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueH}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				bind:value={valueI}
				maxlength={18}>
				<span slot="label">Character counter</span>
				<div slot="helperText">
					<HelperText>
						Helper Text
						<span slot="character-counter">
							<CharacterCounter />
						</span>
					</HelperText>
				</div>
			</InputField>

			<pre class="status">Value: {valueI}</pre>
		</div>
		<div>
			<InputField class={textFieldClass} {variant} bind:value={valueJ}>
				<span slot="label">Both icons</span>
				<div slot="leadingIcon" let:class={className}>
					<Icon class="material-icons {className}">event</Icon>
				</div>
				<div slot="trailingIcon" let:class={className}>
					<Icon
						class="material-icons {className}"
						role="button"
						on:click={() => (valueJ = '')}
						ariaLabel="delete">
						delete
					</Icon>
				</div>
			</InputField>

			<pre class="status">Value: {valueJ}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				bind:value={valueK}
				type="email">
				<span slot="label"><Icon
						class="material-icons"
						style="font-size: 1em; line-height: normal; vertical-align: middle;">
						email
					</Icon>
					Icon in label</span>
			</InputField>

			<pre class="status">Value: {valueK}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				bind:value={valueL}
				type="text"
				prefix="$"
				suffix=".00">
				<span slot="label">Suffix and prefix</span>
			</InputField>

			<pre class="status">Value: {valueL}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				bind:value={valueM}
				type="text"
				prefix="$"
				suffix=".00">
				<span slot="label">Suf, pref & icons</span>
				<div slot="leadingIcon" let:class={className}>
					<Icon class="material-icons {className}">event</Icon>
				</div>
				<div slot="trailingIcon" let:class={className}>
					<Icon
						class="material-icons {className}"
						role="button"
						on:click={() => (valueM = '')}>
						delete
					</Icon>
				</div>
			</InputField>

			<pre class="status">Value: {valueM}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				bind:value={readonly}
				readonly>
				<span slot="label">Readonly</span>
			</InputField>

			<pre class="status">Value: {readonly}</pre>
		</div>
		<div>
			<InputField
				class={textFieldClass}
				{variant}
				bind:value={pattern}
				pattern={'[a-z]{0,3}'}>
				<span slot="label">Pattern /{'[a-z]{0,3}'}/</span>
			</InputField>

			<pre class="status">Value: {pattern}</pre>
		</div>
	</div>
</div>
