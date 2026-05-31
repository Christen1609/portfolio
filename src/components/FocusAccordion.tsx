"use client";

import { useState } from "react";
import { focusAreas } from "@/data/content";

export default function FocusAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="border-t border-line">
      {focusAreas.map((area, i) => {
        const isOpen = active === i;
        return (
          <div key={area.no} className="border-b border-line">
            <button
              type="button"
              onClick={() => setActive(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-5 sm:gap-8 py-7 sm:py-9 text-left group"
            >
              <span className="text-desc text-[0.85rem] tabular-nums w-8 shrink-0">
                {area.no}
              </span>
              <span
                className={`flex-1 display-lg transition-colors duration-300 ${
                  isOpen ? "text-title" : "text-subtitle group-hover:text-title"
                }`}
              >
                {area.title}
              </span>
              <span
                className={`shrink-0 text-2xl text-orange transition-transform duration-500 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-9 pl-0 sm:pl-[3.25rem] max-w-3xl">
                  <p className="lead mb-6">{area.body}</p>
                  <ul className="flex flex-wrap gap-2.5">
                    {area.items.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
