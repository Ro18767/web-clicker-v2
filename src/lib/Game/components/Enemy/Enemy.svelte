<script>
  import { getImageDead, getImageAlive } from "./image.js";
  import LocalStorage from "$lib/store/LocalStorage.svelte";
  import GameStatistic from "../Statistics/GameStatistic.svelte";
  import { playDamage } from "../AudioSetting.svelte";
  import { getDPC, getDPS } from "../Store/Store.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let maxLvl = 0;
  export let lvl = maxLvl;
  export let hp = 10;
  export let fullHp = 10;
  let name = "Slime";

  $: hp = fullHp;
  $: fullHp = Math.round(10 * (lvl + Math.pow(1.55, lvl)));

  function click() {
    if (isDead()) return;

    clickCount++;
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

  let coinCount = 0;
  let clickCount = 0;
  let killCount = 0;

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
  onMount(() => {
    let rid = requestAnimationFrame(function update(currentTime) {
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
        killCount++;
        deadtime = currentTime;
        coinCount += Math.ceil(fullHp / 3);
        if (lvl === maxLvl) maxLvl++;
      }
      updateEnemy(currentTime);
    });
    return () => cancelAnimationFrame(rid);
  });
</script>

<LocalStorage code="Balance.coins" bind:value={coinCount} />
<LocalStorage code="Game.maxLvl" bind:value={maxLvl} />
<LocalStorage code="Game.lvl" bind:value={lvl} />
<GameStatistic title="Clicks" code="clicks" bind:value={clickCount} />
<GameStatistic title="Kills" code="kills" bind:value={killCount} />
<button class="Enemy" on:click={click}>
  <span>{lvl + 1} lvl.</span>
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
