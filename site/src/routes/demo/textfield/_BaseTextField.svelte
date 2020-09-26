<script lang="ts">
  import {
    Textfield2 as Textfield,
    Icon,
    HelperText,
    TextFieldVariant,
    CharacterCounter,
  } from "@smui/textfield";
  import { Fragment } from "@smui/common/components";
  import classes from "./index.module.scss";
  import "./index.scss";

  export let variant: TextFieldVariant;
  export let textFieldClass: string = "";
  export let title: string;

  let valueA = "";
  let valueB = "";
  let valueC = "";
  let valueD = "";
  let valueE = "";
  let valueF = "";
  let valueG = "";
  let valueH = "";
  let valueI = "";
  let valueK = "";
</script>

<div>
  {title}:

  <div class="{classes.columns} {classes.margins}">
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        bind:value={valueA}
        label="Label"
        input$aria-controls="helper-text-filled-a"
        input$aria-describedby="helper-text-filled-a">
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueA}</pre>
    </div>
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        bind:value={valueB}
        label="Leading Icon"
        input$aria-controls="helper-text-filled-b"
        input$aria-describedby="helper-text-filled-b">
        <Icon class="material-icons" position="leading">event</Icon>
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueB}</pre>
    </div>
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        bind:value={valueC}
        label="Trailing Icon"
        input$aria-controls="helper-text-filled-c"
        input$aria-describedby="helper-text-filled-c">
        <Icon class="material-icons" position="trailing">delete</Icon>
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueC}</pre>
    </div>
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        customValidation={() => false}
        bind:value={valueD}
        label="Invalid">
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueD}</pre>
    </div>
    <div>
      <Textfield class={textFieldClass} {variant} disabled label="Disabled">
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>
    </div>
    <div>
      <!-- due to a bug on MDC, label is not visible when variant is "filled" -->
      <Textfield
        class="dense-text-field--{variant} {textFieldClass}"
        {variant}
        bind:value={valueE}
        label="Dense">
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueE}</pre>
    </div>
    <!-- Too broken MDC side <div>
      <Textfield
        class="dense-text-field--{variant}--with-leading-icon {textFieldClass}"
        {variant}
        bind:value={valueF}
        label="Dense Leading Icon">
        <Icon position="leading" class="material-icons">event</Icon>
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>
  
      <pre class="status">Value: {valueF}</pre>
    </div> -->
    <div>
      <Textfield class={textFieldClass} {variant} bind:value={valueG} />

      <pre class="status">Value: {valueG}</pre>
    </div>
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        bind:value={valueH}
        label="Persistent Helper Text">
        <div slot="helperText">
          <Fragment isSlot>
            <HelperText persistent>Helper Text</HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueH}</pre>
    </div>
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        bind:value={valueI}
        label="Standard"
        maxLength={18}>
        <div slot="helperText">
          <Fragment>
            <HelperText>
              Helper Text <span slot="character-counter">
                <CharacterCounter>0 / 18</CharacterCounter>
              </span>
            </HelperText>
          </Fragment>
        </div>
      </Textfield>

      <pre class="status">Value: {valueI}</pre>
    </div>
    <div>
      <Textfield
        class={textFieldClass}
        {variant}
        bind:value={valueK}
        label="Standard">
        <Icon position="leading" class="material-icons">event</Icon>
        <Icon position="trailing" class="material-icons">delete</Icon>
      </Textfield>

      <pre class="status">Value: {valueK}</pre>
    </div>
  </div>
</div>
