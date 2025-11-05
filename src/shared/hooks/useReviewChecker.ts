import { useCallback, useEffect, useMemo, useState } from "react";

type ReviewMap = Record<string, string>; // code -> ISO timestamp

const STORAGE_KEY = "mf_reviewed_apteki";

function readStorage(): ReviewMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed as ReviewMap : {};
  } catch {
    // если JSON битый — очищаем ключ
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

function writeStorage(map: ReviewMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // игнорируем квоту/приватный режим
  }
}

/**
 * useReviewTracker
 * - hasReviewed(code): проверка, оставляли ли отзыв по коду
 * - markReviewed(code): отметка (с таймштампом)
 * - removeMark(code): удалить отметку для кода
 * - clearAll(): удалить все отметки
 * - list: текущий список отметок (code -> timestamp)
 */
export function useReviewTracker() {
  const [map, setMap] = useState<ReviewMap>(() => readStorage());

  // синхронизация между вкладками
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setMap(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const hasReviewed = useCallback(
    (code: string) => Boolean(map[code]),
    [map]
  );

  const markReviewed = useCallback((code: string) => {
    setMap(prev => {
      const next = { ...prev, [code]: new Date().toISOString() };
      writeStorage(next);
      return next;
    });
  }, []);

  const removeMark = useCallback((code: string) => {
    setMap(prev => {
      if (!(code in prev)) return prev;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [code]: _, ...rest } = prev;
      writeStorage(rest);
      return rest;
    });
  }, []);

  const clearAll = useCallback(() => {
    setMap({});
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* empty */ }
  }, []);

  const list = useMemo(() => map, [map]);

  return { hasReviewed, markReviewed, removeMark, clearAll, list };
}
