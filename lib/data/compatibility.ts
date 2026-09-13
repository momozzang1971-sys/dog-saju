import type { WuxingKey } from "../dog-saju";

export type CompatibilityType = "상생" | "상극" | "비화";

export interface CompatibilityResult {
  type: CompatibilityType;
  score: number; // 0~100, 재미용 지표
  /** 관계를 한 줄로 요약하는 이미지 문구 (예: "물이 나무를 키워내는 사이") */
  keyword: string;
  message: string;
  /** 함께 하면 좋을 만한 활동 팁 */
  activityTip: string;
}

interface PairEntry {
  type: CompatibilityType;
  score: number;
  keyword: string;
  message: string;
  activityTip: string;
}

/**
 * 오행 5개 사이의 모든 조합(같은 오행 5가지 + 서로 다른 오행 10가지 = 15가지)에
 * 각각 다른 문구를 준다. 상생/상극이라는 관계 이름만 반복하지 않고, 두 오행이
 * 구체적으로 어떤 이미지로 얽히는지(나무-불-흙-쇠-물)를 담아 궁합마다 실제로
 * 읽을거리가 있게 만든다.
 */
const PAIR_DATA: Record<string, PairEntry> = {
  // 상생(生) — 서로 북돋아주는 조합
  "목화": {
    type: "상생",
    score: 92,
    keyword: "나무가 불씨를 지펴주는 사이",
    message: "목의 성장 에너지가 화의 열정에 불을 붙여주는 조합이에요. 한쪽이 먼저 움직이면 다른 한쪽이 신나게 따라붙어요.",
    activityTip: "같이 새로운 산책 코스를 탐험해보세요. 둘 다 눈을 반짝일 거예요.",
  },
  "화토": {
    type: "상생",
    score: 90,
    keyword: "타고 남은 재가 땅을 기름지게 하는 사이",
    message: "화의 열정이 토에게 안정적인 자신감을 심어줘요. 한쪽의 텐션이 다른 한쪽의 여유로 자연스럽게 이어지는 조합이에요.",
    activityTip: "실컷 신나게 놀고 나서 함께 낮잠 타임을 가지면 딱이에요.",
  },
  "토금": {
    type: "상생",
    score: 91,
    keyword: "흙 속에서 보석이 빚어지는 사이",
    message: "토의 안정감이 금의 예민함을 편안하게 감싸줘요. 든든한 뒷배 같은 조합이에요.",
    activityTip: "새로운 곳에 갈 땐 토 기운 쪽이 앞장서면 금 기운 쪽도 마음을 놓아요.",
  },
  "금수": {
    type: "상생",
    score: 89,
    keyword: "차가운 금속에 이슬이 맺히는 사이",
    message: "금의 섬세함이 수의 깊은 생각에 좋은 자극을 줘요. 서로의 신중함을 알아봐주는 조합이에요.",
    activityTip: "둘 다 조용한 걸 좋아하니, 느긋한 실내 놀이가 잘 맞아요.",
  },
  "수목": {
    type: "상생",
    score: 90,
    keyword: "물이 나무를 키워내는 사이",
    message: "수의 차분함이 목의 성장 에너지에 든든한 자양분이 돼줘요. 한쪽이 쉬면 다른 한쪽도 자연스레 속도를 맞춰요.",
    activityTip: "번갈아 리드하며 산책하면 둘 다 편안해하는 조합이에요.",
  },
  // 상극(克) — 부딪히지만 그 나름의 케미가 있는 조합
  "목토": {
    type: "상극",
    score: 58,
    keyword: "뿌리가 흙을 파고드는 사이",
    message: "목의 고집과 토의 여유가 은근히 부딪힐 수 있어요. 그래도 시간이 지나면 나름의 균형을 찾아가는 편이에요.",
    activityTip: "정해진 규칙을 미리 정해두면 다툼 없이 잘 지낼 수 있어요.",
  },
  "토수": {
    type: "상극",
    score: 56,
    keyword: "둑이 물길을 막아서는 사이",
    message: "토의 안정 지향과 수의 유연함이 서로 다른 속도라 처음엔 어색할 수 있어요. 서로의 페이스를 인정하면 편안해져요.",
    activityTip: "억지로 같이 놀리기보다 각자의 시간을 존중해주세요.",
  },
  "수화": {
    type: "상극",
    score: 54,
    keyword: "물이 불씨를 가라앉히는 사이",
    message: "수의 차분함이 화의 열정을 식힐 때가 있어요. 화 기운 쪽은 답답할 수 있지만, 덕분에 과열되지 않고 안정을 찾기도 해요.",
    activityTip: "신나게 놀 땐 잠깐씩 쉬는 타이밍을 수 기운 쪽이 잡아주면 좋아요.",
  },
  "화금": {
    type: "상극",
    score: 55,
    keyword: "뜨거운 불이 쇠를 녹이는 사이",
    message: "화의 저돌적인 에너지가 금의 섬세함을 가끔 당황스럽게 할 수 있어요. 서서히 서로의 속도를 맞춰가면 괜찮아져요.",
    activityTip: "화 기운 쪽이 너무 들이대지 않게, 첫 만남은 천천히 진행해주세요.",
  },
  "금목": {
    type: "상극",
    score: 57,
    keyword: "도끼가 나무를 다듬는 사이",
    message: "금의 예민한 원칙과 목의 고집이 부딪힐 수 있는 조합이에요. 다만 서로를 자극하며 은근히 함께 성장하는 케이스도 많아요.",
    activityTip: "각자의 루틴을 존중하면서 천천히 거리를 좁혀가 보세요.",
  },
  // 비화(같은 오행) — 닮아서 편하지만 취향이 겹치는 조합
  "목목": {
    type: "비화",
    score: 76,
    keyword: "같은 나무끼리 나란히 자라는 사이",
    message: "둘 다 호기심 많고 은근히 고집 있는 성향이라 죽이 잘 맞아요. 다만 원하는 게 겹치면 은근한 신경전이 생길 수 있어요.",
    activityTip: "좋아하는 장난감은 두 개씩 준비해두면 다툴 일이 줄어요.",
  },
  "화화": {
    type: "비화",
    score: 80,
    keyword: "불꽃 두 개가 함께 타오르는 사이",
    message: "둘 다 텐션이 높아서 만나면 순식간에 시끌벅적해져요. 에너지가 배가 되는 유쾌한 조합이에요.",
    activityTip: "실컷 논 뒤엔 같이 진정하는 시간을 꼭 가져주세요.",
  },
  "토토": {
    type: "비화",
    score: 75,
    keyword: "넓은 땅이 나란히 펼쳐진 사이",
    message: "둘 다 느긋하고 무던해서 부딪힐 일이 별로 없는 편안한 조합이에요.",
    activityTip: "가만히 있으면 늘어지기 쉬우니, 가끔은 같이 몸을 움직여주세요.",
  },
  "금금": {
    type: "비화",
    score: 68,
    keyword: "보석 두 개가 나란히 놓인 사이",
    message: "둘 다 예민하고 조심스러워서 서로를 이해하기까진 시간이 좀 걸려요. 한번 친해지면 서로의 루틴을 존중해줘요.",
    activityTip: "첫 만남은 짧게, 여러 번 나눠서 시도해보세요.",
  },
  "수수": {
    type: "비화",
    score: 78,
    keyword: "물줄기 두 개가 합쳐지는 사이",
    message: "둘 다 조용하고 관찰력이 좋아서 말없이도 잘 통하는 편이에요.",
    activityTip: "둘만의 조용한 시간을 방해하지 않는 게 포인트예요.",
  },
};

/** a+b, b+a 어느 순서로 와도 같은 항목을 찾도록 오행 정순서(목화토금수) 기준으로 키를 만든다. */
const ORDER: WuxingKey[] = ["목", "화", "토", "금", "수"];
function pairKey(a: WuxingKey, b: WuxingKey): string {
  if (a === b) return `${a}${a}`;
  const [first, second] = ORDER.indexOf(a) < ORDER.indexOf(b) ? [a, b] : [b, a];
  // 상생/상극은 방향이 있어(목화=상생이지만 화목도 같은 관계로 취급) PAIR_DATA에
  // 정방향 키만 등록했으므로, 두 방향 다 찾아보고 없으면 반대 순서로 조회한다.
  const forward = `${first}${second}`;
  if (PAIR_DATA[forward]) return forward;
  const backward = `${second}${first}`;
  if (PAIR_DATA[backward]) return backward;
  return forward;
}

/**
 * 두 우세 오행 사이의 궁합을 오행 상생상극 이론으로 판정한다.
 * 15가지 조합(같은 오행 5 + 서로 다른 오행 10) 각각에 고유한 문구를 붙여,
 * "상생이라 좋아요"처럼 뭉뚱그린 한 줄이 아니라 실제로 읽을 내용이 있게 한다.
 */
export function getCompatibility(a: WuxingKey, b: WuxingKey): CompatibilityResult {
  const entry = PAIR_DATA[pairKey(a, b)];
  return {
    type: entry.type,
    score: entry.score,
    keyword: entry.keyword,
    message: entry.message,
    activityTip: entry.activityTip,
  };
}
