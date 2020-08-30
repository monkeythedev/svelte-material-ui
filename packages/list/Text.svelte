<script lang="ts">
  let className = "";
  export { className as class };
  export let style = "";
</script>

<span class="mdc-list-item__text {className}" {style}>
  <slot />
</span>
