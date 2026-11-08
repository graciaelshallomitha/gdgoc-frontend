import type { ComponentType, SVGProps } from "react";
import { CollaborationIcon, GeneralIcon, JoiningIcon, SpeakingIcon } from "@/components/icons";
import type { InquiryCategory } from "@/types/gdgoc";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Symbols are exported from Figma. `box` is the width of the symbol's text box in the design,
 * which is why the category names start at slightly different x positions there.
 */
const CATEGORY_ICONS: Record<string, { Icon: Icon; box: number }> = {
  "joining-learning": { Icon: JoiningIcon, box: 24 },
  collaboration: { Icon: CollaborationIcon, box: 17 },
  "speaking-sharing": { Icon: SpeakingIcon, box: 27 },
  "general-inquiry": { Icon: GeneralIcon, box: 14 },
};

interface InquiryCategoryListProps {
  categories: InquiryCategory[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Presentational: it owns no state. The parent passes the selected id and a setter,
 * so the cards and the form's dropdown can never drift apart.
 */
export function InquiryCategoryList({ categories, selectedId, onSelect }: InquiryCategoryListProps) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-[18px]">
        <h2 className="text-[28px] font-bold leading-[1.12] tracking-[-0.004em]">What brings you here?</h2>
        <p className="leading-[25px] text-muted">Pick the closest topic in the form. We’ll take it from there.</p>
      </div>

      <ul className="flex flex-col gap-[18px]">
        {categories.map((category) => {
          const selected = category.id === selectedId;
          const symbol = CATEGORY_ICONS[category.id];
          return (
            <li key={category.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(category.id)}
                className={`flex w-full items-start gap-[18px] rounded-2xl border p-[19px] text-left transition-colors ${
                  selected ? "border-transparent bg-tint" : "border-line bg-transparent hover:bg-surface/60"
                }`}
              >
                <span
                  aria-hidden
                  className="flex h-[30px] shrink-0 items-center justify-center text-link"
                  style={{ width: symbol?.box ?? 24 }}
                >
                  {symbol ? <symbol.Icon /> : category.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[17px] font-medium leading-[1.25] text-ink">{category.label}</span>
                  <span className="mt-1.5 block text-sm leading-[22px] text-muted">{category.description}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}