<script lang="ts">
  import { Content } from "@smui/card";
  import { Typography } from "@smui/typography";

  export let title: string;
  export let subtitle: string;
  export let text: string;
</script>

<Content>
  {#if title}
    <Typography variant="headline6">{title}</Typography>
  {/if}
  {#if subtitle}
    <Typography variant="subtitle2">{subtitle}</Typography>
  {/if}
  {text}
</Content>
