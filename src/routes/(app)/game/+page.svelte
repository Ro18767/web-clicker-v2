<script>
  import { browser } from "$app/environment";
  import { afterNavigate, goto } from "$app/navigation";
  import { base } from '$app/paths';
  import Game from "$lib/Game/Game.svelte";
  let canPlay = false;
  afterNavigate((navigation) => {
    if (!browser) return;
    if (navigation.from != null) {
      canPlay = true;
      return;
    }

    goto(`${base}/`);
  });
</script>

{#if canPlay}
  <Game />
{/if}
