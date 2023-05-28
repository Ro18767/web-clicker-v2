<script>
  import { localStorageWriteble } from "$lib/store/localStorageStore.js";
  import { gameStatisticStore } from './Statistics/GameStatistics.js';
  let value = localStorageWriteble("Balance.coins", 0);
  let maxValue = gameStatisticStore("Max Coins", "maxCoinCount", 0);

  $: if ($value > $maxValue) $maxValue = $value;
</script>

<div class="Balance">
  <span class="display">
    {$value} coin
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
