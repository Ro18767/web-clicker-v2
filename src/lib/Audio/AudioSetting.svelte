<script context="module">
  import { enabled as musicEnabled } from "./music.js";
  import { enabled as sfxEnabled } from "./sfx.js";

</script>

<div class="AudioSetting">
  <label>
    music:<input type="checkbox" bind:checked={$musicEnabled} />
  </label>
  <label>
    sfx:<input type="checkbox" bind:checked={$sfxEnabled} />
  </label>
</div>

<style>
  .AudioSetting {
    grid-area: AudioSetting;
  }
  .AudioSetting {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  }
</style>
