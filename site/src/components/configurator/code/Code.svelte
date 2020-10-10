<script lang="ts">
  import Prism from "svelte-prism/src/Prism.svelte";
  import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
  import "./Code.scss";
</script>

<Prism
  language="html"
  transform={(src) => window.Prism.plugins.NormalizeWhitespace.normalize(src)}>
  <slot />
</Prism>
