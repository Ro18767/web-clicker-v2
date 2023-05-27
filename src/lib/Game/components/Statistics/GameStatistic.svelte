<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";
  import { add } from "./GameStatistics.svelte";
  export let title = "";
  export let code = "";
  /** @type {unknown}*/
  export let value;

  add(title, code, value);
</script>

<LocalStorage code="GameStatistic.{code}" bind:value />
