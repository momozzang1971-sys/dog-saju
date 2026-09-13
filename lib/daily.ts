import { Solar } from "lunar-javascript";
import type { WuxingKey } from "./dog-saju";
import { wuxingPairToKo } from "./ganzhi-ko";

/** 오늘 날짜의 일주 오행 중 첫 글자(일간 오행)를 "오늘의 기운"으로 사용한다. */
export function getTodayElement(): WuxingKey {
  const now = new Date();
  const solar = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const ec = solar.getLunar().getEightChar();
  const pair = wuxingPairToKo(ec.getDayWuXing());
  return (pair[0] as WuxingKey) ?? "토";
}
