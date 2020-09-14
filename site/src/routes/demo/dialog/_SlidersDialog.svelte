<script lang="ts">
  import { Dialog, Title, Content, Actions, InitialFocus } from "@smui/dialog";
  import { Button, Label } from "@smui/button";
  import { Slider } from "@smui/slider";
  import { FormField } from "@smui/form-field";

  let sliderDialog;
  let volumeMedia = 100;
  let volumeRingtone = 80;
  let volumeAlarm = 80;
</script>

<div>
  A dialog with sliders: <br />

  <Dialog
    bind:this={sliderDialog}
    aria-labelledby="slider-title"
    aria-describedby="slider-content">
    <Title id="slider-title">Volumes</Title>
    <Content id="slider-content">
      <div>
        <FormField align="end" style="display: flex; flex-direction: column;">
          <Slider bind:value={volumeMedia} use={[InitialFocus]} />
          <span slot="label">Media Volume</span>
        </FormField>
      </div>
      <div>
        <FormField align="end" style="display: flex; flex-direction: column;">
          <Slider bind:value={volumeRingtone} />
          <span slot="label">Ringtone Volume</span>
        </FormField>
      </div>
      <div>
        <FormField align="end" style="display: flex; flex-direction: column;">
          <Slider bind:value={volumeAlarm} />
          <span slot="label">Alarm Volume</span>
        </FormField>
      </div>
    </Content>
    <Actions>
      <Button action="accept">
        <Label>Done</Label>
      </Button>
    </Actions>
  </Dialog>

  <Button on:click={() => sliderDialog.doOpen()}>
    <Label>Open Dialog</Label>
  </Button>
</div>
