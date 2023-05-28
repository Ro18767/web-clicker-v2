
import { writable } from "svelte/store";
import { localStorageWriteble } from "$lib/store/localStorageStore.js";
/** 
 * @typedef {Object} StatisticInfo
 * @property {string} title
 * @property {string} code
 * @property {import('svelte/store').Writable<unknown>} store
 */

/** 
 * @type {import('svelte/store').Readable<StatisticInfo[]>}
 */
export const statistics = writable([]);

/**
 * @template T
 * @param {string} title
 * @param {string} code
 * @param {T} value
 */
export function gameStatisticStore(title = "", code = "", value) {
    let store = localStorageWriteble(`GameStatistic.${code}`, value);
    statistics.subscribe(array => {
        if (array.some((s) => s.code === code)) return;
        array.push({
            title,
            code,
            store
        });
        /** @type {import('svelte/store').Writable<StatisticInfo[]>} */(statistics).set(array);
    })();
    return store;
}