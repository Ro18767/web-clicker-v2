<script>
  import { browser } from "$app/environment";
  import { afterNavigate, goto } from "$app/navigation";
  import Game from "$lib/Game/Game.svelte";
  afterNavigate((navigation) => {
    if (!browser) return;
    if (navigation.from != null) return;
    goto("/");
  });
</script>

<Game />
