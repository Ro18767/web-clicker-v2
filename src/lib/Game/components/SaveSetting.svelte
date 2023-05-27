<script>
  import { clear } from "$lib/store/LocalStorage.svelte";
  function reset() {
    if (!window.confirm("Are you sure you want to delete the save?")) return;
    clear();
  }
</script>

<div class="SaveSetting">
  <button on:click={reset}>reset</button>
</div>

<style>
  .SaveSetting {
    grid-area: SaveSetting;
  }
  .SaveSetting {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .SaveSetting button {
    border-width: 1px;
  }
</style>
