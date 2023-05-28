<script>
  import { localStorageWriteble } from "$lib/store/localStorageStore.js";

  /** @type {import('./Store.svelte').upgradeInfo} */
  export let upgradeInfo;

  let coinCount = localStorageWriteble("Balance.coins", 0);

  const { name, code, basePrice } = upgradeInfo;
  let lvl = localStorageWriteble(
    `Store.${code}.lvl`,
    /** @type {number} */ (upgradeInfo.lvl)
  );

  function priceCalculator(basePrice = 0, lvl = 0) {
    return Math.floor(basePrice * Math.pow(1.07, lvl));
  }
</script>

<div class="upgrade">
  <button
    on:click={() => {
      let price = priceCalculator(basePrice, $lvl);
      if (price > $coinCount) return;
      $lvl++;
      $coinCount -= price;
    }}>{priceCalculator(basePrice, $lvl)} coin</button
  >
  <span>lvl {$lvl}. {name}</span>
</div>

<style>
  .upgrade {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    flex-wrap: wrap;
  }

  .upgrade button {
    appearance: none;
    border-width: 1px;
  }
</style>
