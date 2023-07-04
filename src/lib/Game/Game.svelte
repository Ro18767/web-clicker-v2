<script>
  import Balance from "./components/Balance.svelte";
  import AudioSetting from "$lib/Audio/AudioSetting.svelte";
  import Enemy from "./components/Enemy/Enemy.svelte";
  import LevelSelector from "./components/LevelSelector.svelte";
  import GameStatistics from "./components/Statistics/GameStatistics.svelte";
  import Store from "./components/Store/Store.svelte";
  import { setContext } from "svelte";
  import { base } from "$app/paths";

  setContext("isInsideGame", true);
</script>

<div class="Game">
  <Balance />
  <LevelSelector />
  <Store />
  <GameStatistics />
  <Enemy />
  <AudioSetting />
  <div class="back-btn-wraper">
    <a class="back-btn" href="{base}/">Back to Menu</a>
  </div>
</div>

<style>
  .Game {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-areas:
      "Balance LevelSelector"
      "Store Enemy"
      "GameStatistics Enemy"
      "AudioSetting BackButton";
    grid-template-columns: 50% 50%;
    grid-template-rows: auto 1fr 1fr auto;

    position: relative;
  }

  .Game > :global(*) {
    box-shadow: 0 0 0 1px;
    padding: 0.5em;
  }
  .back-btn-wraper {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .back-btn {
    float: right;
    grid-area: BackButton;
  }
</style>
