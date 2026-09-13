/**
 * lunar-javascript 라이브러리는 천간/지지/오행/십신을 한자(중국어)로 반환한다.
 * 한국식 사주 표기(한글 독음)로 보여주기 위한 변환 테이블.
 */

// 천간(天干) 10개
export const GAN_KO: Record<string, string> = {
  甲: "갑",
  乙: "을",
  丙: "병",
  丁: "정",
  戊: "무",
  己: "기",
  庚: "경",
  辛: "신",
  壬: "임",
  癸: "계",
};

// 지지(地支) 12개
export const ZHI_KO: Record<string, string> = {
  子: "자",
  丑: "축",
  寅: "인",
  卯: "묘",
  辰: "진",
  巳: "사",
  午: "오",
  未: "미",
  申: "신",
  酉: "유",
  戌: "술",
  亥: "해",
};

// 오행(五行) 5개
export const WUXING_KO: Record<string, string> = {
  木: "목",
  火: "화",
  土: "토",
  金: "금",
  水: "수",
};

// 십신(十神) 10개 — lunar-javascript가 반환하는 한자 용어 기준
export const SHISHEN_KO: Record<string, string> = {
  比肩: "비견",
  劫财: "겁재",
  食神: "식신",
  伤官: "상관",
  偏财: "편재",
  正财: "정재",
  七杀: "편관", // 칠살 = 편관
  正官: "정관",
  偏印: "편인",
  正印: "정인",
};

const ZHI_ANIMAL_KO: Record<string, string> = {
  子: "쥐",
  丑: "소",
  寅: "호랑이",
  卯: "토끼",
  辰: "용",
  巳: "뱀",
  午: "말",
  未: "양",
  申: "원숭이",
  酉: "닭",
  戌: "개",
  亥: "돼지",
};

/** 한자 간지 한 글자(간 또는 지)를 한글 독음으로 변환 */
export function ganToKo(han: string): string {
  return GAN_KO[han] ?? han;
}

export function zhiToKo(han: string): string {
  return ZHI_KO[han] ?? han;
}

/** "甲子" 같은 두 글자 간지 문자열을 "갑자"로 변환 */
export function ganZhiToKo(ganZhi: string): string {
  if (!ganZhi || ganZhi.length < 2) return ganZhi;
  const gan = ganZhi[0];
  const zhi = ganZhi[1];
  return `${ganToKo(gan)}${zhiToKo(zhi)}`;
}

/** "木火" 같은 두 글자 오행 문자열을 "목화"로 변환 */
export function wuxingPairToKo(pair: string): string {
  return pair
    .split("")
    .map((ch) => WUXING_KO[ch] ?? ch)
    .join("");
}

export function shishenToKo(han: string): string {
  return SHISHEN_KO[han] ?? han;
}

export function zhiAnimalToKo(zhiHan: string): string {
  return ZHI_ANIMAL_KO[zhiHan] ?? zhiHan;
}
