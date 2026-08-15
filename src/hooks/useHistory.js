import { useState, useEffect } from "react";

const STORAGE_KEY = "calculator.history";

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  function addEntry(expression, result) {
    setHistory((h) => [...h, { expression, result, id: Date.now() }]);
  }

  function clear() {
    setHistory([]);
  }

  return { history, addEntry, clear };
}
