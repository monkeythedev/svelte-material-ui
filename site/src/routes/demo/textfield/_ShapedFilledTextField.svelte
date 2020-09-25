<script lang="ts">
  import {Textfield, Icon, HelperText} from '@smui/textfield';

  let valueShapedFilledA = '';
  let valueShapedFilledB = '';
  let valueShapedFilledC = '';
  let valueShapedFilledD = '';
</script>

<div>
  Shaped Filled:

  <div class="columns margins">
    <div>
      <Textfield class="shaped" variant="filled" bind:value={valueShapedFilledA} label="Label" input$aria-controls="helper-text-shaped-filled-a" input$aria-describedby="helper-text-shaped-filled-a" />
      <HelperText id="helper-text-shaped-filled-a">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedFilledA}</pre>
    </div>
    <div>
      <Textfield class="shaped" variant="filled" withLeadingIcon bind:value={valueShapedFilledB} label="Leading Icon" input$aria-controls="helper-text-shaped-filled-b" input$aria-describedby="helper-text-shaped-filled-b">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-shaped-filled-b">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedFilledB}</pre>
    </div>
    <div>
      <Textfield class="shaped" variant="filled" withTrailingIcon bind:value={valueShapedFilledC} label="Trailing Icon" input$aria-controls="helper-text-shaped-filled-c" input$aria-describedby="helper-text-shaped-filled-c">
        <Icon class="material-icons">delete</Icon>
      </Textfield>
      <HelperText id="helper-text-shaped-filled-c">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedFilledC}</pre>
    </div>
    <div>
      <Textfield class="shaped" variant="filled" invalid bind:value={valueShapedFilledD} label="Invalid" input$aria-controls="helper-text-shaped-filled-d" input$aria-describedby="helper-text-shaped-filled-d" />
      <HelperText id="helper-text-shaped-filled-d">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedFilledD}</pre>
    </div>
  </div>
</div>