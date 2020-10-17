<script lang="ts">
  import CodeSelector from "./CodeSelector.svelte";

  export let svelte: string;
  export let scss: string;
</script>

<style lang="scss">
  @use "src/styles/smui/_variables";

  .configurator {
    $border: variables.$border-color 1px solid;
    $padding: 1em;
    max-width: 80em;
    display: grid;
    grid-template:
      "preview options-sidebar"
      / 1fr minmax(200px, min-content);
    border: $border;

    .preview {
      grid-area: preview;
      padding: $padding;
      background-color: #efefef;
      border-right: $border;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .options-sidebar {
      grid-area: options-sidebar;
      padding: $padding;
    }
  }
</style>

<div class="configurator">
  <div class="preview">
    <slot name="preview" />
  </div>
  <div class="options-sidebar">
    <slot name="options-sidebar" />
  </div>
  <div class="code">
    <CodeSelector {svelte} {scss}></CodeSelector>
  </div>
</div>
