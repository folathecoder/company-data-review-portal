"use client";

import { useCallback } from "react";
import { LOCALSTORAGE_KEY } from "@/lib/constants";

export const useLocalStorage = <T,>() => {
  const read = useCallback((): T | null => {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }, []);

  const write = useCallback((data: T) => {
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  }, []);

  return { read, write };
};
