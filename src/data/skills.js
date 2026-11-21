// ✏️ 스킬 = 커비풍 "복사 능력". level 1~5(별 개수), color는 능력 버블 색.
// icon: 이모지 또는 짧은 글자(예: 'C++') — 글자는 버블 크기에 맞게 자동으로 줄어요.
// usedIn: 능력 카드를 열었을 때 아래에 뜨는 태그(쓴 프로젝트·자격 등). 없으면 [].
export const skillStages = [
  { id: 'code', name: { ko: '언어', en: 'Languages' } },
  { id: 'tools', name: { ko: 'IDEs & Tools', en: 'IDEs & Tools' } },
  { id: 'lang', name: { ko: '외국어', en: 'Foreign Languages' } },
  { id: 'team', name: { ko: '협업 · 리더십', en: 'Teamwork' } },
  { id: 'cert', name: { ko: '자격', en: 'Certificates' } },
];

export const skills = [
  // ── 언어 ──
  { id: 'c', stage: 'code', icon: 'C', color: '#a8c8ff', level: 5, name: 'C', ability: { ko: '절차지향 언어', en: 'Procedural language' }, usedIn: [] },
  { id: 'cpp', stage: 'code', icon: 'C++', color: '#8fb3ff', level: 5, name: 'C++', ability: { ko: '객체지향 언어', en: 'Object-oriented language' }, usedIn: ['Suribot', 'Chronobreak'] },
  { id: 'csharp', stage: 'code', icon: 'C#', color: '#c4b5ff', level: 4, name: 'C#', ability: { ko: '.NET · Unity 스크립팅', en: '.NET · Unity scripting' }, usedIn: ['FFF'] },
  { id: 'python', stage: 'code', icon: '🐍', color: '#ffe08a', level: 4, name: 'Python', ability: { ko: '스크립트 언어', en: 'Scripting language' }, usedIn: [] },
  { id: 'java', stage: 'code', icon: '☕', color: '#ffc4a8', level: 3, name: 'Java', ability: { ko: '객체지향 언어', en: 'Object-oriented language' }, usedIn: [] },
  { id: 'html', stage: 'code', icon: '</>', color: '#ffb3a0', level: 3, name: 'HTML5', ability: { ko: '웹 마크업', en: 'Web markup' }, usedIn: [] },
  { id: 'css', stage: 'code', icon: '{ }', color: '#9ad7ff', level: 3, name: 'CSS3', ability: { ko: '웹 스타일링', en: 'Web styling' }, usedIn: [] },
  { id: 'js', stage: 'code', icon: 'JS', color: '#fff09a', level: 3, name: 'JavaScript', ability: { ko: '웹 스크립트', en: 'Web scripting' }, usedIn: [] },
  { id: 'markdown', stage: 'code', icon: 'M↓', color: '#d9dde6', level: 5, name: 'Markdown', ability: { ko: '문서 작성', en: 'Documentation' }, usedIn: [] },
  { id: 'yaml', stage: 'code', icon: 'Y:', color: '#ffb8e6', level: 4, name: 'YAML', ability: { ko: '설정 파일', en: 'Configuration' }, usedIn: [] },
  { id: 'uml', stage: 'code', icon: '◇', color: '#b8f0d0', level: 5, name: 'UML', ability: { ko: '설계 모델링', en: 'Design modeling' }, usedIn: [] },
  { id: 'sql', stage: 'code', icon: 'SQL', color: '#a8f0b0', level: 3, name: 'ANSI SQL', ability: { ko: '데이터베이스 질의', en: 'Database queries' }, usedIn: [] },

  // ── IDEs & Tools ──  ✏️ 별은 임시로 4
  { id: 'vs', stage: 'tools', icon: 'VS', color: '#c4b5ff', level: 4, name: 'Visual Studio', ability: { ko: '통합 개발 환경', en: 'IDE' }, usedIn: [] },
  { id: 'vscode', stage: 'tools', icon: '⌨️', color: '#9ad7ff', level: 5, name: 'VS Code', ability: { ko: '코드 에디터', en: 'Code editor' }, usedIn: [] },
  { id: 'oracle', stage: 'tools', icon: '🛢️', color: '#ffb3a0', level: 3, name: 'Oracle', ability: { ko: '관계형 데이터베이스', en: 'Relational database' }, usedIn: [] },
  { id: 'mysql', stage: 'tools', icon: '🐬', color: '#a8e6ff', level: 4, name: 'MySQL', ability: { ko: '관계형 데이터베이스', en: 'Relational database' }, usedIn: [] },
  { id: 'rocksdb', stage: 'tools', icon: '🪨', color: '#d9dde6', level: 4, name: 'RocksDB', ability: { ko: '키-값 저장소', en: 'Key-value store' }, usedIn: ['Chronobreak'] },
  { id: 'unity', stage: 'tools', icon: '🎮', color: '#cfd6e4', level: 5, name: 'Unity', ability: { ko: '게임 엔진', en: 'Game engine' }, usedIn: ['FFF'] },
  { id: 'unreal', stage: 'tools', icon: '🕹️', color: '#c9c3ff', level: 5, name: 'Unreal', ability: { ko: '게임 엔진', en: 'Game engine' }, usedIn: [] },

  // ── 외국어 ──
  { id: 'english', stage: 'lang', icon: '💬', color: '#9ad7ff', level: 4, name: 'English', ability: { ko: '비즈니스 가능', en: 'Business level' }, usedIn: ['TOEIC Speaking AL (2026.10)'] },
  { id: 'german', stage: 'lang', icon: '🥨', color: '#ffe08a', level: 3, name: 'German', ability: { ko: '일상 대화 가능', en: 'Conversational' }, usedIn: ['Goethe-Zertifikat A1 (2026.05)', '독일학전공'] },
  { id: 'japanese', stage: 'lang', icon: '🗾', color: '#ffc4d6', level: 2, name: 'Japanese', ability: { ko: '기초 및 일상 대화 가능', en: 'Conversational' }, usedIn: [] }, // ✏️ 별은 임시로 3

  // ── 협업 · 리더십 ──
  { id: 'lead', stage: 'team', icon: '🧭', color: '#ffb3d9', level: 4, name: 'Team Lead', ability: { ko: '3인 팀 리더 · 스크럼 마스터 경험', en: 'Led a 3-person team as scrum master' }, usedIn: ['FFF'] },
  { id: 'notion', stage: 'team', icon: '🗂️', color: '#c4b5ff', level: 4, name: 'Notion', ability: { ko: '일정 체계화 · 이슈 공유', en: 'Schedule & issue tracking' }, usedIn: ['FFF'] },
  { id: 'community', stage: 'team', icon: '🎙️', color: '#a8f0b0', level: 4, name: 'Community', ability: { ko: '300명+ 디스코드 서버 운영 경험', en: 'Ran a 100+ member Discord server' }, usedIn: ['Discord'] },

  // ── 자격 ──
  { id: 'license', stage: 'cert', icon: '🚗', color: '#ffc4a8', level: 3, name: { ko: '운전면허 1종 보통', en: "Driver's License (Class 1)" }, ability: { ko: '경기남부지방경찰청 (2020.09)', en: 'Issued 2020.09' }, usedIn: ['2020.09'] },
];

/* 예시 데이터 (형식 참고용, 사이트에는 나오지 않아요)
const exampleSkillStages = [
  { id: 'front', name: { ko: '프론트엔드', en: 'Frontend' } },
  { id: 'back', name: { ko: '백엔드', en: 'Backend' } },
  { id: 'tools', name: { ko: '도구', en: 'Tools' } },
];

const exampleSkills = [
  { id: 'react', stage: 'front', icon: '⚛️', color: '#7fd3ff', level: 5, name: 'React', ability: { ko: '컴포넌트 소환', en: 'Component Summon' }, usedIn: ['PixelBoard', 'QuestLog'] },
  { id: 'ts', stage: 'front', icon: '🔷', color: '#8fb3ff', level: 5, name: 'TypeScript', ability: { ko: '타입 실드', en: 'Type Shield' }, usedIn: ['QuestLog'] },
  { id: 'css', stage: 'front', icon: '🎨', color: '#ffb3d9', level: 5, name: 'CSS / Motion', ability: { ko: '페인트 브러시', en: 'Paint Brush' }, usedIn: ['Lo-fi Room'] },
  { id: 'three', stage: 'front', icon: '🧊', color: '#c4b5ff', level: 3, name: 'Three.js', ability: { ko: '3D 큐브', en: '3D Cube' }, usedIn: ['Lo-fi Room'] },
  { id: 'node', stage: 'back', icon: '🟢', color: '#a8f0b0', level: 4, name: 'Node.js', ability: { ko: '서버 스파크', en: 'Server Spark' }, usedIn: ['PixelBoard'] },
  { id: 'sql', stage: 'back', icon: '🗄️', color: '#ffe08a', level: 3, name: 'PostgreSQL', ability: { ko: '데이터 스톤', en: 'Data Stone' }, usedIn: ['QuestLog'] },
  { id: 'py', stage: 'back', icon: '🐍', color: '#ffd59e', level: 3, name: 'Python', ability: { ko: '스네이크 휩', en: 'Snake Whip' }, usedIn: ['MealMate'] },
  { id: 'git', stage: 'tools', icon: '🌿', color: '#ffc4a8', level: 5, name: 'Git', ability: { ko: '타임 워프', en: 'Time Warp' }, usedIn: ['All'] },
  { id: 'figma', stage: 'tools', icon: '✏️', color: '#ffb8e6', level: 4, name: 'Figma', ability: { ko: '스케치', en: 'Sketch' }, usedIn: ['BookBuddy'] },
  { id: 'docker', stage: 'tools', icon: '🐳', color: '#9ad7ff', level: 3, name: 'Docker', ability: { ko: '컨테이너 버블', en: 'Container Bubble' }, usedIn: ['QuestLog'] },
];
*/
