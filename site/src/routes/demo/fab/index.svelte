<script lang="ts">
  import { Fab, Label, Icon } from "@smui/fab";
  import { FormField } from "@smui/form-field";
  import { Checkbox } from "@smui/checkbox";
  import Fabs from "./_Fabs.svelte";

  let clicked = 0;
</script>

<svelte:head>
  <title>Floating Action Button - SMUI</title>
</svelte:head>

<section>
  <h2>Floating Action Button</h2>

  <Fabs on:click={() => clicked++} />

  Primary color: <br />

  <Fabs color="primary" on:click={() => clicked++} />

  <pre class="status">Clicked: {clicked}</pre>
</section>
