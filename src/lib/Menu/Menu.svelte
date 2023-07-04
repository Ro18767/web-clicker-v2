<script>
  import { base } from "$app/paths";
  import AudioSetting from "$lib/Audio/AudioSetting.svelte";
  import SaveSetting from '$lib/Game/components/SaveSetting.svelte';
</script>

<div class="Menu">
  <div class="PlayButtonWrap">
    <a class="play-btn" href="{base}/game">PLAY ►</a>
  </div>
  <AudioSetting />
  <SaveSetting />
</div>

<style>
  .Menu > :global(*) {
    padding: 0.5em;
  }
  .Menu {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    grid-template-areas:
      "Play Play"
      "AudioSetting SaveSetting";

    display: grid;
    position: relative;

    grid-template-rows: 1fr auto;
  }
  .PlayButtonWrap {
    display: flex;
    grid-area: Play;
    justify-content: center;
    align-items: center;
  }
  .play-btn {
    padding: 0;
    margin: 0;
    font-size: 4em;
    font-weight: bold;
    position: relative;
  }
</style>
