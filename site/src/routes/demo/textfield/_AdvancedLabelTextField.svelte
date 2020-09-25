<script lang="ts">
  import { Textfield } from "@smui/textfield";
  import { Icon } from "@smui/common";

  let valueElementsLabel = "";
</script>

<div>
  Elements in the Label:

  <div class="margins">
    <Textfield bind:value={valueElementsLabel} label="" type="email">
      <span slot="label"><Icon
          class="material-icons"
          style="font-size: 1em; line-height: normal; vertical-align: middle;">
          email
        </Icon>
        Email</span>
    </Textfield>
  </div>
</div>
