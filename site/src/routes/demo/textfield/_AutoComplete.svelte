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
</script>

<div>
	Autocomplete:

	<div class="{classes.columns} {classes.margins}">
		<div>
			<InputField name="name" autocomplete="on" required>
				<span slot="label">Name</span>
			</InputField>
		</div>

		<div>
			<InputField name="surname" autocomplete="on" required>
				<span slot="label">Surname</span>
			</InputField>
		</div>

		<div>
			<InputField name="email" type="email" autocomplete="on">
				<span slot="label">Email</span>
			</InputField>
		</div>

		<div>
			<InputField name="password" type="password" autocomplete="new-password">
				<span slot="label">Password</span>
			</InputField>
		</div>

		<div>
			<InputField name="street" type="text" autocomplete="street-address">
				<span slot="label">Address</span>
			</InputField>
		</div>

		<div>
			<InputField name="country" type="text" autocomplete="country">
				<span slot="label">Country</span>
			</InputField>
		</div>

		<div>
			<InputField name="language" type="text" autocomplete="tel">
				<span slot="label">Phone</span>
			</InputField>
		</div>
	</div>
</div>
