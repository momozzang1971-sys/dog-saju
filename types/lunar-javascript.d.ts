/**
 * lunar-javascript는 자체 타입 정의를 제공하지 않는 순수 JS 라이브러리다.
 * 세세한 타입 대신 any로 선언해 컴파일을 통과시키고,
 * 실제 사용은 lib/dog-saju.ts, lib/daily.ts 등 소수의 파일에서만 이루어지도록 한다.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "lunar-javascript" {
  export const Solar: any;
  export const Lunar: any;
  export const EightChar: any;
}
