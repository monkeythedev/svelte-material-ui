<script lang="ts">
  import ExampleTextField from "./_ExampleTextField.svelte";
  import BaseTextField from "./_BaseTextField.svelte";
  import "./index.scss";
import TextArea from "./_TextArea.svelte";
</script>

<svelte:head>
  <title>Text Field - SMUI</title>
</svelte:head>

<section>
  <h2>Text Field</h2>

  <ExampleTextField />
  <BaseTextField variant="filled" title="Filled"/>
  <BaseTextField variant="outlined" title="Outlined"/>
  <BaseTextField variant="filled" textFieldClass="shaped" title="Shaped"/>
  <BaseTextField variant="outlined" textFieldClass="shaped-outline" title="Shaped Outlined"/>
  <TextArea></TextArea>
</section>
