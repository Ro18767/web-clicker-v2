<script context="module">
  import { page } from "$app/stores";
  import { localStorageWriteble } from "../store/localStorageStore.js";
  import { enabled as musicEnabled } from "./music.js";

  const sfxEnabled = localStorageWriteble("AudioSetting.sfx.enabled", true);
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
