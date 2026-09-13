import { Solar, Lunar } from "lunar-javascript";
import { ganZhiToKo, ganToKo, wuxingPairToKo, zhiAnimalToKo } from "./ganzhi-ko";

/**
 * 사람 사주(D:\클로드_Ai\사주풀이\saju-app\lib\saju.ts)의 계산 로직을 강아지 앱에 맞게
 * 단순화해서 이식한 버전. 십신/대운처럼 이 앱에서 쓰지 않는 개념은 걷어내고
 * 년주·월주·일주(+시주, 알 때만)와 오행 분포만 남겼다.
 */

export type BirthDateKind = "exact" | "adoption";

export interface DogSajuInput {
  /** 생일 종류: 정확한 생일인지, 입양(처음 만난 날) 대체인지 */
  dateKind: BirthDateKind;
  calendarType: "solar" | "lunar";
  year: number;
  month: number; // 1~12, 음력 윤달은 음수
  day: number;
  /** 태어난 시각(0~23). 모르면 null — 입양일 대체인 경우 항상 null 취급 */
  hour: number | null;
}

export interface PillarKo {
  ganZhiKo: string;
  ganZhiHan: string;
  wuxingKo: string;
}

export type WuxingKey = "목" | "화" | "토" | "금" | "수";

export interface DogSajuResult {
  input: DogSajuInput;
  solarDateText: string;
  lunarDateText: string;
  /** 시주를 계산하지 못했는지 (시간 모름 또는 입양일 대체) */
  timeUnknown: boolean;
  yearPillar: PillarKo;
  monthPillar: PillarKo;
  dayPillar: PillarKo;
  timePillar: PillarKo | null;
  dayMasterKo: string;
  /** 사주 6~8글자 속 오행 개수 */
  wuxingCount: Record<WuxingKey, number>;
  /** 띠 (십이지 동물) */
  zodiacKo: string;
}

function buildPillar(ganHan: string, zhiHan: string, wuxingHan: string): PillarKo {
  return {
    ganZhiKo: ganZhiToKo(ganHan + zhiHan),
    ganZhiHan: ganHan + zhiHan,
    wuxingKo: wuxingPairToKo(wuxingHan),
  };
}

export function calculateDogSaju(input: DogSajuInput): DogSajuResult {
  // 입양일 대체는 정확한 시각을 알 수 없다는 전제이므로 항상 시간 모름으로 처리한다.
  const timeUnknown = input.dateKind === "adoption" || input.hour === null;
  const hourForCalc = timeUnknown ? 12 : (input.hour as number); // 정오는 계산용 더미값 — 연/월/일주엔 영향 없음

  const lunar =
    input.calendarType === "solar"
      ? Solar.fromYmdHms(input.year, input.month, input.day, hourForCalc, 0, 0).getLunar()
      : Lunar.fromYmdHms(input.year, input.month, input.day, hourForCalc, 0, 0);

  const solar = lunar.getSolar();
  const ec = lunar.getEightChar();

  const yearPillar = buildPillar(ec.getYearGan(), ec.getYearZhi(), ec.getYearWuXing());
  const monthPillar = buildPillar(ec.getMonthGan(), ec.getMonthZhi(), ec.getMonthWuXing());
  const dayPillar = buildPillar(ec.getDayGan(), ec.getDayZhi(), ec.getDayWuXing());
  const timePillar = timeUnknown
    ? null
    : buildPillar(ec.getTimeGan(), ec.getTimeZhi(), ec.getTimeWuXing());

  const wuxingCount: Record<WuxingKey, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  const pillarsForCount = timeUnknown
    ? [yearPillar, monthPillar, dayPillar]
    : [yearPillar, monthPillar, dayPillar, timePillar as PillarKo];
  for (const p of pillarsForCount) {
    for (const ch of p.wuxingKo) {
      if (ch in wuxingCount) wuxingCount[ch as WuxingKey]++;
    }
  }

  return {
    input,
    solarDateText: `${solar.getYear()}. ${solar.getMonth()}. ${solar.getDay()}.${
      timeUnknown ? "" : ` ${hourForCalc}시`
    }`,
    lunarDateText: `음력 ${lunar.getYear()}. ${Math.abs(lunar.getMonth())}${
      lunar.getMonth() < 0 ? "(윤월)" : ""
    }. ${lunar.getDay()}.`,
    timeUnknown,
    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,
    dayMasterKo: ganToKo(ec.getDayGan()),
    wuxingCount,
    zodiacKo: zhiAnimalToKo(ec.getYearZhi()),
  };
}
