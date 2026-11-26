// ✏️ 스킬 = 커비풍 "복사 능력". level 1~5(별 개수), color는 능력 버블 색.
// icon: 이모지 또는 짧은 글자(예: 'C++') — 글자는 버블 크기에 맞게 자동으로 줄어요.
// usedIn: 능력 카드를 열었을 때 아래에 뜨는 태그(쓴 프로젝트·자격 등). 없으면 [].
// details(선택): 능력 카드 아래 "이렇게 써 봤어요" 목록
//   면접에서 질문받아도 설명할 수 있는 것
export const skillStages = [
  { id: 'code', name: { ko: '언어', en: 'Languages' } },
  { id: 'tools', name: { ko: 'IDEs & Tools', en: 'IDEs & Tools' } },
  { id: 'lang', name: { ko: '외국어', en: 'Foreign Languages' } },
  { id: 'team', name: { ko: '협업 · 리더십', en: 'Teamwork' } },
  { id: 'cert', name: { ko: '자격', en: 'Certificates' } },
];

export const skills = [
  // ── 언어 ──
  { id: 'csharp', stage: 'code', icon: 'C#', color: '#c4b5ff', level: 4, name: 'C#', ability: { ko: 'Unity 게임 로직 · .NET', en: 'Unity gameplay code · .NET' }, usedIn: ['FFF', 'MSG Foundation'],
    details: [
      { ko: '게임 진행 · 씬 로드 · 씬별 초기화로 책임을 나눠 9개 씬(Boot → Title → Main → Stage → 전투 · 상점 · 휴식 · 보상 → Ending)의 전환 구조를 설계했습니다.', en: 'Designed the transitions between nine scenes (Boot → Title → Main → Stage → Battle, Shop, Rest, Treasure → Ending), splitting game progress, scene loading and per-scene setup into separate parts.' },
      { ko: '시드 하나로 15층 × 7열 분기 맵을 만드는 절차적 맵 생성기를 구현해, 같은 시드면 같은 맵이 나오도록 했습니다.', en: 'Built a procedural map generator that lays out a 15-floor × 7-column branching map from one seed, so the same seed always gives the same map.' },
      { ko: '화투 카드를 ScriptableObject로 정의해 코드 수정 없이 데이터만으로 카드를 추가 · 조정할 수 있게 했습니다.', en: 'Defined Hwatu cards as ScriptableObjects, so cards can be added and tuned from data without touching code.' },
      { ko: '카드 2장의 섯다 족보 판정과 덱 · 드로우 시스템을 구현했습니다.', en: 'Implemented Seotda hand judging for two cards and the deck and draw system.' },
      { ko: 'BGM · SFX · UI 볼륨을 나눈 사운드 시스템과 카드 · 전투 애니메이션, 로딩 화면, HUD, 상점 UI를 만들었습니다.', en: 'Built the sound system with separate BGM, SFX and UI volumes, plus card and battle animations, the loading screen, HUD and shop UI.' },
      { ko: '.NET으로 분석 · 설계 보고서를 Core / Console / Specs 구조의 코드로 옮기고, 외부 패키지 없이 규칙 검증 테스트를 작성했습니다. (MSG Foundation)', en: 'Turned an analysis and design report into .NET code with a Core / Console / Specs layout, and wrote rule tests with no outside packages (MSG Foundation).' },
    ] },
  { id: 'cpp', stage: 'code', icon: 'C++', color: '#8fb3ff', level: 5, name: 'C++', ability: { ko: '시스템 · 동시성 프로그래밍', en: 'Systems & concurrency' }, usedIn: ['Suribot', 'Chronobreak'],
    details: [
      { ko: 'D++ 라이브러리 위에서 음성 채널 입장 · 이동 · 퇴장 이벤트로 체류 시간을 재는 디스코드 봇을 혼자 설계하고 300명+ 서버에서 운영했습니다. (Suribot)', en: 'Designed a Discord bot on the D++ library that measures voice-channel time from join, move and leave events, and ran it solo on a 300+ member server (Suribot).' },
      { ko: '동시에 들어오는 이벤트로부터 공유 데이터를 지키기 위해 상태 락과 파일 락을 분리한 mutex 구조를 썼습니다.', en: 'Protected shared data from concurrent events with separate mutexes for in-memory state and the save file.' },
      { ko: 'RocksDB의 컴팩션 필터를 구현해, 기준 시간이 지난 로그가 컴팩션 때 정리되도록 했습니다. (Chronobreak)', en: 'Implemented a RocksDB compaction filter that drops logs past a cut-off time during compaction (Chronobreak).' },
      { ko: 'big-endian 키로 RocksDB의 정렬 순서를 시간순과 맞추고, msgpack으로 로그를 직렬화했습니다.', en: 'Used big-endian keys so RocksDB sorts entries in time order, and serialized logs with msgpack.' },
      { ko: 'CMake로 외부 라이브러리 빌드 · 의존성을 관리하고, db_bench로 워크로드별 성능을 기본 설정과 비교했습니다.', en: 'Managed external library builds and dependencies with CMake, and compared performance against default settings across workloads with db_bench.' },
    ] },
  { id: 'c', stage: 'code', icon: 'C', color: '#a8c8ff', level: 5, name: 'C', ability: { ko: '절차지향 언어', en: 'Procedural language' }, usedIn: [], details: [] },
  { id: 'webgl', stage: 'code', icon: 'GL', color: '#9af0e0', level: 3, name: 'WebGL2 · GLSL', ability: { ko: '실시간 렌더링 · 셰이더', en: 'Real-time rendering · shaders' }, usedIn: ['NINANO'],
    details: [
      { ko: '생성형 AI 기후 모델 결과를 5종 변수 색상 레이어로 그리는 셰이더와, 평년 대비 편차 보기를 만들었습니다.', en: 'Wrote shaders that draw a generative AI climate model\'s output as colour layers for five variables, with an anomaly-from-normal view.' },
      { ko: '받은 Float32 데이터를 복사 없이 R32F 텍스처로 올려 GPU에서 바로 그리게 했습니다.', en: 'Uploaded incoming Float32 data straight into R32F textures, with no copy, so the GPU draws it directly.' },
      { ko: '모델이 만든 바람(u, v)을 GPU 입자로 흘려 보내는 애니메이션과, WebGL이 없을 때의 Canvas 대체 경로를 구현했습니다.', en: 'Built a GPU particle animation driven by the model\'s wind (u, v), with a Canvas fallback when WebGL is missing.' },
      { ko: '드래그 · 휠로 움직이는 평면 지도와 3D 지구 투영을 구현했습니다.', en: 'Built a pannable, zoomable flat map and a 3D globe projection.' },
    ] },
  { id: 'ts', stage: 'code', icon: 'TS', color: '#9ec5ff', level: 3, name: 'TypeScript · React', ability: { ko: '웹 클라이언트', en: 'Web client' }, usedIn: ['NINANO', 'Portfolio'],
    details: [
      { ko: '슬라이더를 빠르게 움직여도 마지막 조건만 그리도록 AbortController로 이전 요청을 취소했습니다. (NINANO)', en: 'Cancelled stale requests with AbortController so fast slider moves only draw the latest condition (NINANO).' },
      { ko: '96MiB 상한의 LRU 캐시로 한 번 받은 레이어는 네트워크 없이 다시 보이게 했습니다.', en: 'Added a 96 MiB LRU cache so layers already fetched come back without the network.' },
      { ko: '이 사이트를 React 18 + Vite로 직접 만들었습니다 — 페이지마다 다른 게임 컨셉, 한 / 영 전환, GitHub Actions 자동 배포.', en: 'Built this site myself in React 18 + Vite: a different game concept per page, Korean / English switching and automatic GitHub Actions deploys.' },
    ] },
  { id: 'python', stage: 'code', icon: '🐍', color: '#ffe08a', level: 4, name: 'Python', ability: { ko: '데이터 처리 · 도구 제작', en: 'Data processing · tooling' }, usedIn: ['NINANO', 'StockLedger'],
    details: [
      { ko: 'NumPy로 0.25° 격자를 보간 없이 0.5°로 줄이는 다운샘플 도구를 만들어 데이터를 6.9GB → 1.8GB로 줄였습니다. (NINANO)', en: 'Wrote a NumPy tool that downsamples the 0.25° grid to 0.5° without interpolation, cutting the data from 6.9 GB to 1.8 GB (NINANO).' },
      { ko: '바람 데이터를 웹에서 읽기 쉬운 planar 형식으로 바꾸는 변환 도구와, AI 모델(cBottle) 추론 결과 가공을 맡았습니다.', en: 'Wrote a converter that puts wind data into a web-friendly planar layout, and processed the AI model (cBottle) output.' },
      { ko: '계획서 → 요구사항 → 설계 → UML → 구현까지 한 사이클로 진행한 CLI에서 도메인 / 저장소 / 서비스 계층을 나눴습니다. (StockLedger)', en: 'Split domain, repository and service layers in a CLI taken through one full cycle: plan → requirements → design → UML → code (StockLedger).' },
    ] },
  { id: 'java', stage: 'code', icon: '☕', color: '#ffc4a8', level: 3, name: 'Java', ability: { ko: '객체지향 언어', en: 'Object-oriented language' }, usedIn: [], details: [] },
  { id: 'html', stage: 'code', icon: '</>', color: '#ffb3a0', level: 3, name: 'HTML5 · CSS3', ability: { ko: '웹 마크업 · 스타일링', en: 'Web markup · styling' }, usedIn: ['Portfolio'],
    details: [
      { ko: '이 사이트의 모든 화면(콘솔 홈, 플랫포머, 오픈월드 지도, 도감 등)을 이미지 대신 CSS로 직접 그리고 애니메이션을 넣었습니다.', en: 'Drew every screen on this site (console home, platformer, open-world map, game dex and more) in CSS rather than images, with hand-made animations.' },
      { ko: '휴대폰부터 넓은 화면까지 맞춰지는 반응형 레이아웃을 만들었습니다.', en: 'Built responsive layouts that work from phones to wide screens.' },
    ] },
  { id: 'js', stage: 'code', icon: 'JS', color: '#fff09a', level: 3, name: 'JavaScript', ability: { ko: '웹 스크립트', en: 'Web scripting' }, usedIn: ['Portfolio', 'NINANO'],
    details: [
      { ko: '이 사이트의 효과음 · 배경음악 재생, 키보드 조작(← → Enter Esc), 한 / 영 설정 저장을 직접 구현했습니다.', en: 'Implemented this site\'s sound effects and music, keyboard controls (← → Enter Esc) and saved language settings.' },
    ] },
  { id: 'uml', stage: 'code', icon: '◇', color: '#b8f0d0', level: 5, name: 'UML', ability: { ko: '설계 모델링', en: 'Design modeling' }, usedIn: ['StockLedger', 'MSG Foundation'],
    details: [
      { ko: '유스케이스 · 클래스 · 시퀀스 다이어그램을 먼저 그리고 그 설계대로 코드를 옮겼습니다. (StockLedger)', en: 'Drew use-case, class and sequence diagrams first, then wrote the code to match (StockLedger).' },
      { ko: '사례 연구의 분석 · 설계 보고서를 C# 코드 구조로 옮겼습니다. (MSG Foundation)', en: 'Carried a case study\'s analysis and design report over into a C# code structure (MSG Foundation).' },
    ] },
  { id: 'sql', stage: 'code', icon: 'SQL', color: '#a8f0b0', level: 3, name: 'ANSI SQL', ability: { ko: '데이터베이스 질의', en: 'Database queries' }, usedIn: [], details: [] },
  { id: 'markdown', stage: 'code', icon: 'M↓', color: '#d9dde6', level: 5, name: 'Markdown', ability: { ko: '기술 문서 작성', en: 'Technical writing' }, usedIn: ['FFF', 'NINANO'],
    details: [
      { ko: '팀 프로젝트 README에 실행 방법, 브랜치 전략, 폴더 구조, 아키텍처, 데이터 파이프라인을 정리했습니다.', en: 'Documented how to run, the branch strategy, folder layout, architecture and data pipeline in team project READMEs.' },
    ] },
  { id: 'yaml', stage: 'code', icon: 'Y:', color: '#ffb8e6', level: 4, name: 'YAML', ability: { ko: 'CI · 배포 설정', en: 'CI · deploy config' }, usedIn: ['Portfolio'],
    details: [
      { ko: 'main에 push하면 이 사이트를 빌드해 GitHub Pages로 배포하는 GitHub Actions 워크플로를 작성했습니다.', en: 'Wrote the GitHub Actions workflow that builds this site and deploys it to GitHub Pages on every push to main.' },
    ] },

  // ── IDEs & Tools ── 
  { id: 'unity', stage: 'tools', icon: '🎮', color: '#cfd6e4', level: 5, name: 'Unity', ability: { ko: '게임 엔진', en: 'Game engine' }, usedIn: ['FFF'],
    details: [
      { ko: 'Unity 6 (URP)로 3인 팀 로그라이크 덱빌딩 게임을 타이틀부터 엔딩까지 플레이 가능한 빌드로 완성했습니다. (FFF)', en: 'Shipped a three-person roguelike deck-builder in Unity 6 (URP) as a build playable from title screen to ending (FFF).' },
      { ko: '부팅 씬에서 전역 매니저를 한 번만 만들고, 씬이 로드된 뒤 씬별 초기화 스크립트가 UI · 매니저 참조를 연결하는 구조를 세웠습니다.', en: 'Set it up so a boot scene creates the global managers once, and each scene\'s setup script wires up UI and manager references after it loads.' },
      { ko: '카드 · 아이템 · 적 데이터는 ScriptableObject로, 런타임에 ID로 찾아야 하는 것만 Resources에 두는 기준을 정했습니다.', en: 'Set the rule that card, item and enemy data live in ScriptableObjects, with only data looked up by ID at runtime in Resources.' },
      { ko: '여러 명이 같은 프로젝트를 고치도록 main – dev – feature 브랜치와 PR 병합 흐름을 운영했습니다.', en: 'Ran a main – dev – feature branch and PR merge flow so several people could work on the same project.' },
    ] },
  { id: 'unreal', stage: 'tools', icon: '🕹️', color: '#c9c3ff', level: 5, name: 'Unreal', ability: { ko: '게임 엔진', en: 'Game engine' }, usedIn: [], details: [] },
  { id: 'git', stage: 'tools', icon: 'Git', color: '#ffc4a8', level: 4, name: 'Git · GitHub', ability: { ko: '버전 관리 · 협업', en: 'Version control · collaboration' }, usedIn: ['FFF', 'Portfolio'], 
    details: [
      { ko: 'main – dev – feature 브랜치 전략을 세우고, feature에서 자체 테스트 → PR 리뷰 → dev 병합 → 마일스톤마다 main 병합 흐름을 운영했습니다. (FFF)', en: 'Set up a main – dev – feature branch strategy and ran the flow: test on feature → PR review → merge to dev → merge to main at each milestone (FFF).' },
      { ko: '봇 토큰 · 채널 ID 같은 비밀 값과 운영 데이터는 저장소에 올리지 않고 환경변수로 분리했습니다. (Suribot)', en: 'Kept secrets such as the bot token and channel ID, and live data, out of the repository in environment variables (Suribot).' },
    ] },
  { id: 'rocksdb', stage: 'tools', icon: '🪨', color: '#d9dde6', level: 4, name: 'RocksDB', ability: { ko: '키-값 저장소', en: 'Key-value store' }, usedIn: ['Chronobreak'],
    details: [
      { ko: 'LSM 트리의 컴팩션 시점에 만료 로그를 지우는 컴팩션 필터를 직접 구현했습니다.', en: 'Implemented a compaction filter that deletes expired logs at LSM-tree compaction time.' },
      { ko: '초기 로그 저장소(저장 · 조회 · 수동 컴팩션)와 JSONL 로그를 시간순으로 재생하는 테스트 드라이버를 작성했습니다.', en: 'Wrote the first log store (store, read, manual compaction) and a test driver that replays JSONL logs in time order.' },
      { ko: 'db_bench에 필터를 붙여 순차 · 균등 · 시계열 워크로드에서 기본 설정과 성능을 비교했습니다.', en: 'Plugged the filter into db_bench and compared it with the default settings on sequential, uniform and time-series workloads.' },
    ] },
  { id: 'vs', stage: 'tools', icon: 'VS', color: '#c4b5ff', level: 4, name: 'Visual Studio', ability: { ko: '통합 개발 환경', en: 'IDE' }, usedIn: ['FFF'], details: [] },
  { id: 'vscode', stage: 'tools', icon: '⌨️', color: '#9ad7ff', level: 5, name: 'VS Code', ability: { ko: '코드 에디터', en: 'Code editor' }, usedIn: [], details: [] },
  { id: 'mysql', stage: 'tools', icon: '🐬', color: '#a8e6ff', level: 4, name: 'MySQL', ability: { ko: '관계형 데이터베이스', en: 'Relational database' }, usedIn: [], details: [] },
  { id: 'oracle', stage: 'tools', icon: '🛢️', color: '#ffb3a0', level: 3, name: 'Oracle', ability: { ko: '관계형 데이터베이스', en: 'Relational database' }, usedIn: [], details: [] },

  // ── 외국어 ──
  { id: 'english', stage: 'lang', icon: '💬', color: '#9ad7ff', level: 4, name: 'English', ability: { ko: '비즈니스 가능', en: 'Business level' }, usedIn: ['TOEIC Speaking AL (2026.10)'] },
  { id: 'german', stage: 'lang', icon: '🥨', color: '#ffe08a', level: 3, name: 'German', ability: { ko: '일상 대화 가능', en: 'Conversational' }, usedIn: ['Goethe-Zertifikat A1 (2026.05)', '독일학전공'] },
  { id: 'japanese', stage: 'lang', icon: '🗾', color: '#ffc4d6', level: 2, name: 'Japanese', ability: { ko: '기초 및 일상 대화 가능', en: 'Conversational' }, usedIn: [] },

  // ── 협업 · 리더십 ──
  { id: 'lead', stage: 'team', icon: '🧭', color: '#ffb3d9', level: 4, name: 'Team Lead', ability: { ko: '3인 팀 리더 · 스크럼 마스터 경험', en: 'Led a 3-person team as scrum master' }, usedIn: ['FFF', 'LoL 대학 대표팀'],
    details: [
      { ko: '요구사항을 먼저 함께 정리하고 기능별 우선순위를 정했습니다. (FFF)', en: 'Sorted out requirements together first and set priorities per feature (FFF).' },
      { ko: '마감이 다가오자 “하고 싶은 기능”보다 타이틀부터 엔딩까지 끝까지 플레이되는 빌드를 우선해 범위를 줄였고, 일정 안에 완성했습니다.', en: 'Near the deadline, cut scope to put a build playable from title to ending ahead of nice-to-haves, and finished on time.' },
      { ko: '게임 흐름과 씬 구조를 먼저 세워 팀원이 전투 · 아이템 기능을 그 위에 병렬로 붙일 수 있게 했습니다.', en: 'Put the game flow and scene structure in place first so teammates could build battle and item features on top in parallel.' },
      { ko: '대학 LoL 대표팀 서포터로 경기 흐름을 먼저 읽고 팀에 알리는 역할을 맡아 전국 본선에 진출했습니다.', en: 'As support on the university League of Legends team, read the game first and called it for the team; we reached the national finals.' },
    ] },
  { id: 'notion', stage: 'team', icon: '🗂️', color: '#c4b5ff', level: 4, name: 'Notion', ability: { ko: '일정 체계화 · 이슈 공유', en: 'Schedule & issue tracking' }, usedIn: ['FFF'],
    details: [
      { ko: '일정과 이슈를 한곳에 모아 누가 무엇을 언제까지 하는지 팀 전체가 볼 수 있게 했습니다. (FFF)', en: 'Kept the schedule and issues in one place so the whole team could see who was doing what, and by when (FFF).' },
    ] },
  { id: 'community', stage: 'team', icon: '🎙️', color: '#a8f0b0', level: 4, name: 'Community', ability: { ko: '300명+ 디스코드 서버 운영 경험', en: 'Ran a 300+ member Discord server' }, usedIn: ['Discord', 'Suribot'],
    details: [
      { ko: '가입자 수가 아니라 주간 활성 사용자(WAU)를 기준으로 공지 · 이벤트에 대한 반응을 살피며 운영 방향을 조정했습니다.', en: 'Steered the server by weekly active users (WAU) rather than member count, watching how people responded to announcements and events.' },
      { ko: '참여를 늘리려고 음성 채널 활동 순위 봇(Suribot)을 직접 만들어 도입했습니다.', en: 'Built and launched my own voice-activity ranking bot (Suribot) to bring members back.' },
      { ko: '신고 · 분쟁은 정해진 규칙에 따라 일관되게 처리했습니다.', en: 'Handled reports and disputes consistently by the server rules.' },
    ] },

  // ── 자격 ──
  { id: 'license', stage: 'cert', icon: '🚗', color: '#ffc4a8', level: 3, name: { ko: '운전면허 1종 보통', en: "Driver's License (Class 1)" }, ability: { ko: '경기남부지방경찰청 (2020.09)', en: 'Issued 2020.09' }, usedIn: ['2020.09'] },
];

/* 예시 데이터
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
