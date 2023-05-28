import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
/** 
 * @template T
 * @typedef {import('svelte/store').Writable<T>} Writable */
/** @typedef {import('svelte/store').Unsubscriber} Unsubscriber */
/** 
 * @template T
 * @typedef {Object} StoreUsageInfo<T>
 * @property {number} subscriberCount
 * @property {string} code
 * @property {import('svelte/store').Writable<T>} store
 * @property {import('svelte/store').Unsubscriber} unsubscribe
 * @property {T} initialValue
 */

/** @type {Map<string, StoreUsageInfo<*>>} */
const STOREGE_USAGE_TNFO_MAP = new Map();


/**
 * @template T
 * @param {string} code
 * @param {T} initialValue
 * @returns {import('svelte/store').Writable<T>}
 */
export function localStorageWriteble(code = "", initialValue) {
    let savedInfo = STOREGE_USAGE_TNFO_MAP.get(code);
    if (savedInfo != null) return savedInfo.store;
    initialValue = getFromLocalStorage(code) ?? initialValue;
    let { set, subscribe, update } = writable(initialValue);
    let unsubscribe = subscribe((value) => setInLocalStorage(code, value));
    /** @type {import('svelte/store').Writable<T>} */
    let store = {
        set,
        update,
        subscribe: (...subscribeArgs) => {
            let unsubscribeCurrent = subscribe(...subscribeArgs);
            info.subscriberCount++;
            return () => {
                unsubscribeCurrent();
                if (0 === --info.subscriberCount) unsubscribe();
            };
        },
    };
    let info = {
        subscriberCount: 0,
        code,
        initialValue,
        store,
        unsubscribe,
    };

    STOREGE_USAGE_TNFO_MAP.set(code, info);

    return store;
}

/**
 * @template T
 * @param {string} code
 * @param {T} value
 * @returns {void}
 */
function setInLocalStorage(code = "", value) {
    if (!browser) return;
    if (value == null) return window.localStorage.removeItem(code);
    try {
        window.localStorage.setItem(code, JSON.stringify(value));
    } catch (error) {
        window.localStorage.removeItem(code);
        console.error({ cause: error });
    }
}

/**
 * @template T
 * @param {string} code
 * @returns {T | null}
 */
function getFromLocalStorage(code = "") {
    if (!browser) return null;
    let storedString = window.localStorage.getItem(code);
    if (storedString == null) return null;
    try {
        return JSON.parse(storedString);
    } catch (error) {
        console.error({ cause: error });
        return null;
    }
}
/**
 * @returns {void}
 */
export function localStorageClear() {
    if (!browser) return;
    STOREGE_USAGE_TNFO_MAP.forEach(({ initialValue, store, code }) => {
        store.set(initialValue);
        window.localStorage.removeItem(code);
    });
}