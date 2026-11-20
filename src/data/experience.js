// ✏️ 지도 이미지. public 폴더에 넣고 image에 경로를 쓰세요(예: './world-map.webp').
// width/height는 그 이미지의 실제 픽셀 크기. 비워두면(null) 임시로 그린 지형이 나옵니다.
export const worldMap = { image: './world-map.webp', width: 6144, height: 4096 };

// ✏️ 경험 = 지도 위의 장소. x, y는 지도 위 위치(%)이고, 핀의 뾰족한 끝이 그 지점을 가리켜요.
// 오래된 것부터 순서대로 (그 순서대로 길이 이어져요).
// kind(지도 아이콘): school | village | cafe | arena | beacon | castle | tower | shrine
export const experience = [
  { id: 'ashley', kind: 'cafe', x: 45.5, y: 71, period: '2019.12 – 2020.02',
    place: { ko: '애슐리퀸즈 평택점', en: "Ashley Queens, Pyeongtaek" },
    title: { ko: '아르바이트 · 매장 메이트', en: 'Part-time · Store crew' },
    quests: [{ ko: '매장 메이트로 근무', en: 'Worked as store crew' }] },
  { id: 'dku', kind: 'school', x: 12.5, y: 55.5, period: '2020.03 – 2026.08',
    place: { ko: '단국대학교', en: 'Dankook University' },
    title: { ko: '유럽중남미학부 독일학전공 · 소프트웨어학과 복수전공', en: 'German Studies · Double major in Software' },
    quests: [{ ko: '졸업요건 충족 (졸업 유예)', en: 'Graduation requirements met (graduation deferred)' }] },
  { id: 'galbi', kind: 'village', x: 34, y: 43.5, period: '2021.01 – 2021.04',
    place: { ko: '북촌삼대갈비 소사벌점', en: 'Bukchon Samdae Galbi, Sosabeol' },
    title: { ko: '아르바이트 · 홀 / 운영', en: 'Part-time · Floor & operations' },
    quests: [{ ko: '홀 업무', en: 'Floor service' }, { ko: '지점 운영관리 및 마감 정산', en: 'Store operations and closing settlement' }] },
  { id: 'lol', kind: 'arena', x: 49, y: 35, period: '2023.01 – 2023.07',
    place: { ko: 'LoL 대학 대표팀', en: 'LoL University Team' },
    title: { ko: '단국대학교 대표', en: 'Representing Dankook University' },
    quests: [{ ko: '경기게임문화센터배 대학교 대항전 참가', en: 'Competed in the Gyeonggi Game Culture Center inter-university cup' }] },
  { id: 'brunch', kind: 'cafe', x: 63, y: 52, period: '2023.09 – 2023.11',
    place: { ko: '어나더 브런치카페', en: 'Another Brunch Cafe' },
    title: { ko: '아르바이트 · 주방 / 카페', en: 'Part-time · Kitchen & cafe' },
    quests: [{ ko: '주방 및 카페 업무 담당', en: 'Handled kitchen and cafe work' }] },
  { id: 'discord', kind: 'beacon', x: 80, y: 74, period: '2024.07 – 2025.02',
    place: { ko: '게임 커뮤니티 (Discord)', en: 'Game Community (Discord)' },
    title: { ko: '서버 운영진', en: 'Server moderator' },
    quests: [{ ko: '100명 이상 규모 서버 운영', en: 'Ran a 100+ member server' }, { ko: '커뮤니티 운영 및 소통 담당', en: 'Community management and communication' }] },
  { id: 'capstone', kind: 'castle', x: 79.5, y: 15.5, period: '2026.01 – 2026.06',
    place: { ko: "캡스톤 게임 'FFF'", en: "Capstone Game 'FFF'" },
    title: { ko: '3인 팀 리더 · 스크럼 마스터', en: 'Team Lead · Scrum Master (3-person team)' },
    quests: [{ ko: '요구사항 조율', en: 'Aligned requirements' }, { ko: 'Notion으로 일정·이슈 공유', en: 'Shared schedule and issues in Notion' }, { ko: "게임 'FFF' 완성", en: "Shipped the game 'FFF'" }] },
];

/* 예시 데이터 (형식 참고용, 사이트에는 나오지 않아요)
const exampleExperience = [
  { id: 'uni', kind: 'shrine', x: 12.5, y: 55.5, period: '2016 – 2020',
    place: { ko: '한빛대학교', en: 'Hanbit University' },
    title: { ko: '컴퓨터공학 학사', en: 'B.S. Computer Science' },
    quests: [{ ko: '게임 개발 동아리 회장', en: 'Led the game dev club' }, { ko: '졸업작품 최우수상', en: 'Best capstone award' }] },
  { id: 'intern', kind: 'village', x: 34, y: 43.5, period: '2020',
    place: { ko: '스타트업 루미', en: 'Lumi Startup' },
    title: { ko: '프론트엔드 인턴', en: 'Frontend Intern' },
    quests: [{ ko: '디자인 시스템 컴포넌트 40개 구축', en: 'Built 40 design-system components' }] },
  { id: 'job1', kind: 'tower', x: 63, y: 52, period: '2021 – 2023',
    place: { ko: '노바 게임즈', en: 'Nova Games' },
    title: { ko: '웹 개발자', en: 'Web Developer' },
    quests: [{ ko: '런처 웹뷰 로딩 60% 단축', en: 'Cut launcher webview load time by 60%' }, { ko: '이벤트 페이지 30+ 출시', en: 'Shipped 30+ event pages' }] },
  { id: 'job2', kind: 'castle', x: 79.5, y: 15.5, period: '2023 – Now',
    place: { ko: '클라우드 스튜디오', en: 'Cloud Studio' },
    title: { ko: '시니어 프론트엔드', en: 'Senior Frontend' },
    quests: [{ ko: '실시간 협업 에디터 리드', en: 'Leading the real-time editor' }, { ko: '주니어 4명 멘토링', en: 'Mentoring 4 juniors' }] },
];
*/
