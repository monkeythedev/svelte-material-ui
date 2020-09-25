
<script lang="ts">
  import {Textfield, HelperText} from '@smui/textfield';
  import CharacterCounter from '@smui/textfield/character-counter/index';
  
  let valueTextarea = '';
  let valueTextareaCharCount = '';
  let valueFullwidthTextarea = '';
</script>

<div>
  Textarea:

  <div class="margins">
    <Textfield textarea bind:value={valueTextarea} label="Label" input$aria-controls="helper-text-textarea" input$aria-describedby="helper-text-textarea" />
    <HelperText id="helper-text-textarea">Helper Text</HelperText>
  </div>
</div>

<div>
  Textarea with Character Count:

  <div class="margins">
    <Textfield textarea input$maxlength="100" bind:value={valueTextareaCharCount} label="Label">
      <CharacterCounter>0 / 100</CharacterCounter>
    </Textfield>
  </div>
</div>

<div>
  Full Width Textarea:

  <div class="margins">
    <Textfield fullwidth textarea bind:value={valueFullwidthTextarea} label="Label" input$aria-controls="helper-text-fullwidth-textarea" input$aria-describedby="helper-text-fullwidth-textarea" />
    <HelperText id="helper-text-fullwidth-textarea">Helper Text</HelperText>
  </div>
</div>
