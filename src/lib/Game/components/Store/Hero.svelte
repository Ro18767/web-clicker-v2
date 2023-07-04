<script>
  import { disableScrollHandling } from "$app/navigation";
  import { localStorageWriteble } from "$lib/store/localStorageStore.js";
  import { getImageHero } from "./image.js";

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
  $: price = priceCalculator(basePrice, $lvl);
</script>

<div class="upgrade">
  <button
    class:disabled={price > $coinCount}
    on:click={() => {
      if (price > $coinCount) return;
      $lvl++;
      $coinCount -= price;
    }}>{price} coin</button
  >
  <span>lvl {$lvl}. {name}</span>
  <img src={getImageHero(code)} alt={name} />
</div>

<style>
  .upgrade {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    flex-wrap: wrap;
    align-items: center;
  }

  .upgrade button {
    appearance: none;
    border-width: 1px;
    height: 2em;
  }
  .upgrade button.disabled {
    background-color: #ffffff30;
  }
  img {
    width: 4em;
    height: 4em;
  }
</style>
