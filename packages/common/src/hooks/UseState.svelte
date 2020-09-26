<script lang="ts">
  import { memo } from "../utils";
  import Use from "./Use.svelte";

  export let value: any;
  export let onUpdate: (oldValue?: any) => void;

  const valueMemo = memo(value);

  let positionMemo = memo(value);
  function onValueUpdate(value: any) {
    if (value !== valueMemo.val) {
      onUpdate(valueMemo.val);
      positionMemo.val = value;
    }
  }
</script>

<Use hook={() => onValueUpdate(value)} />
