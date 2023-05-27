<script context="module">
  import { writable } from "svelte/store";

  let DPC = 0;
  let DPS = 0;
  export function getDPC() {
    return DPC;
  }
  export function getDPS() {
    return DPS;
  }
  const upgradeInfoArr = [
    {
      name: "Damage Per Click",
      code: "hero.click.0",
      basePrice: 5,
      baseDPC: 1,
      baseDPS: 0,
      lvl: 1,
    },
    {
      name: "Damage Per Second 1",
      code: "hero.dps.0",
      basePrice: 50,
      baseDPC: 0,
      baseDPS: 5,
      lvl: 0,
    },
    {
      name: "Damage Per Second 2",
      code: "hero.dps.1",
      basePrice: 250,
      baseDPC: 0,
      baseDPS: 22,
      lvl: 0,
    },
    {
      name: "Damage Per Second 3",
      code: "hero.dps.2",
      basePrice: 1000,
      baseDPC: 0,
      baseDPS: 74,
      lvl: 0,
    },
  ];
  const upgradeInfoArrWritable = writable(upgradeInfoArr);
  /** @typedef {typeof upgradeInfoArrWritable} upgradeInfoArrWritable */
  /**
   * @param {upgradeInfoArrWritable} upgradeInfoArrStore
   */
  function updateDamage(upgradeInfoArrStore) {
    DPC = 0;
    DPS = 0;
    upgradeInfoArrStore.update(() => {
      upgradeInfoArr.forEach((upgradeInfo) => {
        let lvl = upgradeInfo.lvl;
        DPC += upgradeInfo.baseDPC * lvl;
        DPS += upgradeInfo.baseDPS * lvl;
      });
      return upgradeInfoArr;
    });
    return upgradeInfoArr;
  }
  function priceCalculator(basePrice = 0, lvl = 0) {
    return Math.floor(basePrice * Math.pow(1.07, lvl));
  }
</script>

<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";
  import { onMount } from "svelte";
  let coinCount = 0;
  onMount(() => {
    upgradeInfoArrWritable.set(updateDamage(upgradeInfoArrWritable));
  });
</script>

<div class="Store">
  <LocalStorage code="Balance.coins" bind:value={coinCount} />
  <div class="upgrades">
    {#each $upgradeInfoArrWritable as { name, code, basePrice, baseDPC, baseDPS, lvl }, i (i)}
      <LocalStorage code="Store.{code}.lvl" bind:value={lvl} />
      <div class="upgrade">
        <button
          on:click={() => {
            let price = priceCalculator(basePrice, lvl);
            if (price > coinCount) return;
            $upgradeInfoArrWritable[i].lvl++;
            coinCount -= price;
            updateDamage(upgradeInfoArrWritable);
          }}>{priceCalculator(basePrice, lvl)} coin</button
        >
        <span>lvl {lvl}. {name}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .Store {
    grid-area: Store;
  }
  .Store {
    overflow: auto;
  }

  .Store .upgrades {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .Store .upgrade {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    flex-wrap: wrap;
  }

  .Store .upgrade button {
    appearance: none;
    border-width: 1px;
  }
</style>
