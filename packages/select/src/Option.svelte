<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/select/Option:${count++}`;

	import { ListItemDOMElement, Text } from "@smui/list";
	export let dom: ListItemDOMElement = undefined;

	import { BaseProps } from "@smui/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	import { Item } from "@smui/list";
	import { onDestroy } from "svelte";

	export let value: any = "";
	export let selected: boolean = undefined;

	$: if (value == null) value = "";
</script>

<Item
	bind:dom
	{...props}
	{id}
	class={className}
	{style}
	{value}
	{selected}
	role="option"
	on:domEvent={forwardDOMEvents}>
	<Text>
		<slot />
	</Text>
</Item>

<!-- {#if enhanced}
  <Item
    use={[forwardEvents, ...use]}
    data-value={value}
    {selected}
    {...props}
  ><slot></slot></Item>
{:else}
  <option
    use:useActions={use}
    use:forwardEvents
    {value}
    {...selectedProp}
    {...props}
  ><slot></slot></option>
{/if} -->
