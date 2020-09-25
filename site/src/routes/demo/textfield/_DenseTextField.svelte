
<script lang="ts">
  import {Textfield, HelperText} from '@smui/textfield';

  let valueDenseA = '';
  let valueDenseB = '';
  let valueDenseC = '';
</script>

<div>
  Dense:

  <div class="columns margins">
    <div>
      <Textfield dense bind:value={valueDenseA} label="Standard" input$aria-controls="helper-text-dense-a" input$aria-describedby="helper-text-dense-a" />
      <HelperText id="helper-text-dense-a">Helper Text</HelperText>

      <pre class="status">Value: {valueDenseA}</pre>
    </div>
    <div>
      <Textfield variant="filled" dense bind:value={valueDenseB} label="Filled" input$aria-controls="helper-text-dense-b" input$aria-describedby="helper-text-dense-b" />
      <HelperText id="helper-text-dense-b">Helper Text</HelperText>

      <pre class="status">Value: {valueDenseB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" dense bind:value={valueDenseC} label="Outlined" input$aria-controls="helper-text-dense-c" input$aria-describedby="helper-text-dense-c" />
      <HelperText id="helper-text-dense-c">Helper Text</HelperText>

      <pre class="status">Value: {valueDenseC}</pre>
    </div>
  </div>
</div>