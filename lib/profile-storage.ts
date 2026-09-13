import type { WuxingKey } from "./dog-saju";

export interface SavedDogProfile {
  name: string;
  dominant: WuxingKey;
  savedAt: string; // ISO date
}

const STORAGE_KEY = "dogSajuProfile";

/** 서버에는 아무것도 저장하지 않고 이 브라우저 안(localStorage)에만 남긴다. */
export function saveDogProfile(profile: SavedDogProfile) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // 프라이빗 브라우징 등으로 저장이 막혀도 앱 동작에는 지장 없게 조용히 무시
  }
}

// useSyncExternalStore(DailyMoodBanner)의 getSnapshot으로 쓰이므로, 같은 localStorage
// 값이면 항상 같은 객체 참조를 반환해야 한다(그렇지 않으면 매 렌더마다 "변경됨"으로
// 인식돼 무한 렌더링 루프가 생긴다).
let cachedRaw: string | null = null;
let cachedProfile: SavedDogProfile | null = null;

export function loadDogProfile(): SavedDogProfile | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedProfile;
    cachedRaw = raw;
    cachedProfile = raw ? (JSON.parse(raw) as SavedDogProfile) : null;
    return cachedProfile;
  } catch {
    return null;
  }
}
