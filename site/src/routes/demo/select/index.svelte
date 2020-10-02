<script>
  import "./index.scss";
  import BaseSelect from "./_BaseSelect.svelte";

  let fruits = ["Apple", "Orange", "Banana", "Mango"];
</script>

<svelte:head>
  <title>Select - SMUI</title>
</svelte:head>

<section> 
  <h2>Select</h2>

  <BaseSelect options={fruits} />
  <BaseSelect options={fruits} variant="outlined" />
  <BaseSelect class="shaped" options={fruits} />
  <BaseSelect class="shaped-outlined" options={fruits} variant="outlined" />
</section>
