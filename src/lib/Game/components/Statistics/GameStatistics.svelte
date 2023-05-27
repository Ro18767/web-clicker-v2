<script context="module">
  import { writable } from "svelte/store";
  /** @typedef {{
   * title: string,
   * code: string,
   * value: unknown,
   * }} StatisticInfo */
  /** @typedef {import('svelte/store').Writable<StatisticInfo>} StatisticInfoWritable */

  /** @type {StatisticInfo[]} */
  const statistics = [];
   const statisticsStore = writable(statistics);

  /**
   * @param {string} title
   * @param {string} code
   * @param {unknown} value
   */
  export function add(title = "", code = "", value) {
    if (statistics.some((s) => s.code === code)) return;
    statisticsStore.update((statistics) => {
      statistics.push({
        title,
        code,
        value,
      });
      return statistics;
    });
  }
</script>

<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";
</script>

<div class="GameStatistics">
  {#each $statisticsStore as { title, code, value } (code)}
    <LocalStorage code="GameStatistic.{code}" bind:value />
    <div class="GameStatistic">
      <span class="title">{title}</span>
      <span class="value">{value}</span>
    </div>
  {/each}
</div>

<style>
  .GameStatistics {
    grid-area: GameStatistics;
  }
  .GameStatistics {
    overflow: auto;

    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .GameStatistic {
    overflow: auto;
  }

  .GameStatistic .title::after {
    content: ": ";
    display: inline;
  }
</style>
