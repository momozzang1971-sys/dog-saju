"use client";

import { useState } from "react";
import { calculateDogSaju } from "@/lib/dog-saju";
import { computeDogFortune } from "@/lib/dog-fortune";
import { getCompatibility } from "@/lib/data/compatibility";
import ElementBadge from "./ElementBadge";

export default function CompatibilitySection({
  myName,
  myDominant,
}: {
  myName: string;
  myDominant: ReturnType<typeof computeDogFortune>["dominant"];
}) {
  const [name, setName] = useState("");
  const [year, setYear] = useState("2020");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");
  const [result, setResult] = useState<null | {
    name: string;
    dominant: ReturnType<typeof computeDogFortune>["dominant"];
  }>(null);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    const saju = calculateDogSaju({
      dateKind: "exact",
      calendarType: "solar",
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: null,
    });
    const fortune = computeDogFortune({
      saju,
      coatColorValue: null,
      temperamentValues: [],
      seed: `${name}-${year}-${month}-${day}`,
    });
    setResult({ name: name || "상대방", dominant: fortune.dominant });
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <h3 className="text-base font-semibold">💞 궁합 보기</h3>
      <p className="mt-1 text-xs text-neutral-500">
        친구네 강아지나 견주님과의 궁합을 재미로 확인해보세요.
      </p>
      <form onSubmit={handleCheck} className="mt-3 flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-xs text-neutral-500">이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상대방 이름"
            className="w-28 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500">생년월일(양력)</label>
          <div className="flex gap-1">
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              type="number"
              className="w-16 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              placeholder="년"
            />
            <input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              type="number"
              className="w-12 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              placeholder="월"
            />
            <input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              type="number"
              className="w-12 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              placeholder="일"
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          궁합 보기
        </button>
      </form>

      {result && (
        <div className="mt-4 rounded-xl bg-neutral-50 p-4">
          <div className="flex items-center gap-2 text-sm">
            <span>{myName}</span>
            <ElementBadge element={myDominant} />
            <span>×</span>
            <span>{result.name}</span>
            <ElementBadge element={result.dominant} />
          </div>
          {(() => {
            const compat = getCompatibility(myDominant, result.dominant);
            return (
              <div className="mt-2">
                <p className="text-sm font-semibold text-neutral-800">
                  {compat.type} 궁합 · {compat.score}점 · {compat.keyword}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{compat.message}</p>
                <p className="mt-2 rounded-lg bg-white p-2.5 text-sm text-neutral-700">
                  🎾 같이 해보면 좋은 것 · {compat.activityTip}
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
