"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Local UI state only: which answers are open. The Figma design shows all three open. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>(() => items.map((item) => item.id));

  const toggle = (id: string) =>
    setOpenIds((current) => (current.includes(id) ? current.filter((openId) => openId !== id) : [...current, id]));

  return (
    <ul>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <li key={item.id} className="mb-6 border-b border-line pb-3.5 last:mb-0">
            <h3>
              <button
                type="button"
                id={`faq-button-${item.id}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-6 text-left text-xl font-medium leading-[25px] text-ink"
              >
                {item.question}
                <ChevronDownIcon className={`shrink-0 text-link transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
              </button>
            </h3>
            {/* grid-rows 0fr -> 1fr animates height without measuring it in JS */}
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-3.5 leading-[25px] text-muted">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}