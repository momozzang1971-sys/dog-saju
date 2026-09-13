import type { WuxingKey } from "../dog-saju";

/**
 * 견주가 체크하는 기질 문항 → 오행 가중치. 다중 선택 가능(체크박스).
 * 사주 계산 결과가 부족한 정보를 보완해주는 재미용 보정 장치.
 */
export interface TemperamentOption {
  value: string;
  label: string;
  element: WuxingKey;
}

export const TEMPERAMENT_OPTIONS: TemperamentOption[] = [
  { value: "energetic", label: "활발하고 에너지가 넘쳐요", element: "화" },
  { value: "calm", label: "차분하고 조용해요", element: "수" },
  { value: "cautious", label: "겁이 많고 조심스러워요", element: "금" },
  { value: "stubborn", label: "고집이 세고 자기주장이 강해요", element: "목" },
  { value: "gentle", label: "온순하고 사람을 잘 따라요", element: "토" },
];

export const TEMPERAMENT_WEIGHT = 2;
