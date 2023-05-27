<script>
  import LocalStorage from "$lib/store/LocalStorage.svelte";

  export let lvl = 0;
  export let hp = 10;
  export let fullHp = 10;
  export let name = "Slime";

  $: hp = fullHp;
  $: fullHp = Math.round(10 * (lvl + Math.pow(1.55, lvl)));
</script>

<LocalStorage code="Game.lvl" bind:value={lvl} />
<div class="Enemy">
  <span>{lvl + 1} lvl. {hp > 0 ? "" : "Dead"} {name}</span>
  <span>{hp}/{fullHp}</span>
</div>

<style>
  .Enemy {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
  }
</style>
