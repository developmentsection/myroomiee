import { Minus, Plus } from "lucide-react";
import type { PolicySection as PolicySectionType } from "@/content/tenancy-policy";
import { PolicySection } from "./PolicySection";

export function AccordionItem({
  section,
  index,
  isOpen,
  onToggle,
}: {
  section: PolicySectionType;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentId = `tenancy-policy-panel-${index}`;
  const triggerId = `tenancy-policy-trigger-${index}`;
  const Icon = isOpen ? Minus : Plus;

  return (
    <article className="overflow-hidden rounded-[20px] border border-border bg-card shadow-soft transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lift">
      <h2>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2 sm:px-6"
        >
          <span className="min-w-0 break-words font-display text-base font-bold leading-snug text-foreground sm:text-lg lg:text-xl">
            {index + 1}. {section.title}
          </span>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)] transition">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      </h2>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border px-4 py-5 sm:px-6 sm:py-6">
            <PolicySection blocks={section.blocks} />
          </div>
        </div>
      </div>
    </article>
  );
}
