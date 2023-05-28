<script>
  import { localStorageWriteble } from "$lib/store/localStorageStore.js";

  export let maxLvl = localStorageWriteble("Game.maxLvl", 0);
  export let lvl = localStorageWriteble("Game.lvl", 0);
</script>

<div class="LevelSelector">
  <div class="lvls">
    {#each { length: $maxLvl + 1 } as _, i}
      <button on:click={() => ($lvl = i)}>{i + 1}</button>
    {/each}
  </div>
</div>

<style>
  .LevelSelector {
    grid-area: LevelSelector;
  }
  .LevelSelector {
    overflow: auto;
  }
  .LevelSelector .lvls {
    display: inline-flex;
    gap: 0.5em;
  }
  .LevelSelector button {
    width: 4.5em;
    height: 4.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
  }
</style>
