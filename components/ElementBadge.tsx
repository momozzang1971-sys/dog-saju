import type { WuxingKey } from "@/lib/dog-saju";
import { ELEMENT_META } from "@/lib/data/element-templates";

export default function ElementBadge({ element }: { element: WuxingKey }) {
  const meta = ELEMENT_META[element];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold text-neutral-700"
      style={{ background: meta.colorFrom }}
    >
      <span>{meta.emoji}</span>
      {element}({meta.hanja})
    </span>
  );
}
