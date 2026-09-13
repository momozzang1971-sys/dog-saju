import type { DogSajuResult, WuxingKey } from "./dog-saju";
import { COAT_COLOR_OPTIONS, COAT_COLOR_WEIGHT } from "./data/coat-color-map";
import { TEMPERAMENT_OPTIONS, TEMPERAMENT_WEIGHT } from "./data/temperament-map";
import { ELEMENT_TEMPLATES, ELEMENT_META, type ElementTemplate } from "./data/element-templates";

export interface DogFortuneInput {
  saju: DogSajuResult;
  coatColorValue: string | null; // COAT_COLOR_OPTIONS의 value
  temperamentValues: string[]; // TEMPERAMENT_OPTIONS의 value 목록(중복 선택 가능)
  /** 결과 재현성(같은 아이는 항상 같은 카드)을 위한 시드 문자열, 보통 이름+생년월일 */
  seed: string;
}

export interface DogFortuneResult {
  scores: Record<WuxingKey, number>;
  dominant: WuxingKey;
  secondary: WuxingKey | null; // 1위와 점수 차이가 크지 않으면 2위도 함께 언급
  template: ElementTemplate;
  meta: (typeof ELEMENT_META)[WuxingKey];
  /**
   * 확장 지점 — 1차 버전에서는 항상 undefined.
   * 나중에 Gemini 등 AI 코멘트를 붙일 때 이 필드만 채우면 된다.
   */
  aiComment?: string;
}

const ELEMENT_KEYS: WuxingKey[] = ["목", "화", "토", "금", "수"];

/** 문자열을 안정적인(같은 입력 → 같은 출력) 정수 해시로 변환 */
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function computeDogFortune(input: DogFortuneInput): DogFortuneResult {
  const scores: Record<WuxingKey, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

  // 1) 사주 오행 분포를 그대로 점수에 반영
  for (const key of ELEMENT_KEYS) {
    scores[key] += input.saju.wuxingCount[key];
  }

  // 2) 털색 보정
  const coat = COAT_COLOR_OPTIONS.find((c) => c.value === input.coatColorValue);
  if (coat?.element) {
    scores[coat.element] += COAT_COLOR_WEIGHT;
  }

  // 3) 기질 보정 (중복 선택 가능)
  for (const value of input.temperamentValues) {
    const opt = TEMPERAMENT_OPTIONS.find((t) => t.value === value);
    if (opt) scores[opt.element] += TEMPERAMENT_WEIGHT;
  }

  // 4) 우세 오행 결정 (동점이면 오행 순서상 앞선 것 우선 — 결정론적으로)
  const sorted = [...ELEMENT_KEYS].sort((a, b) => scores[b] - scores[a]);
  const dominant = sorted[0];
  const secondary =
    sorted[1] && scores[sorted[1]] > 0 && scores[dominant] - scores[sorted[1]] <= 1
      ? sorted[1]
      : null;

  // 5) 같은 오행이어도 이름+생일 시드로 다른 버전의 문구가 뽑히게
  const templates = ELEMENT_TEMPLATES[dominant];
  const template = templates[hashSeed(input.seed) % templates.length];

  return {
    scores,
    dominant,
    secondary,
    template,
    meta: ELEMENT_META[dominant],
  };
}
