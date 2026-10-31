export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Saved choice wins; otherwise follow the OS setting. Also marks <html class="js"> so
 * scroll-reveal styles only hide content when JavaScript is running.
 */
export const themeInitScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;

/** Same logic as themeInitScript, for re-applying after React re-renders <html>. */
export function applyTheme() {
  const root = document.documentElement;
  root.classList.add("js");
  let dark: boolean;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  root.classList.toggle("dark", dark);
}
