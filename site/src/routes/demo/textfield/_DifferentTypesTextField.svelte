
 
<script lang="ts">
  import {Textfield} from '@smui/textfield';

  let valueTypeNumber = 0;
  let valueTypeNumberStep = 0;
  let valueTypeDate = '';
  let valueTypeFiles = [];

  function handleFiles() {
    alert('Selected '+valueTypeFiles.length+' file(s).');
  }
</script>

 <div>
    Different Types:

    <div class="columns margins">
      <div>
        <Textfield bind:value={valueTypeNumber} label="Number" type="number" />
      </div>

      <div>
        <Textfield bind:value={valueTypeNumberStep} label="Number with Step" type="number" input$step="2" />
      </div>

      <div>
        <Textfield bind:value={valueTypeDate} label="DateTime-Local" type="datetime-local" />
      </div>

      <div>
        <Textfield bind:files={valueTypeFiles} label="File" type="file" on:change={handleFiles} />
      </div>
    </div>
  </div>