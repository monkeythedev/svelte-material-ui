<script lang="ts">
  import CodeSelector from "./CodeSelector.svelte";
  import { StringListToFilter, filterStringList } from "@smui/common/functions";
  import { stripIndent } from "common-tags";

  let svelteCode: string;
  let scssCode: string;

  export function svelte(
    renderer: () => {
      tag: string;
      props: StringListToFilter;
      content: string;
    }
  ) {
    const { tag, props, content } = renderer();
    const filteredProps = filterStringList(props) || [];

    const propsIntend = `
				`.substr(1);
    let parsedProps = filteredProps.join(" \n" + propsIntend);
    if (parsedProps.length > 0) parsedProps = " " + parsedProps;

    svelteCode = stripIndent`
			<${tag}${parsedProps}>
				${content}
			</${tag}>
		`;
    return svelteCode;
  }

  export function scss(
    renderer: () => {
      content: string;
    }
  ) {
    const { content } = renderer();
    scssCode = stripIndent(content);
  }
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
      "code options-sidebar"
      / 1fr minmax(200px, min-content);
    white-space: normal;
    border: $border;

    .preview {
      grid-area: preview;
      padding: $padding;
      background-color: #efefef;
      border-right: $border;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .preview-slot {
        flex-grow: 1;
        align-items: center;
        display: flex;
      }

      .values {
        display: flex;
        align-self: flex-end;
      }
    }

    .options-sidebar {
      grid-area: options-sidebar;
      padding: $padding;

      > :global(.options-sidebar) {
        display: grid;
        grid-template: auto;
        gap: 0.6em;

        > :global(div) {
          display: flex;
					flex-direction: column;
					justify-content: center;
				}
      }
    }

    .code {
      grid-area: code;
      min-width: 0;
      min-height: 0;
      overflow: auto;

      :global(pre) {
        white-space: break-spaces;
      }
    }
  }
</style>

<div class="configurator">
  <div class="preview">
    <div class="preview-slot">
      <slot name="preview" />
    </div>
    {#if $$slots.values}
      <div class="values">
        <slot name="values" />
      </div>
    {/if}
  </div>
  <div class="options-sidebar">
    <slot name="optionsSidebar" />
  </div>
  <div class="code">
    <CodeSelector svelte={svelteCode} scss={scssCode} />
  </div>
</div>
