"use client";

import { useState } from "react";

export default function CopyEmail({
  email,
  className = "",
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable; the mailto link is still there as a fallback.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-ghost"
      aria-label={`Copy email address ${email}`}
    >
      <span className={className}>{copied ? "Copied" : "Copy email"}</span>
      <span aria-hidden>{copied ? "✓" : "⧉"}</span>
    </button>
  );
}
