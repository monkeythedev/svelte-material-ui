<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { LinearProgress } from "@smui/linear-progress";
  import { Checkbox } from "@smui/checkbox";
  import { FormField } from "@smui/form-field";
  import { Button } from "@smui/button";

  let progress: number = 0;
  let closed: boolean = false;
  let timer: number;
  let startStop: boolean = true;

  onMount(reset);

  onDestroy(() => {
    clearInterval(timer);
  });

  function reset() {
    progress = 0;
    closed = false;
    clearInterval(timer);
    timer = setInterval(() => {
      if (startStop)
      progress += 0.01;

      if (progress >= 1) {
        progress = 1;
        closed = true;
        clearInterval(timer);
      }
    }, 100);
  }
</script>

<div>
  <LinearProgress {progress} {closed} />

  <br />

  <Button on:click={reset}>Reset</Button>

  <FormField>
    <Checkbox bind:checked={startStop} />
    <span slot="label">Start/Stop</span>
  </FormField>

  <FormField>
    <Checkbox bind:checked={closed} />
    <span slot="label">Closed</span>
  </FormField>
</div>
 