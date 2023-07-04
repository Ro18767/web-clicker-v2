<script context="module">
  import { derived, writable } from "svelte/store";

  let DPC = 0;
  let DPS = 0;
  export function getDPC() {
    return DPC;
  }
  export function getDPS() {
    return DPS;
  }
  const initialUpgradeInfoArr = /** @type {const} */ ([
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
  ]);
  /** @typedef {initialUpgradeInfoArr[number]} upgradeInfo */

  let upgradeInfoArr = /** @type {upgradeInfo[]} */ (
    JSON.parse(JSON.stringify(initialUpgradeInfoArr))
  );
</script>

<script>
  import Hero from "./Hero.svelte";
  import { onMount } from "svelte";
  import { localStorageWriteble } from "$lib/store/localStorageStore.js";

  let lvlArr = derived(
    upgradeInfoArr.map(({ code, lvl }, index) => {
      let store = localStorageWriteble(
        `Store.${code}.lvl`,
        /** @type {number} */ (lvl)
      );
      store.update((lvl) => Math.max(initialUpgradeInfoArr[index].lvl, lvl));
      return store;
    }),
    (lvlArr) => {
      DPC = 0;
      DPS = 0;
      for (let i = 0; i < upgradeInfoArr.length; i++) {
        const upgradeInfo = upgradeInfoArr[i];
        DPC += upgradeInfo.baseDPC * lvlArr[i];
        DPS += upgradeInfo.baseDPS * lvlArr[i];
      }
      upgradeInfoArr = upgradeInfoArr;
    }
  );
  $: $lvlArr;
</script>

<div class="Store">
  <div class="upgrades">
    {#each upgradeInfoArr as upgradeInfo, i (i)}
      <Hero {upgradeInfo} />
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
</style>
