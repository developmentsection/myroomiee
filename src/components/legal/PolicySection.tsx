import type { PolicyBlock, PolicyTextSegment } from "@/content/tenancy-policy";

function PolicyText({ segments }: { segments: PolicyTextSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={`${segment.text}-${index}`} className="font-bold text-foreground">
            {segment.text}
          </strong>
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        ),
      )}
    </>
  );
}

export function PolicySection({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-[1.8] text-muted-foreground">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3 key={`${block.text}-${index}`} className="pt-2 font-display text-lg font-bold leading-snug text-foreground">
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={`list-${index}`}
              className={`space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`item-${index}-${itemIndex}`} className="break-words pl-1">
                  <PolicyText segments={item} />
                </li>
              ))}
            </ListTag>
          );
        }

        return (
          <p key={`paragraph-${index}`} className="break-words">
            <PolicyText segments={block.segments} />
          </p>
        );
      })}
    </div>
  );
}
