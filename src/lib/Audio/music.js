import { localStorageWriteble } from "$lib/store/localStorageStore.js";
import musicSrc from "./assets/music/Валентин Стрыкало - Так гріє.mp3";
import { browser } from "$app/environment";
import { page } from '$app/stores';
import { derived } from "svelte/store";
import { base } from '$app/paths';
export const enabled = localStorageWriteble("AudioSetting.music.enabled", true);
/** @type {HTMLAudioElement?} */
export let music;

if (browser) {
    music = new Audio(musicSrc);
    music.loop = true;
    music.volume = 0.05;
}
if (browser) {
    derived([page, enabled], ([$page, $enabled]) => $page.url?.pathname === `${base}/game` && $enabled)
        .subscribe((enable) => {
            musicUpdate(enable);
        });
}
async function musicUpdate(enable = false) {
    try {
        if (music == null) return;
        if (enable) {
            await music.play().catch(() => { });
        }
        if (!enable) {
            music.pause();
        }
    } catch (error) {
        console.error({ cause: error });
    }
}
