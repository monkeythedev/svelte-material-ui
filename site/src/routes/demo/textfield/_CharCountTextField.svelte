
<script lang="ts">
  import {Textfield, HelperText, CharacterCounter} from '@smui/textfield';
  
  let valueCharCountA = '';
  let valueCharCountB = '';
  let valueCharCountC = '';
</script>

<div>
  With character count:

  <div class="columns margins">
    <div>
      <Textfield bind:value={valueCharCountA} label="Standard" input$maxlength="18" input$aria-controls="helper-text-char-count-a" input$aria-describedby="helper-text-char-count-a" />
      <HelperText id="helper-text-char-count-a">Helper Text<span slot="character-counter"><CharacterCounter>0 / 18</CharacterCounter></span></HelperText>

      <pre class="status">Value: {valueCharCountA}</pre>
    </div>
    <div>
      <Textfield variant="filled" bind:value={valueCharCountB} label="Filled" input$maxlength="18" input$aria-controls="helper-text-char-count-b" input$aria-describedby="helper-text-char-count-b" />
      <HelperText id="helper-text-char-count-b">Helper Text<span slot="character-counter"><CharacterCounter>0 / 18</CharacterCounter></span></HelperText>

      <pre class="status">Value: {valueCharCountB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" bind:value={valueCharCountC} label="Outlined" input$maxlength="18" input$aria-controls="helper-text-char-count-c" input$aria-describedby="helper-text-char-count-c" />
      <HelperText id="helper-text-char-count-c">Helper Text<span slot="character-counter"><CharacterCounter>0 / 18</CharacterCounter></span></HelperText>

      <pre class="status">Value: {valueCharCountC}</pre>
    </div>
  </div>
</div>