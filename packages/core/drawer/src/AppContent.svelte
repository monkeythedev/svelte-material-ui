<script lang="ts">
  let className = "";
  export { className as class };
  export let style = "";
</script>

<div class="mdc-drawer-app-content {className}" {style}>
  <slot />
</div>