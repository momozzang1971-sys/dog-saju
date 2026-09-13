"use client";

import { useState, type ReactNode } from "react";
import { INSTAGRAM_PROFILE_URL } from "@/lib/config";

/**
 * 정직 기반(honor system) 소프트 게이트.
 * 실제 팔로우 여부는 검증하지 않는다 — Instagram API로 검증하려면 비즈니스 인증/앱 심사가
 * 필요하고 정책 리스크도 있어 이 앱에서는 의도적으로 신뢰 기반 방식을 쓴다.
 */
export default function FollowGate({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) return <>{children}</>;

  return (
    <div className="rounded-2xl border border-dashed border-pink-300 bg-pink-50 p-5 text-center">
      <p className="text-sm font-semibold text-pink-700">🔒 {title}</p>
      <p className="mt-1 text-xs text-neutral-600">
        인스타그램 팔로우하고 보너스 콘텐츠를 열어보세요!
      </p>
      <a
        href={INSTAGRAM_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-2 text-sm font-semibold text-white"
      >
        인스타 팔로우 하러 가기
      </a>
      <div className="mt-3">
        <label className="inline-flex items-center gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={unlocked}
            onChange={(e) => setUnlocked(e.target.checked)}
          />
          팔로우 완료했어요
        </label>
      </div>
    </div>
  );
}
