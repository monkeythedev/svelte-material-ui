<script lang="ts">
  let className = "";
  export { className as class };
  export let style = "";
</script>

<div class={className} {style}>
  <slot />
</div>;
