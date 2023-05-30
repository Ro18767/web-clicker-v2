<script>
  import { base } from '$app/paths';
  import AudioSetting from "$lib/Audio/AudioSetting.svelte";
</script>

<div class="Menu">
  <a class="play-btn" href="{base}/game">PLAY</a>
  <AudioSetting />
</div>

<style>
  .Menu {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    position: relative;
  }
  .play-btn {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    position: relative;
  }
</style>
