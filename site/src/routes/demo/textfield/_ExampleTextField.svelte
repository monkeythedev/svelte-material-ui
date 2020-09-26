<script lang="ts">
  import { Textfield2, Icon, HelperText } from "@smui/textfield";
  import classes from "./index.module.scss";

  let valueClickable = "";
  let dirtyClickable = false;
  let invalidClickable = false;

  function clickableHandler() {
    alert(`Sending to ${valueClickable}!`);
    valueClickable = "";
    dirtyClickable = false;
  }
</script>

<div>
  <div class={classes.margins}>
    <!--
      Notice that when you bind to `invalid`, but you only want to monitor it
      instead of updating it yourself, you also should include
      `updateInvalid`.
    -->
    <Textfield2
      type="email"
      withTrailingIcon={valueClickable !== ''}
      bind:dirty={dirtyClickable}
      bind:invalid={invalidClickable}
      updateInvalid
      bind:value={valueClickable}
      label="To"
      style="min-width: 250px;"
      autocomplete="email">
      {#if valueClickable !== '' && dirtyClickable && !invalidClickable}
        <Icon
          class="material-icons"
          role="button"
          on:click={clickableHandler}
          position="trailing">
          send
        </Icon>
      {/if}
    </Textfield2>
    <HelperText validationMsg>That's not a valid email address.</HelperText>
  </div>

  <pre class="status">Dirty: {dirtyClickable}, Invalid: {invalidClickable}</pre>
</div>
