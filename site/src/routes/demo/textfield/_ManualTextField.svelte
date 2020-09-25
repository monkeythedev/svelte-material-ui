
  
<script lang="ts">
  import {Textfield, Input, Textarea, Icon, HelperText} from '@smui/textfield';
  import FloatingLabel from '@smui/floating-label';
  import LineRipple from '@smui/line-ripple';
  import NotchedOutline from '@smui/notched-outline';

  let valueManualA = '';
  let valueManualB = '';
  let valueManualC = '';
  let valueManualD = '';
</script>

<div>
    Manual Setup:

    <div class="columns margins">
      <div>
        <Textfield>
          <Input bind:value={valueManualA} id="input-manual-a" aria-controls="helper-text-manual-a" aria-describedby="helper-text-manual-a" />
          <FloatingLabel for="input-manual-a">Standard</FloatingLabel>
          <LineRipple />
        </Textfield>
        <HelperText id="helper-text-manual-a">Helper Text</HelperText>

        <pre class="status">Value: {valueManualA}</pre>
      </div>
      <div>
        <Textfield variant="filled">
          <Input bind:value={valueManualB} id="input-manual-b" aria-controls="helper-text-manual-b" aria-describedby="helper-text-manual-b" />
          <FloatingLabel for="input-manual-b">Filled</FloatingLabel>
          <LineRipple />
        </Textfield>
        <HelperText id="helper-text-manual-b">Helper Text</HelperText>

        <pre class="status">Value: {valueManualB}</pre>
      </div>
      <div>
        <Textfield variant="outlined" withLeadingIcon>
          <Icon class="material-icons">event</Icon>
          <Input bind:value={valueManualC} id="input-manual-c" aria-controls="helper-text-manual-c" aria-describedby="helper-text-manual-c" />
          <NotchedOutline>
            <FloatingLabel for="input-manual-c">Outlined</FloatingLabel>
          </NotchedOutline>
        </Textfield>
        <HelperText id="helper-text-manual-c">Helper Text</HelperText>

        <pre class="status">Value: {valueManualC}</pre>
      </div>
      <div>
        <Textfield textarea>
          <Textarea bind:value={valueManualD} id="input-manual-d" aria-controls="helper-text-manual-d" aria-describedby="helper-text-manual-d" />
          <NotchedOutline>
            <FloatingLabel for="input-manual-d">Textarea</FloatingLabel>
          </NotchedOutline>
        </Textfield>
        <HelperText id="helper-text-manual-d">Helper Text</HelperText>

        <pre class="status">Value: {valueManualD}</pre>
      </div>
    </div>
  </div>