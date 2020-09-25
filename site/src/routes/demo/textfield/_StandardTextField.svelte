
<script lang="ts">
  import {Textfield, HelperText, Icon} from '@smui/textfield';

  let valueStandardA = '';
  let valueStandardB = '';
  let valueStandardC = '';
  let valueStandardD = '';
  let valueFullwidth = '';

</script>

<div>
  Standard:

  <div class="columns margins">
    <div>
      <Textfield bind:value={valueStandardA} label="Label" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />
      <HelperText id="helper-text-standard-a">Helper Text</HelperText>

      <pre class="status">Value: {valueStandardA}</pre>
    </div>
    <div>
      <Textfield withLeadingIcon bind:value={valueStandardB} label="Leading Icon" input$aria-controls="helper-text-standard-b" input$aria-describedby="helper-text-standard-b">
        <Icon class="material-icons">event</Icon>
      </Textfield>
      <HelperText id="helper-text-standard-b">Helper Text</HelperText>

      <pre class="status">Value: {valueStandardB}</pre>
    </div>
    <div>
      <Textfield withTrailingIcon bind:value={valueStandardC} label="Trailing Icon" input$aria-controls="helper-text-standard-c" input$aria-describedby="helper-text-standard-c">
        <Icon class="material-icons">delete</Icon>
      </Textfield>
      <HelperText id="helper-text-standard-c">Helper Text</HelperText>

      <pre class="status">Value: {valueStandardC}</pre>
    </div>
    <div>
      <Textfield invalid bind:value={valueStandardD} label="Invalid" input$aria-controls="helper-text-standard-d" input$aria-describedby="helper-text-standard-d" />
      <HelperText id="helper-text-standard-d">Helper Text</HelperText>

      <pre class="status">Value: {valueStandardD}</pre>
    </div>
  </div>
</div>

<div>
  Full Width:

  <div class="margins">
    <Textfield fullwidth lineRipple={false} bind:value={valueFullwidth} label="Label" input$aria-controls="helper-text-fullwidth" input$aria-describedby="helper-text-fullwidth" />
    <HelperText id="helper-text-fullwidth">Helper Text</HelperText>
  </div>
</div>