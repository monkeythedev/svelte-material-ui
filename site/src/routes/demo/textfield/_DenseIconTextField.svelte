
<script lang="ts">
  import {Textfield, Icon, HelperText} from '@smui/textfield';
  
  let valueDenseIconA = '';
  let valueDenseIconB = '';
  let valueDenseIconC = '';
</script>

<div>
  Dense, with Icon:

  <div class="columns margins">
    <div>
      <Textfield dense withLeadingIcon bind:value={valueDenseIconA} label="Standard" input$aria-controls="helper-text-dense-icon-a" input$aria-describedby="helper-text-dense-icon-a">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-dense-icon-a">Helper Text</HelperText>

      <pre class="status">Value: {valueDenseIconA}</pre>
    </div>
    <div>
      <Textfield variant="filled" dense withLeadingIcon bind:value={valueDenseIconB} label="Filled" input$aria-controls="helper-text-dense-icon-b" input$aria-describedby="helper-text-dense-icon-b">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-dense-icon-b">Helper Text</HelperText>

      <pre class="status">Value: {valueDenseIconB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" dense withLeadingIcon bind:value={valueDenseIconC} label="Outlined" input$aria-controls="helper-text-dense-icon-c" input$aria-describedby="helper-text-dense-icon-c">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-dense-icon-c">Helper Text</HelperText>

      <pre class="status">Value: {valueDenseIconC}</pre>
    </div>
  </div>
</div>