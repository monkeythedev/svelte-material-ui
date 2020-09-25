
<script lang="ts">
  import {Textfield, HelperText} from '@smui/textfield';
  
  let valuePersistentA = '';
  let valuePersistentB = '';
  let valuePersistentC = '';
</script>

<div>
  With persistent helper text:

  <div class="columns margins">
    <div>
      <Textfield bind:value={valuePersistentA} label="Standard" input$aria-controls="helper-text-persistent-a" input$aria-describedby="helper-text-persistent-a" />
      <HelperText id="helper-text-persistent-a" persistent>Helper Text</HelperText>

      <pre class="status">Value: {valuePersistentA}</pre>
    </div>
    <div>
      <Textfield variant="filled" bind:value={valuePersistentB} label="Filled" input$aria-controls="helper-text-persistent-b" input$aria-describedby="helper-text-persistent-b" />
      <HelperText id="helper-text-persistent-b" persistent>Helper Text</HelperText>

      <pre class="status">Value: {valuePersistentB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" bind:value={valuePersistentC} label="Outlined" input$aria-controls="helper-text-persistent-c" input$aria-describedby="helper-text-persistent-c" />
      <HelperText id="helper-text-persistent-c" persistent>Helper Text</HelperText>

      <pre class="status">Value: {valuePersistentC}</pre>
    </div>
  </div>
</div>