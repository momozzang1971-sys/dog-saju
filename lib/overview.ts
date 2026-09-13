import type { WuxingKey } from "./dog-saju";
import { ELEMENT_META } from "./data/element-templates";
import { ELEMENT_CORE_CLAUSE, ELEMENT_SOLO_CLOSING } from "./data/element-overview";
import { getCompatibility } from "./data/compatibility";

/**
 * "총평" 문단을 만든다. 단순히 성향을 나열하지 않고, 오행 이름을 직접 언급하며
 * "왜 이런 성격인지"를 설명하는 사주풀이 톤의 3문장짜리 글을 조립한다.
 *
 * 부수 오행(secondary)이 있으면, 둘의 조합 이미지는 궁합 데이터(compatibility.ts)의
 * 관계 키워드를 그대로 재사용한다 — "물이 나무를 키워내는 사이" 같은 문구는 두 강아지
 * 사이의 궁합이든, 한 강아지 안의 두 기운이든 자연스럽게 쓸 수 있는 이미지라서다.
 */
export function buildOverviewText(
  name: string,
  dominant: WuxingKey,
  secondary: WuxingKey | null
): string {
  const dispName = name || "우리 아이";
  const domHanja = ELEMENT_META[dominant].hanja;
  const sentences: string[] = [
    `${dispName}는 ${dominant}(${domHanja}) 기운을 타고나 ${ELEMENT_CORE_CLAUSE[dominant]}.`,
  ];

  if (secondary) {
    const secHanja = ELEMENT_META[secondary].hanja;
    sentences.push(
      `동시에 ${secondary}(${secHanja})의 기운도 함께 있어서 ${ELEMENT_CORE_CLAUSE[secondary]}.`
    );
    const blendImage = getCompatibility(dominant, secondary).keyword.replace(/사이$/, "조합");
    sentences.push(`두 기운이 마치 '${blendImage}'처럼 어우러져 있는 셈이에요.`);
  } else {
    sentences.push(ELEMENT_SOLO_CLOSING[dominant]);
  }

  return sentences.join(" ");
}
