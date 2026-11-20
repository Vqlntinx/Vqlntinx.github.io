// ✏️ 플레이한 게임 = 도감 항목. types는 장르(TYPE_COLORS 키), rating 1~5, hours = 플레이 시간.
// cover에 이미지 경로를 넣으면 자동 생성 아트 대신 표시됩니다.
export const TYPE_COLORS = {
  RPG: '#7c5cff', Action: '#ff5a4e', Adventure: '#33b864', Puzzle: '#f5b400', Strategy: '#2f8cff',
  Platformer: '#ff8a3d', Shooter: '#8a8f99', Sim: '#2ec4b6', Indie: '#ff6fb5', Roguelike: '#9c4dcc',
};

export const games = [
  { id: 1, title: 'Hollow Knight', types: ['Action', 'Indie'], hours: 120, rating: 5, year: 2018, note: { ko: '도전과 탐험의 완벽한 균형', en: 'Perfect balance of challenge and discovery' } },
  { id: 2, title: 'Stardew Valley', types: ['Sim', 'Indie'], hours: 210, rating: 5, year: 2017, note: { ko: '마음이 지칠 때 돌아가는 곳', en: 'Where I go when I need to rest' } },
  { id: 3, title: 'Hades', types: ['Roguelike', 'Action'], hours: 90, rating: 5, year: 2020, note: { ko: '죽는 게 즐거운 게임', en: 'Dying never felt so good' } },
  { id: 4, title: 'Portal 2', types: ['Puzzle'], hours: 25, rating: 5, year: 2014, note: { ko: '퍼즐 디자인의 교과서', en: 'A textbook of puzzle design' } },
  { id: 5, title: 'Celeste', types: ['Platformer', 'Indie'], hours: 40, rating: 5, year: 2019, note: { ko: '한 번 더, 한 번만 더', en: 'One more try. Just one more.' } },
  { id: 6, title: 'Civilization VI', types: ['Strategy'], hours: 300, rating: 4, year: 2017, note: { ko: '한 턴만 더의 저주', en: 'The curse of one more turn' } },
  { id: 7, title: 'The Witcher 3', types: ['RPG', 'Adventure'], hours: 150, rating: 5, year: 2016, note: { ko: '사이드 퀘스트가 메인보다 좋다', en: 'Side quests beat most main stories' } },
  { id: 8, title: 'Overwatch', types: ['Shooter'], hours: 400, rating: 4, year: 2016, note: { ko: '친구들과의 밤샘', en: 'All-nighters with friends' } },
  { id: 9, title: 'Outer Wilds', types: ['Adventure', 'Puzzle'], hours: 30, rating: 5, year: 2021, note: { ko: '기억을 지우고 다시 하고 싶다', en: 'I wish I could play it fresh again' } },
  { id: 10, title: 'Slay the Spire', types: ['Roguelike', 'Strategy'], hours: 180, rating: 4, year: 2019, note: { ko: '덱빌딩 입문작', en: 'My gateway to deckbuilders' } },
  { id: 11, title: 'Persona 5', types: ['RPG'], hours: 110, rating: 5, year: 2020, note: { ko: 'UI 디자인 영감의 원천', en: 'Endless UI design inspiration' } },
  { id: 12, title: 'Minecraft', types: ['Sim', 'Adventure'], hours: 500, rating: 4, year: 2012, note: { ko: '코딩을 시작하게 해준 레드스톤', en: 'Redstone got me into programming' } },
];
