<script lang="ts">
  import { memo } from "../utils";
  import Use from "./Use.svelte";

  export let value: any;
  export let onUpdate: (oldValue?: any) => void;

  const valueMemo = memo(value);

  function onValueUpdate(value: any) {
    if (value !== valueMemo.val) {
      onUpdate(valueMemo.val);
      valueMemo.val = value;
    }
  }

  export function setValue(newValue: typeof value) {
    valueMemo.val = newValue;
    value = newValue;
  }
</script>

<Use hook={() => onValueUpdate(value)} />
