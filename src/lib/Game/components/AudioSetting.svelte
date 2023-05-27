<script context="module">
  import musicSrc from "./../audio/music/Валентин Стрыкало - Так гріє.mp3";
  import dameageSFXSrc from "./../audio/SFX/Damage.wav";
  import { get, writable } from "svelte/store";
  import { browser } from "$app/environment";

  let musicEnabled = writable(true);
  /** @type {HTMLAudioElement?} */
  let music;
  if (browser) {
    music = new Audio(musicSrc);
    music.loop = true;

    musicEnabled.subscribe((enabled) => {
      musicUpdate(enabled);
    });
  }

  let sfxEnabled = writable(true);
  export function playDamage() {
    if (!sfxEnabled) return;
    let sound = new Audio(dameageSFXSrc);
    sound.play();
  }
  async function musicUpdate(enabled = false) {
    try {
      if (enabled) {
        await music?.play();
      }
      if (!enabled) {
        music?.pause();
      }
    } catch (error) {
      console.log({ error });
    }
  }
  /** @type {(() => void)?} */
  let click = function () {
    musicUpdate(get(musicEnabled));
    click = null;
  };
</script>

<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";
  import { onDestroy } from "svelte";
  onDestroy(() => {
    music?.pause();
  });
</script>

<svelte:window on:click|once={click} />
<div class="AudioSetting">
  <LocalStorage code="AudioSetting.music.enabled" bind:value={$musicEnabled} />
  <label>music:<input type="checkbox" bind:checked={$musicEnabled} /></label>
  <LocalStorage code="AudioSetting.sfx.enabled" bind:value={$sfxEnabled} />
  <label>sfx:<input type="checkbox" bind:checked={$sfxEnabled} /></label>
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
