<script lang="ts">
  import {Textfield, Icon, HelperText} from '@smui/textfield';
 
  let valueOutlinedA = '';
  let valueOutlinedB = '';
  let valueOutlinedC = '';
  let valueOutlinedD = '';
</script>

<div>
  Outlined:

  <div class="columns margins">
    <div>
      <Textfield variant="outlined" bind:value={valueOutlinedA} label="Label" input$aria-controls="helper-text-outlined-a" input$aria-describedby="helper-text-outlined-a" />
      <HelperText id="helper-text-outlined-a">Helper Text</HelperText>

      <pre class="status">Value: {valueOutlinedA}</pre>
    </div>
    <div>
      <Textfield variant="outlined" withLeadingIcon bind:value={valueOutlinedB} label="Leading Icon" input$aria-controls="helper-text-outlined-b" input$aria-describedby="helper-text-outlined-b">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-outlined-b">Helper Text</HelperText>

      <pre class="status">Value: {valueOutlinedB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" withTrailingIcon bind:value={valueOutlinedC} label="Trailing Icon" input$aria-controls="helper-text-outlined-c" input$aria-describedby="helper-text-outlined-c">
        <Icon class="material-icons">delete</Icon>
      </Textfield>
      <HelperText id="helper-text-outlined-c">Helper Text</HelperText>

      <pre class="status">Value: {valueOutlinedC}</pre>
    </div>
    <div>
      <Textfield variant="outlined" invalid bind:value={valueOutlinedD} label="Invalid" input$aria-controls="helper-text-outlined-d" input$aria-describedby="helper-text-outlined-d" />
      <HelperText id="helper-text-outlined-d">Helper Text</HelperText>

      <pre class="status">Value: {valueOutlinedD}</pre>
    </div>
  </div>
</div>