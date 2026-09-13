"use client";

import { useState, useSyncExternalStore } from "react";
import { loadDogProfile } from "@/lib/profile-storage";
import { getTodayElement } from "@/lib/daily";
import { getCompatibility } from "@/lib/data/compatibility";
import { DAILY_MOOD_MESSAGES } from "@/lib/data/daily-mood";
import ElementBadge from "./ElementBadge";

// localStorage는 브라우저에만 있으므로, 이벤트 구독은 필요 없고(같은 탭에서는
// 변경 알림이 오지 않음) 서버 렌더링 시점엔 항상 null을 반환해 하이드레이션 불일치를 피한다.
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

/**
 * 이전에 결과를 본 적 있으면(localStorage) 재방문 시 "오늘의 기분" 미니 카드를 보여준다.
 * "지난번에 확인한"이라는 문구와 닫기(×) 버튼을 둬서, 다른 아이를 새로 입력하려는
 * 사용자가 이걸 "지금 결과가 그대로 남아있다"고 오해하지 않게 한다.
 */
export default function DailyMoodBanner() {
  const profile = useSyncExternalStore(subscribe, loadDogProfile, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  if (!profile || dismissed) return null;

  const today = getTodayElement();
  const compat = getCompatibility(profile.dominant, today);
  const pool = DAILY_MOOD_MESSAGES[compat.type];
  const dayIndex = new Date().getDate() % pool.length;
  const message = pool[dayIndex];

  return (
    <div className="relative mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 pr-9">
      <button
        onClick={() => setDismissed(true)}
        aria-label="닫기"
        title="닫기"
        className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
      >
        ✕
      </button>
      <p className="text-sm font-semibold text-amber-800">
        🐾 지난번에 확인한 {profile.name}의 오늘 기분
      </p>
      <div className="mt-2 flex items-center gap-2 text-xs text-neutral-600">
        <span>우리 아이</span>
        <ElementBadge element={profile.dominant} />
        <span>· 오늘</span>
        <ElementBadge element={today} />
      </div>
      <p className="mt-2 text-sm text-neutral-700">{message}</p>
    </div>
  );
}
