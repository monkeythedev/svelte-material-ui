
<script lang="ts">
  import {Textfield, Icon, HelperText} from '@smui/textfield';

  let valueFilledA = '';
  let valueFilledB = '';
  let valueFilledC = '';
  let valueFilledD = '';
</script>

<div>
  Filled:

  <div class="columns margins">
    <div>
      <Textfield variant="filled" bind:value={valueFilledA} label="Label" input$aria-controls="helper-text-filled-a" input$aria-describedby="helper-text-filled-a" />
      <HelperText id="helper-text-filled-a">Helper Text</HelperText>

      <pre class="status">Value: {valueFilledA}</pre>
    </div>
    <div>
      <Textfield withLeadingIcon variant="filled" bind:value={valueFilledB} label="Leading Icon" input$aria-controls="helper-text-filled-b" input$aria-describedby="helper-text-filled-b">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-filled-b">Helper Text</HelperText>

      <pre class="status">Value: {valueFilledB}</pre>
    </div>
    <div>
      <Textfield withTrailingIcon variant="filled" bind:value={valueFilledC} label="Trailing Icon" input$aria-controls="helper-text-filled-c" input$aria-describedby="helper-text-filled-c">
        <Icon class="material-icons">delete</Icon>
      </Textfield>
      <HelperText id="helper-text-filled-c">Helper Text</HelperText>

      <pre class="status">Value: {valueFilledC}</pre>
    </div>
    <div>
      <Textfield invalid variant="filled" bind:value={valueFilledD} label="Invalid" input$aria-controls="helper-text-filled-d" input$aria-describedby="helper-text-filled-d" />
      <HelperText id="helper-text-filled-d">Helper Text</HelperText>

      <pre class="status">Value: {valueFilledD}</pre>
    </div>
  </div>
</div>