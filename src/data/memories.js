// ✏️ 추억 = RPG 세이브 파일. image에 사진 경로(public 폴더 기준, 예: './memories/jeju.jpg')를 넣으세요.
// 비워두면 scene 색으로 그린 장면이 대신 나옵니다. party는 함께한 사람(이모지).
// level = 그때 내 나이. 사이트에서는 level이 높은 것(최근)부터 위에 자동 정렬돼요 — 여기 순서는 상관없어요.
export const memories = [
  { id: 'm1', date: '2025.08.14', playtime: '72:00', level: 29, image: null,
    scene: ['#ffb36b', '#ff6b8b', '#3a2a5a'], icon: '🌅',
    place: { ko: '제주 협재 해변', en: 'Hyeopjae Beach, Jeju' },
    party: ['🧑', '👩', '🐶'],
    line: { ko: '노을이 바다에 녹아내리던 저녁. 이 장면을 영원히 저장하고 싶었다.', en: 'The sunset melted into the sea. I wanted to save this moment forever.' } },
  { id: 'm2', date: '2024.12.31', playtime: '06:12', level: 28, image: null,
    scene: ['#1b2a6b', '#5b3fa8', '#0b0f2a'], icon: '🎆',
    place: { ko: '친구네 옥상', en: 'A friend\'s rooftop' },
    party: ['🧑', '🧑‍🦱', '👱', '👩‍🦰'],
    line: { ko: '카운트다운과 함께 터진 불꽃. 새해 첫 퀘스트 수락.', en: 'Fireworks on the countdown. First quest of the year: accepted.' } },
  { id: 'm3', date: '2023.05.20', playtime: '48:30', level: 26, image: null,
    scene: ['#9fe3ff', '#ffe6f2', '#6bbf7a'], icon: '🌸',
    place: { ko: '교토 철학의 길', en: 'Philosopher\'s Path, Kyoto' },
    party: ['🧑', '👩'],
    line: { ko: '벚꽃 터널 아래에서 천천히 걷기. 속도를 줄이는 법을 배웠다.', en: 'Walking slowly under cherry blossoms. I learned how to slow down.' } },
  { id: 'm4', date: '2020.02.21', playtime: '04:00', level: 23, image: null,
    scene: ['#ffd36b', '#ff8f5b', '#2b2b40'], icon: '🎓',
    place: { ko: '졸업식', en: 'Graduation day' },
    party: ['🧑', '👨', '👩'],
    line: { ko: '튜토리얼 클리어. 이제 진짜 오픈월드로.', en: 'Tutorial cleared. Into the open world.' } },
];
