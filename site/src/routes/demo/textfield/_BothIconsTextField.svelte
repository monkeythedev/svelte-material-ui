
<script lang="ts">
  import {Textfield, Icon} from '@smui/textfield';
  
  let valueIconsA = '';
  let valueIconsB = '';
  let valueIconsC = '';
</script>

<div>
  Both icons:

  <div class="columns margins">
    <div>
      <Textfield withLeadingIcon withTrailingIcon bind:value={valueIconsA} label="Standard">
        <Icon class="material-icons">event</Icon>
        <Icon class="material-icons">delete</Icon>
      </Textfield>

      <pre class="status">Value: {valueIconsA}</pre>
    </div>
    <div>
      <Textfield variant="filled" withLeadingIcon withTrailingIcon bind:value={valueIconsB} label="Filled">
        <Icon class="material-icons">event</Icon>
        <Icon class="material-icons">delete</Icon>
      </Textfield>

      <pre class="status">Value: {valueIconsB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" withLeadingIcon withTrailingIcon bind:value={valueIconsC} label="Outlined">
        <Icon class="material-icons">event</Icon>
        <Icon class="material-icons">delete</Icon>
      </Textfield>

      <pre class="status">Value: {valueIconsC}</pre>
    </div>
  </div>
</div>