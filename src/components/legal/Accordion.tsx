import { useState } from "react";
import type { PolicySection } from "@/content/tenancy-policy";
import { AccordionItem } from "./AccordionItem";

export function Accordion({ sections }: { sections: PolicySection[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4 sm:space-y-5">
      {sections.map((section, index) => (
        <AccordionItem
          key={section.title}
          section={section}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
        />
      ))}
    </div>
  );
}
