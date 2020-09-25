
<script lang="ts">
  import {Textfield} from '@smui/textfield';
  
  let valueNoLabelA = '';
  let valueNoLabelB = '';
  let valueNoLabelC = '';
</script>

<div>
  Without label or helper text:

  <div class="columns margins">
    <div>
      <Textfield bind:value={valueNoLabelA} />

      <pre class="status">Value: {valueNoLabelA}</pre>
    </div>
    <div>
      <Textfield variant="filled" bind:value={valueNoLabelB} />

      <pre class="status">Value: {valueNoLabelB}</pre>
    </div>
    <div>
      <Textfield variant="outlined" bind:value={valueNoLabelC} />

      <pre class="status">Value: {valueNoLabelC}</pre>
    </div>
  </div>
</div>