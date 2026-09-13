/**
 * 견종별 대표 호발 질환 참고 정보.
 *
 * 주의: 이 데이터는 "일반적으로 널리 알려진 견종 특성"을 요약한 참고용 정보이며,
 * 사주/오행 계산과는 전혀 무관한 별도 데이터다. 개별 진단이 아니므로 항상
 * 디스클레이머와 함께 보여줘야 한다 (컴포넌트에서 처리).
 */
export interface BreedHealthInfo {
  breed: string;
  commonIssues: string[];
  careTip: string;
}

export const BREED_HEALTH_DATA: BreedHealthInfo[] = [
  {
    breed: "말티즈",
    commonIssues: ["슬개골 탈구", "승모판 폐쇄부전증(심장)", "눈물자국/누관 막힘"],
    careTip: "무리한 점프나 계단 오르내리기를 줄이고, 정기 심장 청진을 챙겨주세요.",
  },
  {
    breed: "푸들",
    commonIssues: ["슬개골 탈구", "외이염", "진행성 망막위축(눈)"],
    careTip: "귀를 자주 확인해 통풍이 잘 되게 관리해주세요.",
  },
  {
    breed: "포메라니안",
    commonIssues: ["슬개골 탈구", "기관 허탈(기침)", "치주 질환"],
    careTip: "목줄보다 하네스를 사용하고, 양치 관리를 신경 써주세요.",
  },
  {
    breed: "시츄",
    commonIssues: ["단두종 호흡기 증후군", "안구 질환(각막 손상)", "외이염"],
    careTip: "더운 날씨엔 호흡이 힘들 수 있으니 산책 시간을 조절해주세요.",
  },
  {
    breed: "치와와",
    commonIssues: ["슬개골 탈구", "수두증(어릴 때)", "저혈당(소형 특성)"],
    careTip: "급격한 온도 변화와 높은 곳에서의 점프를 주의해주세요.",
  },
  {
    breed: "웰시코기",
    commonIssues: ["추간판 질환(허리디스크)", "고관절 이형성증", "비만"],
    careTip: "다리가 짧아 허리 부담이 크니, 계단/점프를 최소화해주세요.",
  },
  {
    breed: "닥스훈트",
    commonIssues: ["추간판 질환(허리디스크)", "비만", "치주 질환"],
    careTip: "체형 특성상 허리디스크 위험이 높아 체중 관리가 특히 중요해요.",
  },
  {
    breed: "골든리트리버",
    commonIssues: ["고관절/팔꿈치 이형성증", "종양성 질환", "피부 알레르기"],
    careTip: "적정 체중 유지와 정기 건강검진(특히 나이가 들수록)을 챙겨주세요.",
  },
  {
    breed: "래브라도리트리버",
    commonIssues: ["고관절 이형성증", "비만", "귀 질환"],
    careTip: "식탐이 많은 편이라 사료량 조절이 중요해요.",
  },
  {
    breed: "진돗개",
    commonIssues: ["아토피성 피부염", "갑상선 질환", "외이염"],
    careTip: "털 관리와 피부 상태를 주기적으로 살펴봐주세요.",
  },
  {
    breed: "비숑프리제",
    commonIssues: ["슬개골 탈구", "피부 알레르기", "방광결석"],
    careTip: "털이 곱슬해 피부가 눌릴 수 있으니 꾸준한 미용 관리가 필요해요.",
  },
  {
    breed: "프렌치불독",
    commonIssues: ["단두종 호흡기 증후군", "피부 주름 염증", "추간판 질환"],
    careTip: "더위에 약하니 여름철 산책은 이른 아침/저녁으로 피해주세요.",
  },
  {
    breed: "시베리안허스키",
    commonIssues: ["고관절 이형성증", "눈 질환(백내장 등)", "피부 질환"],
    careTip: "활동량이 많은 편이라 충분한 운동량 확보가 중요해요.",
  },
  {
    breed: "코카스파니엘",
    commonIssues: ["외이염", "지루성 피부염", "심장 질환"],
    careTip: "귀가 길게 늘어져 있어 통풍 관리를 자주 해주세요.",
  },
  {
    breed: "슈나우저",
    commonIssues: ["췌장염", "요로결석", "고지혈증"],
    careTip: "기름진 음식은 피하고 정기적인 혈액검사를 챙겨주세요.",
  },
  {
    breed: "사모예드",
    commonIssues: ["고관절 이형성증", "당뇨", "신장 질환"],
    careTip: "풍성한 털 안쪽 피부 상태를 자주 확인해주세요.",
  },
];

export const MIXED_OR_UNKNOWN_BREED_INFO: BreedHealthInfo = {
  breed: "믹스견 / 견종을 몰라요",
  commonIssues: [
    "믹스견은 부모 견종 조합에 따라 건강 특성이 다양해요",
    "특정 질환에 치우치기보다 전반적인 정기검진이 중요해요",
  ],
  careTip: "체형과 생활 습관을 관찰하며 1년에 한 번 이상 정기 건강검진을 받아보세요.",
};

export function findBreedHealthInfo(breed: string | null): BreedHealthInfo {
  if (!breed) return MIXED_OR_UNKNOWN_BREED_INFO;
  return (
    BREED_HEALTH_DATA.find((b) => b.breed === breed) ?? MIXED_OR_UNKNOWN_BREED_INFO
  );
}
