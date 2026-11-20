# Player One: 게임 콘솔 포트폴리오

창가 책상 → 콘솔 클릭 → LINK START → 콘솔 홈 → 게임 컨셉별 페이지

## 실행

```bash
npm install
npm run dev
```

## 내용 바꾸기 (`src/data/`만 고치면 됩니다)

| 파일 | 화면 | 컨셉 |
|---|---|---|
| `profile.js` | 왼쪽 위 아바타, 연락 탭 | 콘솔 유저 페이지 |
| `projects.js` | 프로젝트 | 대난투풍 캐릭터 선택 |
| `experience.js` | 경험 | 젤다풍 오픈월드 지도 |
| `skills.js` | 스킬 | 커비풍 복사 능력 |
| `games.js` | 게임 도감 | 포켓몬 도감풍 |
| `reads.js` | 독서 | 동물의 숲풍 도서관 |
| `memories.js` | 추억 탭 | RPG 세이브 파일 |

- 모든 글은 `{ ko: '...', en: '...' }` 형식입니다(한/영 전환).
- 사진은 `public/` 폴더에 넣고 `'./파일명.jpg'`로 지정합니다(아바타, 추억 사진, 게임 커버).
- 인트로 배경은 반복 재생되는 영상 `public/intro-room.mp4`(1660×1244)이고, 로딩 전에는 같은 구도의 `public/intro-room.webp`가 보입니다. 구도가 다른 영상으로 바꾸면 `src/components/Intro.jsx`의 `CONSOLE_PATH`(게임기 윤곽선, 영상 픽셀 좌표)와 `Intro.css`의 `.screen-glow`, `.press` 위치(%)를 맞춰 주세요.

## 배포 (GitHub Pages)

`main`에 push하면 `.github/workflows/deploy.yml`이 빌드하고 배포합니다.
저장소 Settings → Pages → Source를 **GitHub Actions**로 설정하세요.

## 조작

마우스 드래그·휠·←→로 카드 이동, Enter(A)로 실행, Esc(B)로 뒤로 가기.
