<script context="module">
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";
  /** @typedef {import('svelte/store').Writable<unknown>} Writable */
  /** @typedef {import('svelte/store').Unsubscriber} Unsubscriber */

  /** @typedef {{
   * count: number,
   * store: Writable,
   * unsubscribe: Unsubscriber,
   * initialValue: *,
  }} StoreUsageInfo */
  /** @type {Map<string, StoreUsageInfo>} */
  const STOREGE_USAGE_TNFO_MAP = new Map();
  /**
   * @param {string} code
   * @param {unknown} initialValue
   * @returns {Writable}
   */
  function createStore(code = "", initialValue) {
    let info = STOREGE_USAGE_TNFO_MAP.get(code);
    if (info == null) {
      initialValue = getFromLocalStorage(code) ?? initialValue;
      let store = writable(initialValue);
      info = {
        count: 0,
        initialValue,
        store,
        unsubscribe: store.subscribe((value) => {
          setInLocalStorage(code, value);
        }),
      };
      STOREGE_USAGE_TNFO_MAP.set(code, info);
    }
    info.count++;
    return info.store;
  }
  /**
   * @param {string} code
   */
  function destroyStore(code = "") {
    let info = STOREGE_USAGE_TNFO_MAP.get(code);
    if (info == null) return;
    info.count--;
    if (info.count > 0) return;
    info.unsubscribe();
    STOREGE_USAGE_TNFO_MAP.delete(code);
  }

  /**
   * @param {string} code
   * @param {unknown} value
   */
  function setInLocalStorage(code = "", value) {
    if (!browser) return;
    if (value == null) return window.localStorage.removeItem(code);
    try {
      window.localStorage.setItem(code, JSON.stringify(value));
    } catch (error) {
      window.localStorage.removeItem(code);
      console.log({ error });
    }
  }
  /**
   * @param {string} code
   */
  function getFromLocalStorage(code = "") {
    if (!browser) return null;
    let storedString = window.localStorage.getItem(code);
    if (storedString == null) return null;
    try {
      return JSON.parse(storedString);
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
  export function clear() {
    if (!browser) return;
    window.localStorage.clear();
    window.location.href = window.location.href;
  }
</script>

<script>
  import { onMount, onDestroy, afterUpdate } from "svelte";
  export let code = "";
  /** @type {any} */
  export let value;
  /** @type {Writable} */
  let store = createStore(code, value);

  let prevValue = (value = $store);

  $: {
    if (prevValue !== $store) {
      value = $store;
    }
    if (prevValue !== value) {
      $store = value;
    }
    prevValue = value;
  }

  onMount(() => {
    value = prevValue;
  });

  onDestroy(() => {
    destroyStore(code);
  });
</script>
