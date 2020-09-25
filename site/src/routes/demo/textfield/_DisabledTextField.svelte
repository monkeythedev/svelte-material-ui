
<script lang="ts">
  import {Textfield, HelperText} from '@smui/textfield';
</script>

<div>
  Disabled:

  <div class="columns margins">
    <div>
      <Textfield disabled value="" label="Standard" input$aria-controls="helper-text-disabled-a" input$aria-describedby="helper-text-disabled-a" />
      <HelperText id="helper-text-disabled-a">Helper Text</HelperText>
    </div>
    <div>
      <Textfield variant="filled" disabled value="" label="Filled" input$aria-controls="helper-text-disabled-b" input$aria-describedby="helper-text-disabled-b" />
      <HelperText id="helper-text-disabled-b">Helper Text</HelperText>
    </div>
    <div>
      <Textfield variant="outlined" disabled value="" label="Outlined" input$aria-controls="helper-text-disabled-c" input$aria-describedby="helper-text-disabled-c" />
      <HelperText id="helper-text-disabled-c">Helper Text</HelperText>
    </div>
  </div>
</div>