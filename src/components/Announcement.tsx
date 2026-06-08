"use client";

import { useCallback, useEffect, useState } from "react";

// Centred toast that pops up shortly after the page opens. A single,
// dismissible note pointing at the live app. Real claims only.
const APP_URL = "https://radiant-mind.vercel.app";
const APP_NAME = "Radiant Mind";
// Show at most once per browser session so returning/scrolling visitors
// aren't nagged. Cleared automatically when the tab/session ends.
const SEEN_KEY = "announce-seen";

function alreadySeen(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false; // private mode / storage blocked -> just show it
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

export default function Announcement() {
  const [mounted, setMounted] = useState(false); // in the DOM at all
  const [visible, setVisible] = useState(false); // drives the enter/exit transition

  const dismiss = useCallback(() => {
    setVisible(false);
    // unmount once the exit transition has finished
    window.setTimeout(() => setMounted(false), 460);
  }, []);

  useEffect(() => {
    if (alreadySeen()) return; // shown already this session — stay hidden
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Appear just after the diagonal loader finishes opening the page
    // (loader is skipped under reduced motion, so come in sooner).
    const delay = reduce ? 500 : 2600;
    const t = window.setTimeout(() => {
      markSeen();
      setMounted(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }, delay);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, dismiss]);

  if (!mounted) return null;

  return (
    <div className="announce" data-visible={visible} aria-live="polite">
      <div
        className="announce__card"
        role="dialog"
        aria-label="A note from Christen"
      >
        <button
          type="button"
          className="announce__close"
          onClick={dismiss}
          aria-label="Dismiss"
        >
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
            <path
              d="M2 2L14 14M14 2L2 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="announce__text">
          I built an app which has{" "}
          <span className="announce__emph announce__emph--bold">
            real users
          </span>
          .
        </p>
        <p className="announce__text">
          And{" "}
          <span className="announce__emph">no wrapper, custom AI models</span>.
        </p>

        <a
          className="announce__link"
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {APP_NAME}
          <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden>
            <path
              d="M5 15L15 5M15 5H7M15 5V13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
