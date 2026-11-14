"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useState that is saved in localStorage so changes survive a page reload.
 *
 * - Renders `initial` first (so server and browser HTML match), then swaps in
 *   the saved value once mounted.
 * - Nothing is written until the saved value has been read, so it can never
 *   overwrite saved data with the defaults.
 * - Pass `null` as the key to pause (e.g. until the signed-in user is known).
 * - Storage can be unavailable (private mode, quota): everything still works,
 *   it just isn't remembered.
 */
export function usePersistentState<T>(key: string | null, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const loadedKey = useRef<string | null>(null);
  const initialRef = useRef(initial);

  useEffect(() => {
    if (!key) {
      setReady(false);
      loadedKey.current = null;
      return;
    }
    try {
      const raw = localStorage.getItem(key);
      setValue(raw ? (JSON.parse(raw) as T) : initialRef.current);
    } catch {
      setValue(initialRef.current);
    }
    loadedKey.current = key;
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready || !key || loadedKey.current !== key) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* not remembered, but still works */
    }
  }, [value, ready, key]);

  /** Forget the saved data and go back to the sample data. */
  const reset = useCallback(() => {
    try {
      if (key) localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setValue(initialRef.current);
  }, [key]);

  return [value, setValue, reset, ready] as const;
}
