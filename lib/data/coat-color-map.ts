import type { WuxingKey } from "../dog-saju";

/**
 * 전통 오행-색상 대응(청=목, 적=화, 황=토, 백=금, 흑=수)을 참고해
 * 강아지 털색을 오행에 매칭한 표. 명리학 정설이 아니라 재미 콘텐츠용 보정 규칙이다.
 */
export interface CoatColorOption {
  value: string;
  label: string;
  element: WuxingKey | null; // null = 특정 오행에 치우치지 않음(믹스/기타)
}

export const COAT_COLOR_OPTIONS: CoatColorOption[] = [
  { value: "white", label: "흰색", element: "금" },
  { value: "black", label: "검은색", element: "수" },
  { value: "brown", label: "갈색", element: "목" },
  { value: "golden", label: "황금색/크림색", element: "토" },
  { value: "red", label: "붉은색/적갈색", element: "화" },
  { value: "mixed", label: "여러 색이 섞여있어요", element: null },
];

export const COAT_COLOR_WEIGHT = 2;
