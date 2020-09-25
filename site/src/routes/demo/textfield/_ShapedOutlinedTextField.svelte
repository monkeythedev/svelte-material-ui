<script lang="ts">
  import {Textfield, Icon, HelperText} from '@smui/textfield';

  let valueShapedOutlinedA = '';
  let valueShapedOutlinedB = '';
  let valueShapedOutlinedC = '';
  let valueShapedOutlinedD = '';
  
</script>

<div>
  Shaped Outlined:

  <div class="columns margins">
    <div>
      <Textfield class="shaped-outlined" variant="outlined" bind:value={valueShapedOutlinedA} label="Label" input$aria-controls="helper-text-shaped-outlined-a" input$aria-describedby="helper-text-shaped-outlined-a" />
      <HelperText id="helper-text-shaped-outlined-a">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedOutlinedA}</pre>
    </div>
    <div>
      <Textfield class="shaped-outlined" variant="outlined" withLeadingIcon bind:value={valueShapedOutlinedB} label="Leading Icon" input$aria-controls="helper-text-shaped-outlined-b" input$aria-describedby="helper-text-shaped-outlined-b">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-shaped-outlined-b">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedOutlinedB}</pre>
    </div>
    <div>
      <Textfield class="shaped-outlined" variant="outlined" withTrailingIcon bind:value={valueShapedOutlinedC} label="Trailing Icon" input$aria-controls="helper-text-shaped-outlined-c" input$aria-describedby="helper-text-shaped-outlined-c">
        <Icon class="material-icons">delete</Icon>
      </Textfield>
      <HelperText id="helper-text-shaped-outlined-c">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedOutlinedC}</pre>
    </div>
    <div>
      <Textfield class="shaped-outlined" variant="outlined" invalid bind:value={valueShapedOutlinedD} label="Invalid" input$aria-controls="helper-text-shaped-outlined-d" input$aria-describedby="helper-text-shaped-outlined-d" />
      <HelperText id="helper-text-shaped-outlined-d">Helper Text</HelperText>

      <pre class="status">Value: {valueShapedOutlinedD}</pre>
    </div>
  </div>
</div>
