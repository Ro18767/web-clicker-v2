import { localStorageWriteble } from "$lib/store/localStorageStore.js";
import damageSfxSrc from "./assets/sfx/Damage.wav";
import { browser } from "$app/environment";
import { get } from 'svelte/store';

export const enabled = localStorageWriteble("AudioSetting.sfx.enabled", true);

let sfxEnabled = true;


enabled.subscribe((enabled) => {
    sfxEnabled = enabled;
});


export function playDamage() {
    if (!sfxEnabled) return;
    new Audio(damageSfxSrc).play()
        .catch((error) => {
            console.error({ cause: error });
        });
}
