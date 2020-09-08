<script lang="ts">
  export let params: string = "";
</script>

<iframe
  class="top-app-bar-iframe"
  src="/demo/top-app-bar/iframe{params ? `?${params}` : ""}"
  title="standard"
  width="480"
  height="320" />
<a style="display: none;" href="/demo/top-app-bar/iframe">helper needed for
  sapper export</a>
