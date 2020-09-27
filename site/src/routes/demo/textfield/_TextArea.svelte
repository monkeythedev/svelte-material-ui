<script lang="ts">
  import { TextArea, HelperText, CharacterCounter } from "@smui/textfield";
  import { Fragment } from "@smui/common/components";
  import classes from "./index.module.scss";

  let valueTextarea = "";
  let valueTextareaCharCount = "";
  let valueFullwidthTextarea = "";
</script>

<div>
  Textarea:

  <div class="{classes.columns} {classes.margins}">
    <div>
      <TextArea
        textarea
        bind:value={valueTextarea}
        label="Standard Text Area"
        input$aria-controls="helper-text-textarea"
        input$aria-describedby="helper-text-textarea">
        <div slot="helperText">
          <Fragment>
            <HelperText id="helper-text-textarea">Helper Text</HelperText>
          </Fragment>
        </div>
      </TextArea>
    </div>
    <div>
      <TextArea
        textarea
        maxLength={100}
        bind:value={valueTextareaCharCount}
        label="Text Area with charaters counter">
        <div slot="helperText">
          <Fragment>
            <HelperText id="helper-text-textarea">
              Helper Text <span slot="character-counter">
                <CharacterCounter>0 / 18</CharacterCounter>
              </span>
            </HelperText>
          </Fragment>
        </div>
      </TextArea>
    </div>
  </div>
</div>

<div>
  Full Width Textarea:

  <div class="margins">
    <TextArea
      fullWidth
      textarea
      bind:value={valueFullwidthTextarea}
      label="Label">
      <div slot="helperText">
        <Fragment>
          <HelperText id="helper-text-fullwidth-textarea">
            Helper Text
          </HelperText>
        </Fragment>
      </div>
    </TextArea>
  </div>
</div>
