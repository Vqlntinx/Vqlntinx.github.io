// ✏️ 프로젝트 = 플랫포머의 "?" 블록. 연도 순으로 자동 정렬돼요(1-1이 가장 오래된 것).
// stats는 0~100 (⭐ impact / 🍄 scale / 🔥 craft) — 지금 값은 임시라 직접 조정하세요.
// stack: 기술 태그(없으면 [] 로 두면 숨겨져요)
// links: github / notion / demo — 있는 것만 버튼으로 나와요.
// did: 내가 담당한 일 / learned: 배운 점 — 카드 아래 패널에 나와요(없으면 그 칸은 숨겨져요).
export const projects = [
  { id: 'suribot', icon: '🤖', color: '#5865f2', year: 2024,
    name: { ko: 'Suribot', en: 'Suribot' },
    role: { ko: '개인 프로젝트', en: 'Personal project' },
    summary: { ko: '디스코드 음성 채널 체류 시간을 기록하고 /순위 · /업타임으로 조회하는 봇', en: 'Discord bot that logs voice-channel time, with /ranking and /uptime commands' },
    stack: ['C++', 'D++', 'CMake'],
    stats: { impact: 70, scale: 55, craft: 75 }, // ✏️ 임시 값
    links: { github: 'https://github.com/Vqlntinx/Suribot' },
    did: [
      { ko: '기획 · 구현 · 운영 (D++ 라이브러리 기반)', en: 'Built and ran it solo, end to end, on the D++ library' },
      { ko: '음성 채널 체류 시간 측정 및 누적량을 집계 시스템', en: 'Measured time per voice session from join / move / leave events and kept running totals' },
      { ko: '/순위 · /업타임 등 유저 명령 구현', en: 'Implemented user commands such as /ranking (top 5) and /uptime' },
      { ko: '누적 데이터 JSON 저장 · 복구 시스템', en: 'Built a system that saves and restores the totals as JSON' },
      { ko: '봇 토큰 · 채널 ID 환경변수로 암호화', en: 'Kept the bot token and channel ID separate, in environment variables' },
    ],
    learned: [ // ✏️ 초안이에요 — 직접 다듬어 주세요
      { ko: '여러 이벤트가 동시에 들어올 때 mutex로 공유 데이터를 지키는 법 (상태 락 · 파일 락 분리)', en: 'Guarding shared state with mutexes when events arrive concurrently (separate state and file locks)' },
      { ko: '운영 데이터와 비밀 값은 저장소에 올리지 않는 습관', en: 'Keeping live data and secrets out of the repository' },
      { ko: '외부 C++ 라이브러리 위에서 빌드 · 의존성을 관리하는 경험', en: 'Managing builds and dependencies on top of an external C++ library' },
    ] },
  { id: 'chronobreak', icon: '⏪', color: '#2f8cff', year: 2025,
    name: { ko: 'Chronobreak (RocksDB)', en: 'Chronobreak (RocksDB)' },
    role: { ko: '팀 프로젝트', en: 'Team project' },
    summary: { ko: 'RocksDB 기반 세션 로그 저장소 · 세션을 과거 시점으로 되돌리는 ChronoBreak와 컴팩션 필터 구현', en: 'RocksDB session-log store with ChronoBreak rollback and a custom compaction filter' },
    stack: ['C++', 'RocksDB'],
    stats: { impact: 65, scale: 70, craft: 80 }, // ✏️ 임시 값
    links: { github: 'https://github.com/Vqlntinx/RocksDB_ChronobreakFilter' },
    did: [
      { ko: 'RocksDB 로그 컴팩션 필터 설계 · 구현.', en: 'Designed and built the RocksDB compaction filter (ChronobreakFilter), dropping expired logs during compaction' },
      { ko: '초기 LogDB(저장 · 조회 · 수동 컴팩션, msgpack 직렬화) 작성', en: 'Wrote the first LogDB: store, read and manual compaction, with msgpack serialization' },
      { ko: 'JSONL 로그를 시간 순서대로 재생해 넣는 테스트 드라이버 작성', en: 'Wrote a driver that replays JSONL logs in time order' },
      { ko: 'db_bench에 필터를 붙여 순차 · 균등 · 시계열 워크로드에서 기본 설정과 그 성능을 비교 실험', en: 'Plugged the filter into db_bench and benchmarked it against the default settings on sequential, uniform and time-series workloads' },
    ],
    learned: [ // ✏️ 초안이에요 — 직접 다듬어 주세요
      { ko: 'LSM 트리와 컴팩션의 동작 — 삭제를 컴팩션 시점으로 미루는 설계', en: 'How LSM trees and compaction work, and deferring deletes to compaction time' },
      { ko: '키의 바이트 순서가 RocksDB 정렬 순서를 정한다는 점 (big-endian 키)', en: 'That key byte order sets RocksDB\'s sort order (big-endian keys)' },
      { ko: '벤치마크 수치로 설계를 검증하는 방법', en: 'Checking a design with benchmark numbers' },
    ] },
  { id: 'fff', icon: '🎮', color: '#ff7a3d', year: 2026,
    name: { ko: "게임 'FFF'", en: "Game 'FFF'" },
    role: { ko: '팀 리더 · 스크럼 마스터', en: 'Team Lead · Scrum Master' },
    summary: { ko: '단국대 캡스톤 3인 팀 게임 개발 · 요구사항 조율, 일정·이슈 관리로 완성', en: 'Dankook capstone, 3-person team · led requirements, schedule and issues to ship the game' },
    stack: ['C#', 'Unity'],
    stats: { impact: 80, scale: 60, craft: 75 }, // ✏️ 임시 값
    links: {
      github: 'https://github.com/Vqlntinx/FFF',
      notion: 'https://app.notion.com/p/5-Forge-Project-Hwatu-3f7198ad3d8183649653010d32900c36?source=copy_link',
    },
    did: [
      { ko: '팀 리더 · 스크럼 마스터 — 요구사항 조율, Notion으로 일정 · 이슈 관리', en: 'Team lead and scrum master: aligned requirements, ran schedule and issues in Notion' },
      { ko: '게임 전체 흐름(GameManager · SceneLoader)과 씬 구조 설계', en: 'Designed the game flow (GameManager, SceneLoader) and scene structure' },
      { ko: '시드 기반 로그라이크 맵 생성(MapGenerator)과 맵 UI', en: 'Seed-based roguelike map generation (MapGenerator) and the map UI' },
      { ko: '화투 카드 데이터(ScriptableObject) · 덱 시스템 · 섯다 족보 판정', en: 'Hwatu card data (ScriptableObjects), the deck system and Seotda hand judging' },
      { ko: '사운드 시스템, 카드 · 전투 애니메이션, 로딩 화면, 상단 HUD, 상점 UI', en: 'Sound system, card and battle animations, loading screen, top HUD and shop UI' },
    ],
    learned: [ // ✏️ 초안이에요 — 직접 다듬어 주세요
      { ko: '브랜치 전략과 PR 머지로 3명이 동시에 작업할 때 충돌 줄이기', en: 'Using a branch strategy and PR merges to keep three people from colliding' },
      { ko: '씬 · 매니저 · UI 컴포넌트로 역할을 나눠 병렬 개발이 가능한 구조', en: 'Splitting work into scenes, managers and UI components so it can be built in parallel' },
      { ko: '우선순위를 정해 마감 안에 범위를 맞추는 일정 관리', en: 'Setting priorities to fit the scope into the deadline' },
    ] },
  { id: 'ninano', icon: '🌊', color: '#1fa7c9', year: 2026,
    name: { ko: 'NINANO (엘니냐와 라니뇨)', en: 'NINANO' },
    role: { ko: '해커톤 · 3인 팀 · AI 및 웹 시뮬레이션', en: 'Hackathon · 3-person team · AI & Web simulation' },
    summary: { ko: '제2회 JDC 해커톤 · 생성형 AI 기후 모델(cBottle) 결과를 슬라이더로 탐색하는 엘니뇨·라니냐 웹 시뮬레이션', en: '2nd JDC Hackathon · an El Niño / La Niña web simulation exploring results from a generative AI climate model (cBottle)' },
    stack: ['React', 'TypeScript', 'WebGL2', 'cBottle', 'FastAPI'],
    stats: { impact: 75, scale: 70, craft: 80 }, // ✏️ 임시 값
    links: {
      demo: 'https://www.youtube.com/watch?v=tZYHsdUNgAM',
      github: 'https://github.com/Vqlntinx/ninano',
    },
    did: [
      { ko: '2대의 PC로 NVIDIA 기후 모델 추론 및 웹 시뮬레이션 병렬 개발', en: 'In a two-day hackathon we split across two laptops: one ran the NVIDIA climate model, the other built the web simulation for its output.' },
      { ko: 'cBottle 모델에 환경 변수를 입력해 그 변화를 모델이 자동 축적, 같은 seed로 253개 조건 생성', en: 'The team fed cBottle changed sea temperature and wind, let the model fill in temperature, rain, pressure and water vapour, and pre-generated 253 conditions (23 SST × 11 wind steps) with a fixed seed.' },
      { ko: '추론 결과를 브라우저가 raw Float32 형식으로 받아 로더를 구현', en: 'Agreed a raw Float32 data format the browser reads without copying, and built the loader for it' },
      { ko: 'React · WebGL2로 5종 기후 변수 지도, 바람 입자 애니메이션, 3D 지구, ENSO 진단 패널 구현', en: 'Built maps for five climate variables, wind-particle animation, a 3D globe and an ENSO panel in React and WebGL2' },
      { ko: 'LRU 캐시로 슬라이더 조작 시 끊김 완화, 환경 변수 다운샘플로 데이터 최적화 (6.9GB → 1.8GB)', en: 'Kept the sliders smooth with a 96 MiB LRU cache and request cancelling, and cut the data from 6.9 GB to 1.8 GB with 0.5° downsampling' },
    ],
    learned: [ // ✏️ 초안이에요 — 직접 다듬어 주세요
      { ko: '데이터 형식을 먼저 맞춰 두면 모델 쪽과 웹 쪽이 서로를 기다리지 않고 병렬로 일할 수 있다는 것', en: 'Agreeing the data format first lets the model side and the web side work in parallel without waiting on each other' },
      { ko: 'diffusion 모델은 실행마다 결과가 달라서, 같은 seed로 비교해야 입력 변화의 효과만 볼 수 있다는 점', en: 'Diffusion models vary per run, so only a fixed seed isolates the effect of a changed input' },
      { ko: '무거운 AI 추론은 미리 계산해 두고, 화면은 가볍게 읽기만 하게 나누는 설계', en: 'Precomputing heavy AI inference so the page only has to read light files' },
    ] },
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
