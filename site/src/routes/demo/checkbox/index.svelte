<script>
  import {Button} from '@smui/button';
  import AdvancedGroupCheckbox from './_AdvancedGroupCheckbox.svelte';
  import BaseCheckbox from './_BaseCheckbox.svelte';
  import CheckboxGroup from './_CheckboxGroup.svelte';
</script>

<svelte:head>
  <title>Checkbox - SMUI</title>
</svelte:head>

<section>
  <h2>Checkbox</h2>

  <BaseCheckbox></BaseCheckbox>
  <CheckboxGroup></CheckboxGroup>
  <AdvancedGroupCheckbox></AdvancedGroupCheckbox>
</section>