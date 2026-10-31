import { useSyncExternalStore } from "react";

// Ticks once per minute on the client. On the server (and during hydration)
// it returns null, so time-dependent UI never causes a hydration mismatch.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => null;

export function useNow(): Date | null {
  const minute = useSyncExternalStore<number | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return minute === null ? null : new Date(minute * 60_000);
}
