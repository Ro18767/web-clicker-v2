<script>
  import Balance from "./components/Balance.svelte";
  import AudioSetting from "./components/AudioSetting.svelte";
  import Enemy from "./components/Enemy.svelte";
  import LevelSelector from "./components/LevelSelector.svelte";
  import SaveSetting from "./components/SaveSetting.svelte";
  import GameStatistics from "./components/Statistics/GameStatistics.svelte";
  import Store from "./components/Store/Store.svelte";
</script>

<div class="Game">
  <Balance />
  <LevelSelector />
  <Store />
  <SaveSetting />
  <GameStatistics />
  <Enemy />
  <AudioSetting />
  <SaveSetting />
</div>

<style>
  .Game {
    --color-main: #333333;
    --color-text: #ffffff;

    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-areas:
      "Balance LevelSelector"
      "Store Enemy"
      "GameStatistics Enemy"
      "AudioSetting SaveSetting";
    grid-template-columns: 50% 50%;
    grid-template-rows: auto 1fr 1fr auto;

    position: relative;
  }

  .Game > :global(*) {
    box-shadow: 0 0 0 1px;
    padding: 0.5em;
  }
</style>
