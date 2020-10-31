<script context="module" lang="ts">
  export type ClassListToParse = (string | [any, string])[];
</script>

<script lang="ts">
  export let toParse: ClassListToParse;
  export let parsed: string;

  $: parsed = toParse.map(item => {
    if (Array.isArray(item)) return item[0] ? item[1] : ""
    else return item
  }).filter(item => item).join(" ");
</script>