<script>
  import { goto } from "$app/navigation";
  import { base } from '$app/paths';
  import { localStorageClear } from "$lib/store/localStorageStore.js";
  function reset() {
    if (!window.confirm("Are you sure you want to delete the save?")) return;
    localStorageClear();
    goto(`${base}/`);
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
