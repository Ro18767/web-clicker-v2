<script>
  import { goto } from "$app/navigation";
  import { base } from '$app/paths';
  import { localStorageClear,localStorageExport,localStorageImport } from "$lib/store/localStorageStore.js";
  function reset() {
    if (!window.confirm("Are you sure want to delete the save?")) return;
    localStorageClear();
    goto(`${base}/`);
  }
  function importSave()
  {
    if (!window.confirm("Are you sure want to import the save?(it will overide this save!)")) return;
    localStorageImport();
    goto(`${base}/`);
  }
  function exportSave()
  {
    localStorageExport();
  }
</script>

<div class="SaveSetting">
  <button on:click={reset}>reset</button>
  <button on:click={importSave}>import</button>
  <button on:click={exportSave}>export</button>
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
