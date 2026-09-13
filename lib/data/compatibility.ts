import type { WuxingKey } from "../dog-saju";

/** 오행 상생(生): 목생화, 화생토, 토생금, 금생수, 수생목 */
const SHENG_NEXT: Record<WuxingKey, WuxingKey> = {
  목: "화",
  화: "토",
  토: "금",
  금: "수",
  수: "목",
};

/** 오행 상극(克): 목극토, 토극수, 수극화, 화극금, 금극목 */
const KE_NEXT: Record<WuxingKey, WuxingKey> = {
  목: "토",
  토: "수",
  수: "화",
  화: "금",
  금: "목",
};

export type CompatibilityType = "상생" | "상극" | "비화";

export interface CompatibilityResult {
  type: CompatibilityType;
  score: number; // 0~100, 재미용 지표
  message: string;
}

/**
 * 두 우세 오행 사이의 궁합을 오행 상생상극 이론으로 판정한다.
 * 방향(누가 누구를 생/극 하는지)은 재미 콘텐츠 특성상 구분하지 않고 합쳐서 본다.
 */
export function getCompatibility(a: WuxingKey, b: WuxingKey): CompatibilityResult {
  if (a === b) {
    return {
      type: "비화",
      score: 78,
      message: "같은 기운을 가진 사이라 죽이 잘 맞고 편안해요. 다만 취향이 겹쳐 은근히 신경전이 있을 수도 있어요.",
    };
  }
  if (SHENG_NEXT[a] === b || SHENG_NEXT[b] === a) {
    return {
      type: "상생",
      score: 92,
      message: "서로 기운을 북돋아주는 상생 관계예요! 함께 있으면 시너지가 나는 찰떡궁합이에요.",
    };
  }
  if (KE_NEXT[a] === b || KE_NEXT[b] === a) {
    return {
      type: "상극",
      score: 55,
      message: "티격태격할 수 있는 상극 관계지만, 서로 다른 매력에 이끌리는 케이스도 많아요. 서로의 속도를 존중해주세요.",
    };
  }
  return { type: "비화", score: 70, message: "무난하게 잘 어울리는 사이예요." };
}
