<script>
  import Game from "$lib/Game/Game.svelte";
  import Menu from "$lib/Menu/Menu.svelte";
</script>

<Menu />

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
      "AudioSetting SaveSetting";
    grid-template-columns: 50% 50%;
    grid-template-rows: auto 1fr 1fr auto;

    position: relative;
  }

</style>