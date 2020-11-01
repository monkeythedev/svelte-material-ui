<script lang="ts">
  import {ImageList, Item, ImageAspectContainer, Image, Supporting, Label} from '@smui/core/image-list';
  import './image-list.scss';
</script>

<div>
  4x5 aspect ratio, with text protection:

  <ImageList class="text-protection-image-list" withTextProtection>
    {#each Array(15) as _unused, i}
      <Item>
        <ImageAspectContainer>
          <Image src="https://via.placeholder.com/190x238.png?text=4x5" alt="Image {i + 1}" />
        </ImageAspectContainer>
        <Supporting>
          <Label>Image {i + 1}</Label>
        </Supporting>
      </Item>
    {/each}
  </ImageList>
</div>