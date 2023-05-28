<script>
  export let title = "";
  /** @type {import('svelte/store').Readable<unknown>}*/
  export let store;
</script>

<div class="GameStatistic">
  <span class="title">{title}</span>
  <span class="value">{$store}</span>
</div>

<style>
  .GameStatistic {
    overflow: auto;
  }

  .GameStatistic .title::after {
    content: ": ";
    display: inline;
  }
</style>
