"use client";

import { useRef } from "react";
import { useBlurLines } from "./useBlurLines";

/**
 * BlurLines — wraps a block of copy and applies the scrubbed line-by-line
 * blur reveal (same animation as the intro) to every child matching `selector`.
 * Usable from server components (e.g. the About section) since it is a client
 * boundary of its own.
 */
export default function BlurLines({
  children,
  className,
  selector = "p",
}: {
  children: React.ReactNode;
  className?: string;
  selector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useBlurLines(ref, selector);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
