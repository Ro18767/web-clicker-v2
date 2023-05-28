<script context="module">
  import { get, writable } from "svelte/store";

  let DPC = 0;
  let DPS = 0;
  export function getDPC() {
    return DPC;
  }
  export function getDPS() {
    return DPS;
  }
  const upgradeInfoArr = /** @type {const} */ ([
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
  /** @typedef {upgradeInfoArr[number]} upgradeInfo */

  const upgradeInfoArrWritable = writable(upgradeInfoArr);
</script>

<script>
  import Hero from "./Hero.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    upgradeInfoArrWritable.set(JSON.parse(JSON.stringify(upgradeInfoArr)));
  });
  $: {
    DPC = 0;
    DPS = 0;
    $upgradeInfoArrWritable.forEach((upgradeInfo) => {
      let lvl = upgradeInfo.lvl;
      DPC += upgradeInfo.baseDPC * lvl;
      DPS += upgradeInfo.baseDPS * lvl;
    });
  }
</script>

<div class="Store">
  <div class="upgrades">
    {#each $upgradeInfoArrWritable as upgradeInfo, i (i)}
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
