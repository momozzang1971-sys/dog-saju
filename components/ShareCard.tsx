"use client";

import { useRef, useState } from "react";
import type { WuxingKey } from "@/lib/dog-saju";
import type { ElementTemplate, ELEMENT_META } from "@/lib/data/element-templates";

export default function ShareCard({
  name,
  element,
  meta,
  template,
}: {
  name: string;
  element: WuxingKey;
  meta: (typeof ELEMENT_META)[WuxingKey];
  template: ElementTemplate;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${name || "우리아이"}_멍사주카드.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("이미지 저장에 실패했어요. 스크린샷으로 저장해주세요!");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div
        ref={cardRef}
        className="mx-auto w-full max-w-sm rounded-3xl p-6 text-center shadow-sm"
        style={{
          background: `linear-gradient(160deg, ${meta.colorFrom}, ${meta.colorTo})`,
        }}
      >
        <p className="text-xs font-semibold tracking-wide text-neutral-500">
          멍 사 주 · MEONG SAJU
        </p>
        <div className="mt-3 text-5xl">{meta.emoji}</div>
        <h3 className="mt-3 text-xl font-bold text-neutral-800">
          {name || "우리 아이"}는
        </h3>
        <p className="text-lg font-bold text-neutral-800">{template.title}</p>
        <p className="mt-2 text-sm text-neutral-600">{template.summary}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {template.traits.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/70 px-2.5 py-1 text-xs text-neutral-700"
            >
              #{t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-neutral-500">
          {element}({meta.hanja}) 기운 · 재미로 보는 콘텐츠예요
        </p>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mx-auto mt-3 block rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "저장 중..." : "📸 카드 이미지로 저장"}
      </button>
    </div>
  );
}
