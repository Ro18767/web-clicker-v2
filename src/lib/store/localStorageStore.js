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
    let currentValue = getFromLocalStorage(code) ?? initialValue;
    let { set, subscribe: subscribe2, update } = writable(currentValue);
    /** @type {import('svelte/store').Unsubscriber?} */
    let unsubscribe;
    /** @type {import('svelte/store').Writable<T>} */
    let store = {
        set,
        update,
        subscribe: (run, invalidate) => {
            let unsubscribeCurrent = subscribe2(run, invalidate);
            info.subscriberCount++;
            unsubscribe ??= subscribe2((value) => {
                setInLocalStorage(code, value);
            });
            return () => {
                unsubscribeCurrent();
                info.subscriberCount--;
                if (!info.subscriberCount && unsubscribe) {
                    unsubscribe();
                    unsubscribe = null;
                }
            };
        },
    };
    let info = {
        subscriberCount: 0,
        code,
        initialValue,
        store,
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
    Object.keys(window.localStorage).forEach(code => {
        let info = STOREGE_USAGE_TNFO_MAP.get(code);
        if (info != null) {
            let { store, initialValue } = info;
            store.set(initialValue);
        }
        window.localStorage.removeItem(code);
    });
}