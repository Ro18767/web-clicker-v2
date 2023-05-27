<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";
  import Balance from "./components/Balance.svelte";
  import AudioSetting, { playDamage } from "./components/AudioSetting.svelte";
  import Enemy from "./components/Enemy.svelte";
  import LevelSelector from "./components/LevelSelector.svelte";
  import SaveSetting from "./components/SaveSetting.svelte";
  import GameStatistics from "./components/Statistics/GameStatistics.svelte";
  import GameStatistic from "./components/Statistics/GameStatistic.svelte";
  import Store, { getDPC, getDPS } from "./components/Store/Store.svelte";
  import { onMount } from "svelte";
  let clickCount = 0;
  let killCount = 0;
  /** @type {number} */
  let coinCount = 0;
  

 

  function click() {
    if (isDead()) return;

    clickCount++;
    dealDamage(getDPC());
    playDamage();
  }

  let fullHp = 10;
  let hp = fullHp;
  let maxLvl = 0;
  let lvl = maxLvl;

  function isDead() {
    return hp <= 0;
  }
  function dealDamage(damage = 0) {
    hp -= damage;
    hp = Math.max(hp, 0);
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

  let lastUpdateTime = 0;
  onMount(() => {
    let rid = requestAnimationFrame(function update(currentTime) {
      rid = requestAnimationFrame(update);
      let daltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      DPS: {
        if (isDead()) break DPS;
        dealDamage((getDPS() * daltaTime) / 1000);

        if (lvl === maxLvl) maxLvl++;
      }
      deadCheck: {
        if (!isDead()) break deadCheck;

        if (deadtime != null) break deadCheck;
        killCount++;
        deadtime = currentTime;
        coinCount += Math.ceil(fullHp / 5);
      }
      updateEnemy(currentTime);
    });
    return () => cancelAnimationFrame(rid);
  });
</script>

<div class="Game">
  <LocalStorage code="Balance.coins" bind:value={coinCount} />
  <GameStatistic title="Clicks" code="clicks" bind:value={clickCount} />

  <GameStatistic title="Kills" code="kills" bind:value={killCount} />
  <Balance />
  <LevelSelector bind:lvl bind:maxLvl />
  <Store />
  <SaveSetting />
  <GameStatistics />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="clicker" on:click={click}>
    <Enemy bind:hp bind:fullHp />
  </div>

  <AudioSetting />
  <SaveSetting />
</div>

<style>
  .Game {
    --color-main: #333333;
    --color-text: #ffffff;

    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-areas:
      "Balance LevelSelector"
      "Store clicker"
      "GameStatistics clicker"
      "AudioSetting SaveSetting";
    grid-template-columns: 50% 50%;
    grid-template-rows: auto 1fr 1fr auto;

    position: relative;
  }

  .Game > :global(*) {
    box-shadow: 0 0 0 1px;
    padding: 0.5em;
  }
  .clicker {
    grid-area: clicker;
  }
</style>
