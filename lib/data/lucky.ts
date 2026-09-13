import type { WuxingKey } from "../dog-saju";

/**
 * 전통 오행 대응표(방위·색·숫자) 기준의 "행운 정보". 실제 명리학 감정이 아니라
 * 재미로 보는 콘텐츠이며, 계산 없이 오행별로 고정된 값을 보여준다.
 */
export interface LuckyInfo {
  direction: string;
  color: string;
  number: string;
}

export const LUCKY_INFO: Record<WuxingKey, LuckyInfo> = {
  목: { direction: "동쪽", color: "초록·청록 계열", number: "3, 8" },
  화: { direction: "남쪽", color: "빨강·주황 계열", number: "2, 7" },
  토: { direction: "집 근처의 익숙한 산책로", color: "노랑·베이지 계열", number: "5, 10" },
  금: { direction: "서쪽", color: "흰색·은색(그레이) 계열", number: "4, 9" },
  수: { direction: "북쪽", color: "검정·남색 계열", number: "1, 6" },
};
