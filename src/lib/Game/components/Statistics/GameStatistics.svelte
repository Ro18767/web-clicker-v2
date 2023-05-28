<script>
  import GameStatistic from "./GameStatistic.svelte";
  import { statistics } from "./GameStatistics.js";
</script>

<div class="GameStatistics">
  {#each $statistics as { title, store }}
    <GameStatistic {title} {store} />
  {/each}
</div>

<style>
  .GameStatistics {
    grid-area: GameStatistics;
  }
  .GameStatistics {
    overflow: auto;

    display: flex;
    gap: 1em;
    flex-direction: column;
  }
</style>
