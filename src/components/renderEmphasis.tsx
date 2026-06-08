import type { ReactNode } from "react";

// Render `**text**` segments in copy as bold + underlined emphasis (.copy-emph).
// Shared by the About section (page.tsx) and project descriptions (Work.tsx).
export function renderEmphasis(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(part);
    return m ? (
      <strong key={i} className="copy-emph">
        {m[1]}
      </strong>
    ) : (
      part
    );
  });
}
