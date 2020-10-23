<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	import { memo } from "../utils";
	import Use from "./Use.svelte";

	export let value: any;
	export let onUpdate: (oldValue?: any) => void;
	export const id: string = `@smui/common/hooks/UseState-${count++}`;

	const valueMemo = memo(value);

	function onValueUpdate(value: any) {
		if (value !== valueMemo.val) {
			const currentValueMemo = valueMemo.val;

			onUpdate(valueMemo.val);

			if (currentValueMemo === valueMemo.val) {
				// Prevent infinite loop when setValue is called during onUpdate
				valueMemo.val = value;
			}
		}
	}

	export function setValue(newValue: typeof value) {
		valueMemo.val = newValue;
		value = newValue;
	}

	export function getValue() {
		return value;
	}
</script>

<svelte:options immutable={true} />

<Use hook={() => onValueUpdate(value)} />
