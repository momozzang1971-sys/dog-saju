"use client";

import { useState } from "react";
import { calculateDogSaju, type BirthDateKind, type DogSajuResult } from "@/lib/dog-saju";
import { computeDogFortune, type DogFortuneResult } from "@/lib/dog-fortune";
import { COAT_COLOR_OPTIONS } from "@/lib/data/coat-color-map";
import { TEMPERAMENT_OPTIONS } from "@/lib/data/temperament-map";
import { BREED_HEALTH_DATA, findBreedHealthInfo } from "@/lib/data/breed-health";
import { LUCKY_INFO } from "@/lib/data/lucky";
import { buildOverviewText } from "@/lib/overview";
import { saveDogProfile } from "@/lib/profile-storage";
import ElementBadge from "@/components/ElementBadge";
import DailyMoodBanner from "@/components/DailyMoodBanner";
import FollowGate from "@/components/FollowGate";
import ShareCard from "@/components/ShareCard";
import CompatibilitySection from "@/components/CompatibilitySection";

type CalendarType = "solar" | "lunar";
type AmPm = "AM" | "PM";

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);

function to24Hour(ampm: AmPm, hour12: number): number {
  if (ampm === "AM") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

const INITIAL_YEAR = "2022";
const INITIAL_MONTH = "1";
const INITIAL_DAY = "1";

export default function Home() {
  const [name, setName] = useState("");
  const [dateKind, setDateKind] = useState<BirthDateKind>("exact");
  const [calendarType, setCalendarType] = useState<CalendarType>("solar");
  const [year, setYear] = useState(INITIAL_YEAR);
  const [month, setMonth] = useState(INITIAL_MONTH);
  const [day, setDay] = useState(INITIAL_DAY);
  // 시각을 모르는 견주가 더 많다는 전제 하에, 기본값은 "몰라요"(체크됨)로 시작한다.
  const [timeUnknown, setTimeUnknown] = useState(true);
  const [ampm, setAmpm] = useState<AmPm>("AM");
  const [hour12, setHour12] = useState("12");
  const [breed, setBreed] = useState("");
  const [coatColorValue, setCoatColorValue] = useState("");
  const [temperamentValues, setTemperamentValues] = useState<string[]>([]);

  const [saju, setSaju] = useState<DogSajuResult | null>(null);
  const [fortune, setFortune] = useState<DogFortuneResult | null>(null);

  function toggleTemperament(value: string) {
    setTemperamentValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const sajuResult = calculateDogSaju({
      dateKind,
      calendarType,
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: dateKind === "adoption" || timeUnknown ? null : to24Hour(ampm, Number(hour12)),
    });

    const fortuneResult = computeDogFortune({
      saju: sajuResult,
      coatColorValue: coatColorValue || null,
      temperamentValues,
      seed: `${name}-${year}-${month}-${day}-${coatColorValue}-${temperamentValues.join(",")}`,
    });

    setSaju(sajuResult);
    setFortune(fortuneResult);

    saveDogProfile({
      name: name || "우리 아이",
      dominant: fortuneResult.dominant,
      savedAt: new Date().toISOString(),
    });
  }

  function handleReset() {
    // 결과뿐 아니라 입력 폼도 전부 초기화한다 — 그대로 두면 다른 아이를 입력하려 할 때
    // 이전 아이의 이름·견종·체크값이 남아 있어 "결과가 그대로"인 것처럼 보인다.
    setSaju(null);
    setFortune(null);
    setName("");
    setDateKind("exact");
    setCalendarType("solar");
    setYear(INITIAL_YEAR);
    setMonth(INITIAL_MONTH);
    setDay(INITIAL_DAY);
    setTimeUnknown(true);
    setAmpm("AM");
    setHour12("12");
    setBreed("");
    setCoatColorValue("");
    setTemperamentValues([]);
  }

  const healthInfo = findBreedHealthInfo(breed || null);
  const wuxingOrder: Array<keyof DogSajuResult["wuxingCount"]> = ["목", "화", "토", "금", "수"];
  const maxCount = saju ? Math.max(1, ...wuxingOrder.map((k) => saju.wuxingCount[k])) : 1;
  const overviewText = fortune
    ? buildOverviewText(name, fortune.dominant, fortune.secondary)
    : "";
  const lucky = fortune ? LUCKY_INFO[fortune.dominant] : null;

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-8">
      <header className="text-center">
        <h1 className="font-heading text-3xl text-orange-700">🐾 멍사주</h1>
        <p className="mt-1 text-sm text-neutral-500">
          우리 아이 생일(또는 입양일)로 보는 성향 풀이
        </p>
        <p className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">
          재미로 보는 콘텐츠예요, 로그인·저장 없이 무료로 이용하세요 🐶
        </p>
      </header>

      <div className="mt-6">
        <DailyMoodBanner />
      </div>

      {!fortune && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-5 rounded-2xl border border-orange-100 bg-white p-5"
        >
          <div>
            <label className="block text-sm font-medium text-neutral-700">이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 콩이"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-neutral-700">생일 정보</span>
            <div className="mt-1 flex gap-3 text-sm text-neutral-600">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={dateKind === "exact"}
                  onChange={() => setDateKind("exact")}
                />
                정확한 생일을 알아요
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={dateKind === "adoption"}
                  onChange={() => setDateKind("adoption")}
                />
                입양(처음 만난) 날로 볼게요
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-1 text-sm text-neutral-600">
              <input
                type="radio"
                checked={calendarType === "solar"}
                onChange={() => setCalendarType("solar")}
              />
              양력
            </label>
            <label className="flex items-center gap-1 text-sm text-neutral-600">
              <input
                type="radio"
                checked={calendarType === "lunar"}
                onChange={() => setCalendarType("lunar")}
              />
              음력
            </label>
          </div>

          <div>
            <span className="block text-sm font-medium text-neutral-700">
              {dateKind === "exact" ? "생년월일" : "입양일(처음 만난 날)"}
            </span>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="년"
                className="w-20 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="월"
                className="w-14 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="일"
                className="w-14 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
          </div>

          {dateKind === "exact" && (
            <div>
              <span className="block text-sm font-medium text-neutral-700">태어난 시각</span>
              <label className="flex items-center gap-1.5 text-sm text-neutral-600">
                <input
                  type="checkbox"
                  checked={timeUnknown}
                  onChange={(e) => setTimeUnknown(e.target.checked)}
                />
                태어난 시각을 몰라요
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <select
                  value={ampm}
                  disabled={timeUnknown}
                  onChange={(e) => setAmpm(e.target.value as AmPm)}
                  className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm disabled:bg-neutral-100 disabled:text-neutral-400"
                >
                  <option value="AM">오전</option>
                  <option value="PM">오후</option>
                </select>
                <select
                  value={hour12}
                  disabled={timeUnknown}
                  onChange={(e) => setHour12(e.target.value)}
                  className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm disabled:bg-neutral-100 disabled:text-neutral-400"
                >
                  {HOURS_12.map((h) => (
                    <option key={h} value={h}>
                      {h}시
                    </option>
                  ))}
                </select>
              </div>
              {timeUnknown && (
                <p className="mt-1 text-xs text-amber-600">
                  시각을 모르면 시주 없이 삼주(년·월·일)로만 풀이해요.
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700">견종 (선택)</label>
            <select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            >
              <option value="">믹스견 / 잘 모르겠어요</option>
              {BREED_HEALTH_DATA.map((b) => (
                <option key={b.breed} value={b.breed}>
                  {b.breed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-sm font-medium text-neutral-700">털색 (선택)</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {COAT_COLOR_OPTIONS.map((c) => (
                <label
                  key={c.value}
                  className="flex items-center gap-1 rounded-full border border-neutral-300 px-2.5 py-1 text-xs text-neutral-600"
                >
                  <input
                    type="radio"
                    name="coatColor"
                    checked={coatColorValue === c.value}
                    onChange={() => setCoatColorValue(c.value)}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-neutral-700">
              평소 기질 (선택, 여러 개 가능)
            </span>
            <div className="mt-1 flex flex-col gap-1.5">
              {TEMPERAMENT_OPTIONS.map((t) => (
                <label key={t.value} className="flex items-center gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={temperamentValues.includes(t.value)}
                    onChange={() => toggleTemperament(t.value)}
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            우리 아이 사주 보기 🐾
          </button>
        </form>
      )}

      {saju && fortune && (
        <section className="mt-6 space-y-5">
          <div className="rounded-2xl border border-orange-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg text-neutral-800">사주 원국</h2>
              <button onClick={handleReset} className="text-xs text-neutral-400 underline">
                다시 입력하기
              </button>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              {saju.solarDateText} · {saju.lunarDateText} · {saju.zodiacKo}띠
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <PillarBox title="년주" pillar={saju.yearPillar} />
              <PillarBox title="월주" pillar={saju.monthPillar} />
              <PillarBox title="일주" pillar={saju.dayPillar} />
              {saju.timePillar ? (
                <PillarBox title="시주" pillar={saju.timePillar} />
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-300 p-2 text-[11px] text-neutral-400">
                  시주
                  <br />
                  미상
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1.5">
              {wuxingOrder.map((key) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-neutral-500">{key}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-orange-300"
                      style={{ width: `${(saju.wuxingCount[key] / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-4 text-neutral-500">{saju.wuxingCount[key]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5">
            <h2 className="font-heading text-lg text-neutral-800">
              🎉 {name || "우리 아이"}의 성향 사주
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <ElementBadge element={fortune.dominant} />
              {fortune.secondary && <ElementBadge element={fortune.secondary} />}
            </div>
            <h3 className="mt-3 text-base font-bold text-neutral-800">{fortune.template.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{fortune.template.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fortune.template.traits.map((t) => (
                <span key={t} className="rounded-full bg-orange-50 px-2.5 py-1 text-xs text-orange-700">
                  #{t}
                </span>
              ))}
            </div>

            <p className="mt-4 border-l-2 border-orange-200 pl-3 text-sm leading-relaxed text-neutral-700">
              {overviewText}
            </p>

            {lucky && (
              <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-neutral-700">
                <p className="font-semibold text-amber-800">🍀 오늘의 행운 정보</p>
                <div className="mt-1.5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="text-neutral-400">산책 방향</div>
                    <div className="mt-0.5 font-medium text-neutral-700">{lucky.direction}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">어울리는 색</div>
                    <div className="mt-0.5 font-medium text-neutral-700">{lucky.color}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">행운의 숫자</div>
                    <div className="mt-0.5 font-medium text-neutral-700">{lucky.number}</div>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-4 rounded-lg bg-orange-50/60 p-2.5 text-sm text-neutral-700">
              🐾 이럴 때 이런 모습이에요 · {fortune.template.detail}
            </p>
            <p className="mt-3 text-sm text-neutral-700">
              <strong>강점</strong> · {fortune.template.strength}
            </p>
            <p className="mt-1 text-sm text-neutral-700">
              <strong>주의</strong> · {fortune.template.caution}
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <h2 className="font-heading text-lg text-sky-900">🩺 {healthInfo.breed} 건강 상식</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-sky-900">
              {healthInfo.commonIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-sky-800">💡 {healthInfo.careTip}</p>
            <p className="mt-3 text-[11px] text-sky-600">
              ※ 위 내용은 일반적인 견종 특성을 정리한 참고 정보이며 개별 진단이 아닙니다. 정확한
              건강 상태는 수의사와 상담해주세요. (사주 풀이와는 무관한 별도 정보입니다)
            </p>
          </div>

          <FollowGate title="보너스 콘텐츠 (공유 카드 · 궁합)">
            <div className="space-y-5">
              <ShareCard
                name={name}
                element={fortune.dominant}
                meta={fortune.meta}
                template={fortune.template}
              />
              <CompatibilitySection myName={name || "우리 아이"} myDominant={fortune.dominant} />
            </div>
          </FollowGate>
        </section>
      )}

      <footer className="mt-10 pb-4 text-center text-[11px] text-neutral-400">
        멍사주는 재미로 즐기는 콘텐츠입니다. 실제 건강·행동 판단은 수의사와 상담해주세요.
      </footer>
    </main>
  );
}

function PillarBox({
  title,
  pillar,
}: {
  title: string;
  pillar: { ganZhiKo: string; wuxingKo: string };
}) {
  return (
    <div className="rounded-lg border border-neutral-200 p-2">
      <div className="text-[11px] text-neutral-400">{title}</div>
      <div className="text-sm font-semibold text-neutral-800">{pillar.ganZhiKo}</div>
      <div className="text-[11px] text-neutral-500">오행 {pillar.wuxingKo}</div>
    </div>
  );
}
