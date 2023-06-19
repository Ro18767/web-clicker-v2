import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { base } from '$app/paths';
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
/**
 * @returns {void}
 */
export function localStorageExport() {
    if (!browser) return;

    const array = [JSON.stringify(window.localStorage)];
    const blob = new Blob(array, { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.style.display = "none";
    let url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "Save.json";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
/**
 * @returns {void}
 */
function initializeInput() {
    input = document.createElement("input");

    input.style.display = "none";
    input.type = "file";
    document.body.append(input);

    input.onchange = () => {
        const file = input.files?.[0];

        input.value = '';

        if (file == null)
            return;

        file.text()
            .then((result) => {
                let newSave;
                try {
                    newSave = JSON.parse(result);
                } catch (error) {
                    console.error(error);
                    alert('save is not valid');
                }

                if (newSave == null)
                    return;
                if (typeof newSave !== 'object')
                    return;

                window.localStorage.clear();
                Object.entries(newSave).forEach(([key, value]) => {
                    if (typeof key !== 'string')
                        return;
                    if (typeof value !== 'string')
                        return;

                    window.localStorage.setItem(key, value);
                });

                window.location.href = `${base}/`;

            })
            .catch((err) => {
                console.error(err);
                window.alert('save is not valid');
            });
    };
}
/**
 * @type {HTMLInputElement} 
 */
let input;

/**
 * @returns {void}
 */
export function localStorageImport() {
    if (!browser) return;

    if (input == null) {
        initializeInput();
    }

    input.click();

   
}