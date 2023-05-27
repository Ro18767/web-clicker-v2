<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";
  import GameStatistic from "./Statistics/GameStatistic.svelte";
  let value = 0;
  let maxValue = 0;

  $: if (value > maxValue) maxValue = value;
</script>

<GameStatistic title="Max Coins" code="maxCoinCount" bind:value={maxValue} />
<LocalStorage code="Balance.coins" bind:value />
<div class="Balance">
  <span class="display">
    {value} coin
  </span>
</div>

<style>
  .Balance {
    grid-area: Balance;
  }
  .Balance {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .display {
    font-size: 2.5em;
  }
</style>
