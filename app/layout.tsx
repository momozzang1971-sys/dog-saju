import type { Metadata } from "next";
import { Gowun_Dodum, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const gowunDodum = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "멍사주 - 우리 아이 성향 풀이",
  description: "생일(또는 입양일)로 보는 우리 강아지 성향 사주, 재미로 보는 무료 멍사주",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${gowunDodum.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
