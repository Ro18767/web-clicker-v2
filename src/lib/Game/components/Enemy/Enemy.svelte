<script>
  import { getImageDead, getImageAlive } from "./image.js";
  import { localStorageWriteble } from "$lib/store/localStorageStore.js";
  import { playDamage } from "$lib/Audio/sfx.js";
  import { getDPC, getDPS } from "../Store/Store.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { gameStatisticStore } from "../Statistics/GameStatistics.js";

  export let maxLvl = localStorageWriteble("Game.maxLvl", 0);
  export let lvl = localStorageWriteble("Game.lvl", 0);
  export let hp = 10;
  export let fullHp = 10;
  let name = "Slime";

  $: hp = fullHp;
  $: fullHp = Math.round(10 * ($lvl + Math.pow(1.55, $lvl)));

  function click() {
    if (isDead()) return;

    $clickCount++;
    dealDamage(getDPC());
    playDamage();
  }
  function dealDamage(damage = 0) {
    hp -= damage;
    hp = Math.max(hp, 0);
  }

  function isDead() {
    return hp <= 0;
  }

  /** @type {number?}*/
  let deadtime;
  /**
   * @param {DOMHighResTimeStamp} currentTime
   */
  function updateEnemy(currentTime) {
    if (deadtime == null) return;
    if (currentTime - deadtime < 1000) return;

    deadtime = null;
    hp = fullHp;
  }

  let coinCount = localStorageWriteble("Balance.coins", 0);
  let clickCount = gameStatisticStore("Clicks", "clicks", 0);
  let killCount = gameStatisticStore("Kills", "kills", 0);

  let lastUpdateTime = 0;
  /** @type {string?} */
  let src = null;
  let alt = "";
  let alive = true;
  $: alive = hp > 0;
  $: {
    if (alive) {
      src = getImageAlive();
      alt = name;
    }
    if (!alive) {
      src = getImageDead();
      alt = `Dead ${name}`;
    }
  }
  /** @type {number} */
  let rid;
  function update(currentTime = 0) {
    rid = requestAnimationFrame(update);
    let daltaTime = currentTime - lastUpdateTime;
    lastUpdateTime = currentTime;

    DPS: {
      if (isDead()) break DPS;
      dealDamage((getDPS() * daltaTime) / 1000);
    }
    deadCheck: {
      if (!isDead()) break deadCheck;

      if (deadtime != null) break deadCheck;
      $killCount++;
      deadtime = currentTime;
      $coinCount += Math.ceil(fullHp / 3);
      if ($lvl === $maxLvl) $maxLvl++;
    }
    updateEnemy(currentTime);
  }

  onMount(() => {
    rid = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rid);
  });
</script>

<button class="Enemy" on:click={click}>
  <span>{$lvl + 1} lvl.</span>
  <div class="image">
    {#if browser}
      <img {src} {alt} />
    {/if}
  </div>
  <span>{Math.ceil(hp)}/{fullHp}</span>
</button>

<style>
  .Enemy {
    grid-area: Enemy;
  }
  .Enemy {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
  }
  .image {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .image > img {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: contain;
  }
  span {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
