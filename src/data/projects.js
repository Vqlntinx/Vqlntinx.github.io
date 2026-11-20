// ✏️ 프로젝트 = 플랫포머의 "?" 블록. 연도 순으로 자동 정렬돼요(1-1이 가장 오래된 것).
// stats는 0~100 (⭐ impact / 🍄 scale / 🔥 craft) — 지금 값은 임시라 직접 조정하세요.
// stack: 기술 태그(없으면 [] 로 두면 숨겨져요)
// links: github / notion / demo — 있는 것만 버튼으로 나와요.
export const projects = [
  { id: 'suribot', icon: '🤖', color: '#5865f2', year: 2024,
    name: { ko: 'Suribot', en: 'Suribot' },
    role: { ko: '개인 프로젝트', en: 'Personal project' },
    summary: { ko: '디스코드 음성 채널 체류 시간을 기록하고 /순위 · /업타임으로 조회하는 봇', en: 'Discord bot that logs voice-channel time, with /ranking and /uptime commands' },
    stack: ['C++', 'D++', 'CMake'],
    stats: { impact: 70, scale: 55, craft: 75 }, // ✏️ 임시 값
    links: { github: 'https://github.com/Vqlntinx/Suribot' } },
  { id: 'chronobreak', icon: '⏪', color: '#2f8cff', year: 2025,
    name: { ko: 'Chronobreak (RocksDB)', en: 'Chronobreak (RocksDB)' },
    role: { ko: '개인 프로젝트', en: 'Personal project' },
    summary: { ko: 'RocksDB 기반 세션 로그 저장소 · 세션을 과거 시점으로 되돌리는 ChronoBreak와 컴팩션 필터 구현', en: 'RocksDB session-log store with ChronoBreak rollback and a custom compaction filter' },
    stack: ['C++', 'RocksDB'],
    stats: { impact: 65, scale: 70, craft: 80 }, // ✏️ 임시 값
    links: { github: 'https://github.com/Vqlntinx/RocksDB_ChronobreakFilter' } },
  { id: 'fff', icon: '🎮', color: '#ff7a3d', year: 2026,
    name: { ko: "게임 'FFF'", en: "Game 'FFF'" },
    role: { ko: '팀 리더 · 스크럼 마스터', en: 'Team Lead · Scrum Master' },
    summary: { ko: '단국대 캡스톤 3인 팀 게임 개발 · 요구사항 조율, 일정·이슈 관리로 완성', en: 'Dankook capstone, 3-person team · led requirements, schedule and issues to ship the game' },
    stack: ['C#', 'Unity'],
    stats: { impact: 80, scale: 60, craft: 75 }, // ✏️ 임시 값
    links: {
      github: 'https://github.com/Vqlntinx/FFF',
      notion: 'https://app.notion.com/p/5-Forge-Project-Hwatu-3f7198ad3d8183649653010d32900c36?source=copy_link',
    } },
];

/* 제외한 프로젝트 (다시 넣고 싶으면 위 배열로 옮기세요)
const removedProjects = [
  { id: 'stockledger', icon: '💹', color: '#3ec46d', year: 2025,
    name: { ko: 'StockLedger 주식 매매 장부', en: 'StockLedger' },
    role: { ko: '개인 프로젝트 · 설계 실습', en: 'Personal project · Design practice' },
    summary: { ko: '계획서 → 요구사항 명세서 → 설계서 → UML(유스케이스·클래스·시퀀스) → 구현까지 한 사이클로 진행한 작은 CLI · 도메인/저장소/서비스 계층 분리, 보유 종목·실현 손익 계산', en: 'A small CLI taken through one full cycle: plan → requirements → design → UML (use-case, class, sequence) → code · domain/repository/service layers, positions and realized P/L' },
    stack: ['Python', 'UML'],
    stats: { impact: 40, scale: 30, craft: 65 }, // ✏️ 임시 값 (작은 실습이라 낮게)
    links: { github: 'https://github.com/Vqlntinx/StockLedger' } },
  { id: 'solar', icon: '🪐', color: '#a855f7', year: 2025,
    name: { ko: 'WebGL 태양-지구-달 렌더러', en: 'WebGL Sun-Earth-Moon Renderer' },
    role: { ko: '개인 프로젝트 · 그래픽스 실습', en: 'Personal project · Graphics practice' },
    summary: { ko: 'Three.js 없이 순수 WebGL로 셰이더 · Phong 조명 · 텍스처 · 카메라 시점 전환을 직접 구현', en: 'Raw WebGL, no Three.js: hand-written shaders, Phong lighting, textures and camera focus switching' },
    stack: ['JavaScript', 'WebGL', 'GLSL'],
    stats: { impact: 45, scale: 30, craft: 70 }, // ✏️ 임시 값 (작은 실습이라 낮게)
    links: { demo: 'https://vqlntinx.github.io/Solar_System/', github: 'https://github.com/Vqlntinx/Solar_System' } },
  { id: 'msg', icon: '🏦', color: '#f5b400', year: 2026,
    name: { ko: 'MSG Foundation 자금 계산 시스템', en: 'MSG Foundation Funds System' },
    role: { ko: '개인 프로젝트 · 설계 기반 구현', en: 'Personal project · Design-to-code' },
    summary: { ko: '사례 연구의 분석·설계 보고서를 C# 코드로 옮긴 모의 시스템 · 주간 자금 계산과 주택 구매 지원 승인 규칙 구현, Core/Console/Specs 구조와 외부 패키지 없는 규칙 검증 테스트', en: 'A mock system translating a case-study analysis/design report into C# · weekly fund computation and grant-approval rules, Core/Console/Specs layout with dependency-free rule tests' },
    stack: ['C#', '.NET'],
    stats: { impact: 45, scale: 35, craft: 70 }, // ✏️ 임시 값 (작은 실습이라 낮게)
    links: { github: 'https://github.com/Vqlntinx/MSG_Foundation_Mortgage_System' } },
];
*/

/* 예시 데이터 (형식 참고용, 사이트에는 나오지 않아요)
const exampleProjects = [
  { id: 'pixelboard', icon: '🎨', color: '#ff4d4d', year: 2025,
    name: { ko: '픽셀보드', en: 'PixelBoard' },
    role: { ko: '프론트엔드 리드', en: 'Frontend Lead' },
    summary: { ko: '실시간 협업 픽셀 아트 캔버스', en: 'Real-time collaborative pixel canvas' },
    stack: ['React', 'WebSocket', 'Canvas'], stats: { impact: 92, scale: 70, craft: 88 },
    links: { demo: '#', github: '#', notion: '#' } },
];
*/
