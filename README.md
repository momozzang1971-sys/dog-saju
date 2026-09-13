# 멍사주 (강아지 사주풀이)

생일(또는 입양일)로 우리 강아지 성향을 재미로 풀어보는 무료 웹앱. 전부 브라우저에서
계산되는 정적 로직이라(AI 호출 없음) 서버 비용 없이 Vercel 무료 플랜으로 배포할 수 있다.

## 로컬 실행

```bash
npm install
npm run dev
```

<http://localhost:3000> 에서 확인.

## 배포 전 꼭 할 일

1. **인스타 링크 등록**: [`lib/config.ts`](lib/config.ts)의 `INSTAGRAM_PROFILE_URL`을
   실제 인스타그램 프로필 주소로 바꾼다. (팔로우 게이트 버튼이 이 주소로 이동함)
2. `npm run build`로 한 번 로컬 빌드가 통과하는지 확인.

## 배포 방법 (GitHub + Vercel, 둘 다 무료)

1. GitHub에 새 리포지토리를 만들고 이 프로젝트를 push한다.
   ```bash
   git remote add origin <내_github_저장소_주소>
   git branch -M main
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com)에 GitHub 계정으로 로그인 → "Add New Project" →
   방금 만든 리포지토리 선택 → 별다른 설정 변경 없이 Deploy.
   - 카드 등록 불필요 (Hobby 무료 플랜).
   - 배포가 끝나면 `https://프로젝트이름.vercel.app` 형태의 공개 주소가 생긴다.
3. 그 주소를 인스타그램 프로필 편집의 "링크"에 등록하면 끝.

이후 `main` 브랜치에 새 커밋을 push할 때마다 Vercel이 자동으로 재배포한다.

## 구조 요약

- `lib/dog-saju.ts` — 생년월일(시)로 사주 원국(오행) 계산 (lunar-javascript 기반)
- `lib/dog-fortune.ts` — 오행 + 털색 + 기질 점수를 합산해 우세 오행/성향 문구 결정
- `lib/data/` — 성향 문구, 털색/기질 매핑, 견종별 건강 상식, 궁합 매트릭스 (전부 정적 데이터)
- `components/` — 결과 카드, 팔로우 게이트, 궁합, 공유용 이미지 카드, 오늘의 기분 배너
- `app/page.tsx` — 입력 폼 + 결과 화면 전체

AI(Gemini 등) 코멘트 기능은 1차 버전에 포함하지 않았다. 나중에 추가하려면
`lib/dog-fortune.ts`의 `DogFortuneResult.aiComment` 필드를 채우는 방식으로 확장하면 된다.
