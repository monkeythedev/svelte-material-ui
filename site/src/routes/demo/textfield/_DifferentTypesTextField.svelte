<script lang="ts">
	import { InputField, FullWidthTextField } from "@smui/core/textfield";
	import classes from "./index.module.scss";

	let number = 5;
	let step = 0;
	let email = "";
	let phone = "";
	let url = "";
	let date = "";
	let datetime = "";
	let month = "";
	let week = "";
	let time = "";
	let search = "";
</script>

<div>
	Different Types:

	<div class="{classes.columns} {classes.margins}">
		<div>
			<InputField bind:value={number} type="number">
				<span slot="label">Number</span>
			</InputField>

			<pre class="status">Value: {number}</pre>
		</div>

		<div>
			<InputField bind:value={step} type="number" step={2} min={2} max={10}>
				<span slot="label">Number</span>
			</InputField>

			<pre class="status">Value: {step}</pre>
		</div>

		<div>
			<InputField bind:value={email} type="email">
				<span slot="label">Email</span>
			</InputField>

			<pre class="status">Value: {email}</pre>
		</div>

		<div>
			<InputField bind:value={date} type="date">
				<span slot="label">Date</span>
			</InputField>

			<pre class="status">Value: {date}</pre>
		</div>

		<div>
			<InputField bind:value={phone} type="tel">
				<span slot="label">Phone</span>
			</InputField>

			<pre class="status">Value: {phone}</pre>
		</div>

		<div>
			<InputField bind:value={url} type="url">
				<span slot="label">Url</span>
			</InputField>

			<pre class="status">Value: {url}</pre>
		</div>

		<div>
			<InputField bind:value={datetime} type="datetime-local">
				<span slot="label">DateTime-Local</span>
			</InputField>

			<pre class="status">Value: {datetime}</pre>
		</div>

		<div>
			<InputField bind:value={month} type="month">
				<span slot="label">Month</span>
			</InputField>

			<pre class="status">Value: {month}</pre>
		</div>

		<div>
			<InputField bind:value={week} type="week">
				<span slot="label">Week</span>
			</InputField>

			<pre class="status">Value: {week}</pre>
		</div>

		<div>
			<InputField bind:value={time} type="time">
				<span slot="label">time</span>
			</InputField>

			<pre class="status">Value: {time}</pre>
		</div>
	</div>

	<div>
		<FullWidthTextField
			bind:value={search}
			type="search"
			placeholder="Search"
			maxlength={10}>
			<span slot="label">Fullwidth search</span>
		</FullWidthTextField>

		<pre class="status">Value: {search}</pre>
	</div>
</div>
