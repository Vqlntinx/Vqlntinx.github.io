# 게임 · 책 추가하는 법

모든 내용은 `src/data/` 폴더의 파일만 고치면 되고, 이미지는 `public/` 아래에 넣어요.
파일을 저장하면 개발 서버(`npm run dev`)가 켜져 있는 동안 화면이 바로 바뀌어요.

---

## 🎮 GAME·DEX에 게임 추가하기

### 1. 이미지 넣기 (선택)
- `public/games/` 폴더를 만들고 이미지를 넣어요. 예: `public/games/hollow-knight.webp`
- 도감 화면의 그림 칸은 **16:9 가로 비율**이에요(예: 1280×720). 다른 비율이면 가운데를 기준으로 잘려요.
- 이미지가 없으면 게임 이름으로 만든 픽셀 몬스터가 자동으로 나와요.

### 2. `src/data/games.js`에 한 줄 추가
`games` 배열 안에 아래 형식으로 추가해요.

```js
{ id: 13, title: 'Hollow Knight', types: ['Action', 'Indie'], hours: 120, rating: 5, year: 2018,
  cover: './games/hollow-knight.webp',
  note: { ko: '도전과 탐험의 완벽한 균형', en: 'Perfect balance of challenge and discovery' } },
```

| 항목 | 의미 |
|---|---|
| `id` | 도감 번호(No.013). 겹치지 않는 숫자 |
| `title` | 게임 이름 |
| `types` | 장르 태그(1~2개). 파일 위쪽 `TYPE_COLORS`에 있는 이름만 쓸 수 있어요 |
| `hours` | 플레이 시간 |
| `rating` | 평점 1~5 (★ 개수) |
| `year` | 처음 플레이한 해 (SINCE) |
| `cover` | 이미지 경로. 없으면 이 줄을 지우세요 |
| `note` | 한 줄 소감 (한/영) |

**새 장르를 쓰고 싶을 때**는 `TYPE_COLORS`에 이름과 색을 추가해요.
```js
export const TYPE_COLORS = {
  ...
  Horror: '#5b2a86',
};
```

---

## 📚 Book Crossing 책 표지 추가하기

### 1. 이미지 넣기
- `public/books/` 폴더를 만들고 표지를 넣어요. 예: `public/books/almond.webp`
- 표지 칸은 **2:3 세로 비율**(일반 책 표지 비율)이에요. 예: 400×600

### 2. `src/data/reads.js`에서 그 책에 `cover` 한 줄 추가

```js
{ id: 'r1', color: '#e8826b', height: 92, date: '2025.10',
  cover: './books/almond.webp',
  title: { ko: '아몬드', en: 'Almond' }, author: { ko: '손원평', en: 'Won-pyung Sohn' }, rating: 5,
  review: { ko: '…', en: '…' } },
```

책을 눌러 펼치면 왼쪽 페이지의 **제목 위에 표지 이미지**가 나와요. `cover`가 없는 책은 지금처럼 책등 색깔로 만든 작은 표지가 나와요.

### 새 책을 추가할 때
| 항목 | 의미 |
|---|---|
| `id` | 겹치지 않는 이름 (예: `'r10'`) |
| `color` | 책장에 꽂힌 책등 색 |
| `height` | 책등 높이(%, 80~100 정도) |
| `date` | 읽은 날짜 `'YYYY.MM'`. 연도 탭과 정렬에 쓰여요 |
| `cover` | 표지 이미지 (선택) |
| `title` / `author` | 제목 / 저자 (한/영) |
| `rating` | 잎사귀 개수 1~5 |
| `review` | 독후감. 줄을 바꾸려면 `\n` |

---

## 💡 이미지 용량 팁
사진은 **WebP**로 저장하면 화질은 거의 그대로이고 용량은 1/5~1/10로 줄어요.
파일을 주시면 변환과 연결은 언제든 해드릴게요.
