
<script lang="ts">
  import {Textfield, Icon, HelperText} from '@smui/textfield';

  let valueClickable = '';
  let dirtyClickable = false;
  let invalidClickable = false;

  function clickableHandler() {
    alert(`Sending to ${valueClickable}!`);
    valueClickable = '';
    dirtyClickable = false;
  }
</script>

<style>
  .margins {
    margin: 18px 0 24px;
  }

  .columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .columns > * {
    flex-basis: 0;
    min-width: 218px;
  }

  .columns :global(.mdc-text-field) {
    width: 218px;
  }

  .columns .status {
    width: auto;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  * :global(.shaped) {
    border-radius: 16px 16px 0 0;
  }

  * :global(.shaped-outlined .mdc-text-field__input) {
    padding-left: 32px;
    padding-right: 32px;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
    border-radius: 28px 0 0 28px;
    width: 28px;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
    border-radius: 0 28px 28px 0;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
    max-width: calc(100% - 28px * 2);
  }
  * :global(.shaped-outlined + .mdc-text-field-helper-line) {
    padding-left: 32px;
    padding-right: 28px;
  }
</style>

<svelte:head>
  <title>Text Field - SMUI</title>
</svelte:head>

<section>
  <h2>Text Field</h2>

  <div>
    <div class="margins">
      <!--
        Notice that when you bind to `invalid`, but you only want to monitor it
        instead of updating it yourself, you also should include
        `updateInvalid`.
      -->
      <Textfield type="email" withTrailingIcon={valueClickable !== ''} bind:dirty={dirtyClickable} bind:invalid={invalidClickable} updateInvalid bind:value={valueClickable} label="To" style="min-width: 250px;" input$autocomplete="email">
        {#if valueClickable !== '' && dirtyClickable && !invalidClickable}
          <Icon class="material-icons" role="button" on:click={clickableHandler}>send</Icon>
        {/if}
      </Textfield>
      <HelperText validationMsg>That's not a valid email address.</HelperText>
    </div>

    <pre class="status">Dirty: {dirtyClickable}, Invalid: {invalidClickable}</pre>
  </div>

</section>