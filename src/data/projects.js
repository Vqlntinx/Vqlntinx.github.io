// ✏️ 프로젝트 = 플랫포머의 "?" 블록. 연도 순으로 자동 정렬
// stats는 0~100 (⭐ impact / 🍄 scale / 🔥 craft)
// stack: 기술 태그
// links: github / notion / demo
// did: 내가 담당한 일 / learned: 배운 점
// period(선택): 카드 위에 연도 대신 보여 줄 기간(예: '2026.01 – 2026.06').
// troubles(선택): 트러블 슈팅 탭
//   면접에서 가장 많이 파고드는 부분이에요.
export const projects = [
  { id: 'suribot', icon: '🤖', color: '#5865f2', year: 2024, period: '2024',
    name: { ko: 'Suribot', en: 'Suribot' },
    role: { ko: '개인 프로젝트 · 300명+ 서버 운영', en: 'Personal project · ran on a 300+ member server' },
    summary: { ko: '디스코드 음성 채널 체류 시간을 기록하고 /순위 · /업타임으로 조회하는 C++ 봇 — 운영하던 커뮤니티의 참여를 늘리려고 직접 만들어 도입', en: 'A C++ Discord bot that logs voice-channel time with /ranking and /uptime — built and launched to bring members back to the community I moderated' },
    stack: ['C++', 'D++', 'CMake', 'JSON'],
    stats: { impact: 70, scale: 55, craft: 75 },
    links: { github: 'https://github.com/Vqlntinx/Suribot' },
    did: [
      { ko: '기획 · 구현 · 운영 (D++ 라이브러리 기반)', en: 'Built and ran it solo, end to end, on the D++ library' },
      { ko: '음성 채널 체류 시간 측정 및 누적량 집계 시스템', en: 'Measured time per voice session from join / move / leave events and kept running totals' },
      { ko: '/순위 · /업타임 등 유저 명령 구현', en: 'Implemented user commands such as /ranking (top 5) and /uptime' },
      { ko: '누적 데이터 JSON 저장 · 복구 시스템', en: 'Built a system that saves and restores the totals as JSON' },
      { ko: '봇 토큰 · 채널 ID 환경변수로 암호화', en: 'Kept the bot token and channel ID separate, in environment variables' },
    ],
    troubles: [
      {
        title: { ko: '여러 사람이 동시에 들어오고 나갈 때 누적 시간이 꼬임', en: 'Totals went wrong when several people joined and left at once' },
        problem: { ko: '음성 이벤트는 동시에 여러 개가 들어오는데, 같은 기록을 여러 이벤트가 동시에 고치거나 저장 중인 파일을 다시 쓰면 체류 시간이 어긋날 수 있었습니다.', en: 'Voice events arrive concurrently; if several of them edit the same record, or rewrite the file while it is being saved, the totals can drift.' },
        solution: { ko: '메모리의 상태를 지키는 락과 JSON 파일 저장을 지키는 락을 나눈 mutex 구조로 바꿨습니다. 저장이 길어져도 이벤트 처리가 막히지 않게 했습니다.', en: 'Split the locking into one mutex for in-memory state and one for writing the JSON file, so a slow save never blocks event handling.' },
        result: { ko: '락을 하나로 크게 잡기보다 “무엇을 지키는 락인지” 나눠야 동시성과 안전을 함께 얻을 수 있다는 것을 배웠습니다.', en: 'I learned to split locks by what they protect, rather than one big lock, to keep both safety and throughput.' } },
    ],
    learned: [
      { ko: '여러 이벤트가 동시에 들어올 때 mutex로 공유 데이터를 지키는 법 (상태 락 · 파일 락 분리)', en: 'Guarding shared state with mutexes when events arrive concurrently (separate state and file locks)' },
      { ko: '운영 데이터와 비밀 값은 저장소에 올리지 않는 습관', en: 'Keeping live data and secrets out of the repository' },
      { ko: '외부 C++ 라이브러리 위에서 빌드 · 의존성을 관리하는 경험', en: 'Managing builds and dependencies on top of an external C++ library' },
    ] },
  { id: 'chronobreak', icon: '⏪', color: '#2f8cff', year: 2025, period: '2025',
    name: { ko: 'Chronobreak (RocksDB)', en: 'Chronobreak (RocksDB)' },
    role: { ko: '팀 프로젝트 · 컴팩션 필터 · 실험 담당', en: 'Team project · compaction filter & benchmarks' },
    summary: { ko: 'RocksDB 기반 세션 로그 저장소 · 세션을 과거 시점으로 되돌리는 ChronoBreak와 컴팩션 필터 구현', en: 'RocksDB session-log store with ChronoBreak rollback and a custom compaction filter' },
    stack: ['C++', 'RocksDB', 'msgpack', 'db_bench'],
    stats: { impact: 65, scale: 70, craft: 80 },
    links: { github: 'https://github.com/Vqlntinx/RocksDB_ChronobreakFilter' },
    did: [
      { ko: 'RocksDB 로그 컴팩션 필터 설계 · 구현.', en: 'Designed and built a RocksDB compaction filter that drops expired logs during compaction' },
      { ko: '초기 로그 저장소(저장 · 조회 · 수동 컴팩션, msgpack 직렬화) 작성', en: 'Wrote the first log store: store, read and manual compaction, with msgpack serialization' },
      { ko: 'JSONL 로그를 시간 순서대로 재생해 넣는 테스트 드라이버 작성', en: 'Wrote a driver that replays JSONL logs in time order' },
      { ko: 'db_bench에 필터를 붙여 순차 · 균등 · 시계열 워크로드에서 기본 설정과 그 성능을 비교 실험', en: 'Plugged the filter into db_bench and benchmarked it against the default settings on sequential, uniform and time-series workloads' },
    ],
    troubles: [
      {
        title: { ko: '시간순으로 넣은 로그가 시간순으로 정렬되지 않음', en: 'Logs written in time order did not sort in time order' },
        problem: { ko: 'RocksDB는 키를 바이트 순서로 정렬하는데, 숫자 시각을 그대로 키로 쓰면 바이트 순서와 시간 순서가 달라 과거 시점 조회와 필터 판단이 어긋날 수 있었습니다.', en: 'RocksDB sorts keys by bytes; using a raw numeric timestamp as the key made byte order differ from time order, which breaks rollback lookups and filter decisions.' },
        solution: { ko: '시각을 big-endian으로 인코딩한 키를 써서 바이트 정렬이 곧 시간 정렬이 되도록 바꿨습니다.', en: 'Encoded timestamps big-endian in the key, so byte order and time order match.' },
        result: { ko: '저장소의 정렬 규칙을 이해하고 키를 설계해야 한다는 것을 배웠습니다. 세이브 · 리플레이처럼 시간순 데이터를 다루는 게임 시스템에도 같은 원리가 적용됩니다.', en: 'I learned to design keys around the store\'s ordering rules — the same idea applies to time-ordered game data like saves and replays.' } },
      {
        title: { ko: '만료된 로그를 지울 때 쓰기 성능이 떨어지지 않게', en: 'Deleting expired logs without slowing writes' },
        problem: { ko: '오래된 로그를 그때그때 직접 지우면 삭제 작업이 쓰기 경로에 끼어들어 부담이 됩니다.', en: 'Deleting old logs as you go puts delete work on the write path.' },
        solution: { ko: '삭제를 컴팩션 시점으로 미루는 컴팩션 필터를 구현하고, db_bench로 순차 · 균등 · 시계열 워크로드에서 기본 설정과 비교했습니다.', en: 'Moved deletion to compaction time with a compaction filter, and compared it with the default settings in db_bench on sequential, uniform and time-series workloads.' },
        result: { ko: 'LSM 트리의 동작을 이해했고, 설계가 맞는지는 벤치마크 수치로 확인해야 한다는 습관을 얻었습니다.', en: 'I came to understand how LSM trees work, and picked up the habit of checking a design with benchmark numbers.' } },
    ],
    learned: [
      { ko: 'LSM 트리와 컴팩션의 동작 — 삭제를 컴팩션 시점으로 미루는 설계', en: 'How LSM trees and compaction work, and deferring deletes to compaction time' },
      { ko: '키의 바이트 순서가 RocksDB 정렬 순서를 정한다는 점 (big-endian 키)', en: 'That key byte order sets RocksDB\'s sort order (big-endian keys)' },
      { ko: '벤치마크 수치로 설계를 검증하는 방법', en: 'Checking a design with benchmark numbers' },
    ] },
  { id: 'dopamin', icon: '🚗', color: '#22b573', year: 2025, period: '2025.03 – 2025.06',
    name: { ko: '도파민 (DOPAMIN)', en: 'DOPAMIN' },
    role: { ko: '4인 팀 · 기획 프로젝트 · 비즈니스 모델 · 서비스 분석', en: '4-person team · Planning project · Business model & service research' },
    summary: { ko: '도로를 지키는 파수꾼 — 블랙박스 영상으로 도로 파손을 찾아내고, 운전자의 제보를 지자체 민원 처리와 연결하는 참여형 내비게이션 플랫폼 기획 (단국대 모바일플랫폼 수업)', en: '"The road\'s watchman": a participatory navigation platform that spots road damage from dashcam video and connects drivers\' reports to city repair requests (Dankook Mobile Platform course)' },
    stack: ['Service Planning', 'Business Model', 'Use Case', 'Notion'],
    stats: { impact: 60, scale: 65, craft: 70 },
    links: { notion: 'https://app.notion.com/p/6d4198ad3d8182d992268141a2554dc7?source=copy_link' },
    did: [
      { ko: '공공기관 대상(B2G) · 사용자 대상(B2C) 수익 구조 설계', en: 'Designed the revenue model: services for public agencies (B2G) and for drivers (B2C)' },
      { ko: '5년 사용자 · 매출 추정치 계산', en: 'Estimated users and revenue over five years (300k–500k users at launch, 16% yearly growth)' },
      { ko: 'Waze · 서울시 AI 포트홀 탐지 · 보배드림 등 유사 서비스 벤치마킹', en: 'Benchmarked similar services such as Waze, Seoul\'s AI pothole detection and Bobaedream' },
      { ko: '사용자 여정 기반 기능 배치, 유스케이스 · 기능 흐름도 작성', en: 'Laid out features along the user journey, and wrote use cases and feature flow charts' },
      { ko: '웹 · 비즈니스 모델 조사 사수, iOS 조사 부사수', en: 'Led research on the web service and business model, and backed up iOS research' },
    ],
    troubles: [
      {
        title: { ko: '네 명이 각자 다른 기준으로 아이디어를 내 주제가 정해지지 않음', en: 'Four people pitching ideas by four different standards' },
        problem: { ko: '첫 브레인스토밍에서 아이디어가 여러 개 나왔지만, 서로 중요하게 여기는 것이 달라 무엇을 고를지 기준이 없었습니다.', en: 'The first brainstorm produced plenty of ideas, but each of us valued different things, so there was no way to choose.' },
        solution: { ko: '약 10가지 가치 중 투표로 창의성 · 완성도 · 사용자 경험을 우선 가치로 정하고, 이 기준으로 다시 아이디어를 내 후보를 3개로 좁혔습니다.', en: 'We voted on about ten values to set creativity, polish and user experience as our priorities, then brainstormed again against them and narrowed it to three candidates.' },
        result: { ko: '기준을 먼저 합의하니 토론이 “누구 아이디어가 좋은가”에서 “무엇이 기준에 맞는가”로 바뀌었고, 창의성이 가장 높은 도파민으로 확정했습니다.', en: 'Agreeing on criteria first turned the debate from "whose idea is better" into "what fits our criteria", and we chose DOPAMIN as the most creative.' } },
      {
        title: { ko: '“도로 정보를 공유하는 앱”만으로는 플랫폼이라 보기 어려움', en: '"An app for sharing road info" was not yet a platform' },
        problem: { ko: '운전자끼리 도로 문제를 알리는 기능만으로는 직접적인 교류가 없어, 수업의 주제인 플랫폼으로서의 가치가 약했습니다.', en: 'Drivers simply alerting each other lacked real two-way exchange, so it fell short as a platform, the course\'s theme.' },
        solution: { ko: '제보를 지자체 · 도로공사의 민원 처리와 연결해, 시민과 시민, 시민과 공무원이 도로 정보를 주고받는 구조로 다시 설계했습니다.', en: 'We linked reports to repair requests at city offices and the road authority, redesigning it so citizens and officials exchange road information both ways.' },
        result: { ko: '사용자(운전자)와 고객(공공기관)이 함께 생기면서 공공기관 대상 수익 모델까지 자연스럽게 이어졌습니다.', en: 'With both users (drivers) and customers (public agencies), a revenue model for public agencies followed naturally.' } },
      {
        title: { ko: '주 1회 대면 회의만으로는 진행 상황을 맞추기 어려움', en: 'One in-person meeting a week was not enough to stay in sync' },
        problem: { ko: '수업 후 짧은 대면 회의만으로는 각자 조사한 내용을 공유하고 검토할 시간이 부족했습니다.', en: 'Short meetings after class left too little time to share and review everyone\'s research.' },
        solution: { ko: '조사 분야마다 사수 · 부사수를 두어 서로 검토하고, 모든 내용을 Notion에 기록한 뒤 댓글로 피드백을 주고받았습니다.', en: 'Each research area had a lead and a backup who checked each other\'s work, and everything went into Notion with feedback in comments.' },
        result: { ko: '조사 → 사수 정리 → 리더 검토의 단계적 검토로 내용의 정확도를 높였고, 대면 회의의 빈자리를 줄일 수 있었습니다.', en: 'Staged reviews (research → lead summary → team-lead check) made the content more accurate and covered the gaps between meetings.' } },
    ],
    learned: [
      { ko: '기준을 먼저 합의해야 토론이 빠르고 공정해진다는 것', en: 'Agreeing on criteria first makes team debates faster and fairer' },
      { ko: '“실제로 쓸 서비스인가?”를 계속 묻는 기획 습관', en: 'The planning habit of always asking "would people actually use this?"' },
      { ko: '협업에서 중요한 것은 완벽한 계획보다 서로 존중하고 유연하게 대처하는 태도', en: 'In teamwork, respect and flexibility matter more than a perfect plan' },
    ] },
  { id: 'fff', icon: '🎮', color: '#ff7a3d', year: 2026, period: '2026.01 – 2026.06',
    name: { ko: "게임 'FFF'", en: "Game 'FFF'" },
    role: { ko: '3인 팀 · 팀 리더 · 스크럼 마스터 · 클라이언트', en: '3-person team · Lead · Scrum Master · Client' },
    summary: { ko: '화투 2장으로 섯다 족보를 만들어 싸우는 1인용 로그라이크 덱빌딩 게임 (단국대 캡스톤) · 게임 흐름 · 9개 씬 구조, 시드 기반 맵, 카드 · 족보 시스템, 연출 · UI · 사운드 담당', en: 'A single-player roguelike deck-builder where two Hwatu cards form a Seotda hand (Dankook capstone) · I owned the game flow and nine-scene structure, seeded maps, cards and hand judging, plus effects, UI and sound' },
    stack: ['C#', 'Unity 6', 'URP', 'ScriptableObject', 'Git Flow'],
    stats: { impact: 80, scale: 60, craft: 75 },
    links: {
      github: 'https://github.com/Vqlntinx/FFF',
      notion: 'https://app.notion.com/p/5-Forge-Project-Hwatu-3f7198ad3d8183649653010d32900c36?source=copy_link',
    },
    did: [
      { ko: '팀 리더 · 스크럼 마스터 — 요구사항 조율과 기능별 우선순위 결정, Notion으로 일정 · 이슈 관리', en: 'Team lead and scrum master: aligned requirements, set feature priorities, ran schedule and issues in Notion' },
      { ko: 'main – dev – feature 브랜치 전략(Git Flow)을 세우고 PR 리뷰 후 병합하는 흐름 운영', en: 'Set up a main – dev – feature branch strategy (Git Flow) and ran review-then-merge PRs' },
      { ko: 'MVC 구조로 9개 씬 전환 설계', en: 'Designed transitions for nine scenes (Boot → Title → Main → Stage → Battle, Shop, Rest, Treasure → Ending), splitting progress, scene loading and per-scene setup into separate parts' },
      { ko: '시드 기반 15층 × 7열 로그라이크 맵 생성', en: 'Seeded 15-floor × 7-column roguelike map generation with monster, elite, shop, rest, treasure and boss nodes, plus the map UI' },
      { ko: '화투 카드 데이터 · 덱 시스템 · 섯다 족보 판정', en: 'Hwatu card data (ScriptableObjects), the deck system and Seotda hand judging' },
      { ko: 'BGM · SFX · UI 등 사운드 시스템, 카드 · 전투 애니메이션, 로딩 화면, 상단 HUD, 상점 UI', en: 'Sound system with separate BGM, SFX and UI volumes, card and battle animations, loading screen, top HUD and shop UI' },
    ],
    troubles: [
      {
        title: { ko: '씬이 9개로 늘자 “누가 다음 씬을 정하고, 누가 참조를 연결하는가”가 엉킴', en: 'With nine scenes, "who picks the next scene and who wires references" got tangled' },
        problem: { ko: '전투 · 상점 · 휴식 씬을 오가며 플레이어 데이터를 유지해야 했는데, 씬마다 직접 다음 씬을 불러 전환 로직이 흩어졌고 다시 로드될 때 매니저 참조가 끊기거나 중복 생성됐습니다.', en: 'Player data had to survive trips between battle, shop and rest scenes, but each scene loaded the next one itself, so transition logic was scattered and manager references broke or duplicated on reload.' },
        solution: { ko: '부팅 씬에서 전역 매니저를 한 번만 만들고, 게임 진행 매니저는 다음에 갈 씬만 정하고, 씬 로더는 실제 로드만, 씬별 초기화 스크립트는 로드 후 참조 연결만 맡도록 책임을 나눴습니다.', en: 'A boot scene creates the global managers once; the progress manager only decides which scene comes next, the scene loader only loads, and each scene\'s setup script only wires references after loading.' },
        result: { ko: '팀원은 새 씬을 만들 때 씬별 초기화 스크립트만 작성하면 됐습니다. 뼈대를 먼저 세우는 것이 곧 팀의 개발 속도라는 것을 체감했습니다.', en: 'Teammates only had to write a setup script for each new scene. Putting the skeleton in place first set the whole team\'s pace.' } },
      {
        title: { ko: '매번 달라야 하지만, 같은 상황은 다시 만들 수 있어야 하는 맵', en: 'A map that must differ every run, yet be reproducible' },
        problem: { ko: '런마다 다른 맵이 필요했지만, 순수 무작위로 만들면 버그가 난 맵을 다시 볼 수 없었고 이어하기 때 맵을 통째로 저장해야 했습니다.', en: 'Each run needed a new map, but pure randomness made buggy maps impossible to revisit and meant saving the whole map for Continue.' },
        solution: { ko: '맵 생성기가 시드 하나로 15층 × 7열 노드와 연결을 결정하게 했습니다. 각 노드는 층 · 위치 · 방 종류 · 연결 정보만 갖고, 같은 시드면 같은 맵이 나옵니다.', en: 'The map generator decides the 15 × 7 nodes and their links from one seed. Each node holds only its floor, position, room type and links, so the same seed gives the same map.' },
        result: { ko: '시드만 공유하면 같은 맵을 재현해 버그를 확인할 수 있었습니다. 무작위성은 통제할 수 있을 때 설계와 디버깅 모두에 쓸모 있다는 것을 배웠습니다.', en: 'Sharing a seed was enough to reproduce a map and check a bug. Randomness is useful for design and debugging alike once you can control it.' } },
      {
        title: { ko: '세 명이 같은 Unity 프로젝트를 동시에 고치며 생긴 충돌', en: 'Three people editing one Unity project at once' },
        problem: { ko: '세 명이 동시에 개발하자 기능이 서로 맞물리지 않거나 같은 부분을 다르게 이해하는 일이 생겼고, 병합 충돌이 잦았습니다.', en: 'With three people developing at once, features didn\'t fit together, we read the same thing differently, and merge conflicts were frequent.' },
        solution: { ko: 'main – dev – feature 브랜치 전략을 세우고 feature에서 자체 테스트 → PR 리뷰 → dev 병합 → 마일스톤마다 main 병합 흐름을 정했습니다. 일정 · 이슈는 Notion에 모았습니다.', en: 'Set up main – dev – feature branches with test on feature → PR review → merge to dev → merge to main at each milestone, and kept schedule and issues in Notion.' },
        result: { ko: 'main은 언제든 발표 가능한 빌드로 남았고, 마감 직전엔 끝까지 플레이되는 빌드를 우선해 범위를 줄여 일정 안에 완성했습니다.', en: 'main stayed presentable at all times, and near the deadline we cut scope to a build playable end to end and shipped on time.' } },
    ],
    learned: [
      { ko: '브랜치 전략과 PR 머지로 3명이 동시에 작업할 때 충돌 줄이기', en: 'Using a branch strategy and PR merges to keep three people from colliding' },
      { ko: '씬 · 매니저 · UI 컴포넌트로 역할을 나눠 병렬 개발이 가능한 구조', en: 'Splitting work into scenes, managers and UI components so it can be built in parallel' },
      { ko: '우선순위를 정해 마감 안에 범위를 맞추는 일정 관리', en: 'Setting priorities to fit the scope into the deadline' },
    ] },
  { id: 'ninano', icon: '🌊', color: '#1fa7c9', year: 2026, period: '2026.06 · 1박 2일',
    name: { ko: 'NINANO (엘니냐와 라니뇨)', en: 'NINANO' },
    role: { ko: '해커톤 · 3인 팀 · AI 및 웹 시뮬레이션', en: 'Hackathon · 3-person team · AI & Web simulation' },
    summary: { ko: '제2회 JDC 해커톤 · 생성형 AI 기후 모델(cBottle) 결과를 슬라이더로 탐색하는 엘니뇨·라니냐 웹 시뮬레이션', en: '2nd JDC Hackathon · an El Niño / La Niña web simulation exploring results from a generative AI climate model (cBottle)' },
    stack: ['React', 'TypeScript', 'WebGL2', 'GLSL', 'Python', 'cBottle', 'FastAPI'],
    stats: { impact: 75, scale: 70, craft: 80 },
    links: {
      demo: 'https://www.youtube.com/watch?v=tZYHsdUNgAM',
      github: 'https://github.com/Vqlntinx/ninano',
    },
    did: [
      { ko: '2대의 PC로 NVIDIA 기후 모델 추론 및 웹 시뮬레이션 병렬 개발', en: 'In a two-day hackathon we split across two laptops: one ran the NVIDIA climate model, the other built the web simulation for its output.' },
      { ko: 'cBottle 모델에 기후를 변수로 입력해 그 변화를 모델이 자동 계산, 같은 seed로 253개 조건 생성', en: 'The team fed cBottle changed sea temperature and wind, let the model fill in temperature, rain, pressure and water vapour, and pre-generated 253 conditions (23 SST × 11 wind steps) with a fixed seed.' },
      { ko: '추론 결과를 브라우저가 raw Float32 형식으로 받아 로더를 구현', en: 'Agreed a raw Float32 data format the browser reads without copying, and built the loader for it' },
      { ko: 'React · WebGL2로 5종 기후 변수 지도, 바람 입자 애니메이션, 3D 지구, ENSO 진단 패널 구현', en: 'Built maps for five climate variables, wind-particle animation, a 3D globe and an ENSO panel in React and WebGL2' },
      { ko: 'LRU 캐시로 슬라이더 조작 시 끊김 완화, 환경 변수 다운샘플로 데이터 최적화 (6.9GB → 1.8GB)', en: 'Kept the sliders smooth with a 96 MiB LRU cache and request cancelling, and cut the data from 6.9 GB to 1.8 GB with 0.5° downsampling' },
    ],
    troubles: [
      {
        title: { ko: '슬라이더를 빠르게 움직이면 끊기고 엉뚱한 조건이 늦게 그려짐', en: 'Fast slider moves stuttered and drew stale conditions late' },
        problem: { ko: '조건 하나를 바꿀 때마다 변수별 Float32 파일을 받아야 했습니다. 슬라이더를 끌면 요청이 쌓였고, 늦게 도착한 옛 조건의 응답이 최신 화면을 덮어썼습니다.', en: 'Every condition change fetched Float32 files per variable. Dragging a slider piled up requests, and late replies for old conditions overwrote the latest view.' },
        solution: { ko: '조건이 바뀌면 AbortController로 이전 요청을 취소해 마지막 조건만 그리게 했고, 받은 레이어는 96MiB 상한 LRU 캐시에 두어 되돌릴 때는 네트워크 없이 텍스처만 바꾸게 했습니다.', en: 'Cancelled earlier requests with AbortController so only the latest condition is drawn, and kept fetched layers in a 96 MiB LRU cache so going back just swaps a texture.' },
        result: { ko: '체감 성능은 평균 속도보다 “지금 볼 것을 먼저, 낡은 것은 버리기”에서 나온다는 것을 배웠습니다. 게임의 에셋 스트리밍 · 리소스 캐시와 같은 원리입니다.', en: 'Perceived speed comes from "show what\'s needed now, drop what\'s stale" more than raw speed — the same idea as asset streaming and resource caches in games.' } },
      {
        title: { ko: '6.9GB 데이터를 시연용 노트북에서 다뤄야 함', en: 'Handling 6.9 GB of data on a demo laptop' },
        problem: { ko: '253개 조건 × 6개 변수를 0.25° 격자로 저장하니 약 6.9GB였습니다. 해커톤 시연 환경에서 내려받고 서빙하기에 너무 컸습니다.', en: '253 conditions × 6 variables on a 0.25° grid came to about 6.9 GB, too big to download and serve on the demo setup.' },
        solution: { ko: '0.5° 격자점이 0.25° 격자점의 부분집합이라는 점을 이용해, 보간 없이 한 칸씩 건너뛰는 stride-2 다운샘플 도구를 만들었습니다.', en: 'Since 0.5° grid points are a subset of the 0.25° ones, I wrote a stride-2 downsampler that just skips every other point, with no interpolation.' },
        result: { ko: '6.9GB → 1.8GB. 압축보다 먼저 데이터 구조를 보면 손실 없는 방법이 있다는 것을 배웠고, 보간을 안 해 육지 경계도 그대로 유지됐습니다.', en: '6.9 GB → 1.8 GB. Looking at the data\'s structure before reaching for compression found a lossless option, and skipping interpolation kept coastlines intact.' } },
      {
        title: { ko: '같은 입력에도 매번 다른 결과를 내는 생성형 모델', en: 'A generative model that answers differently every run' },
        problem: { ko: 'diffusion 모델은 실행마다 결과가 달라, 두 결과의 차이가 “수온을 바꾼 효과”인지 “그냥 무작위”인지 구분할 수 없었습니다.', en: 'Diffusion models vary per run, so a difference between two results could be the changed sea temperature or just noise.' },
        solution: { ko: '기준 입력과 변경 입력을 같은 seed로 추론해 차이만 남기고, 무거운 추론 253건은 미리 계산해 화면은 가벼운 파일을 읽기만 하게 나눴습니다.', en: 'Ran baseline and changed inputs with the same seed to isolate the difference, and precomputed all 253 heavy inferences so the page only reads light files.' },
        result: { ko: '무거운 계산은 앞으로 빼고 실행 중에는 읽기만 하는 구조, 무작위성을 seed로 통제하는 감각은 게임의 베이킹 · 절차적 생성과 같은 사고방식이었습니다.', en: 'Moving heavy work ahead of time and controlling randomness with seeds is the same thinking as baking and procedural generation in games.' } },
    ],
    learned: [
      { ko: '데이터 형식을 먼저 맞춰 두면 모델 쪽과 웹 쪽이 서로를 기다리지 않고 병렬로 일할 수 있다는 것', en: 'Agreeing the data format first lets the model side and the web side work in parallel without waiting on each other' },
      { ko: 'diffusion 모델은 실행마다 결과가 달라서, 같은 seed로 비교해야 입력 변화의 효과만 볼 수 있다는 점', en: 'Diffusion models vary per run, so only a fixed seed isolates the effect of a changed input' },
      { ko: '무거운 AI 추론은 미리 계산해 두고, 화면은 가볍게 읽기만 하게 나누는 설계', en: 'Precomputing heavy AI inference so the page only has to read light files' },
    ] },
];

/* 제외한 프로젝트
const removedProjects = [
  { id: 'stockledger', icon: '💹', color: '#3ec46d', year: 2025,
    name: { ko: 'StockLedger 주식 매매 장부', en: 'StockLedger' },
    role: { ko: '개인 프로젝트 · 설계 실습', en: 'Personal project · Design practice' },
    summary: { ko: '계획서 → 요구사항 명세서 → 설계서 → UML(유스케이스·클래스·시퀀스) → 구현까지 한 사이클로 진행한 작은 CLI · 도메인/저장소/서비스 계층 분리, 보유 종목·실현 손익 계산', en: 'A small CLI taken through one full cycle: plan → requirements → design → UML (use-case, class, sequence) → code · domain/repository/service layers, positions and realized P/L' },
    stack: ['Python', 'UML'],
    stats: { impact: 40, scale: 30, craft: 65 },
    links: { github: 'https://github.com/Vqlntinx/StockLedger' } },
  { id: 'solar', icon: '🪐', color: '#a855f7', year: 2025,
    name: { ko: 'WebGL 태양-지구-달 렌더러', en: 'WebGL Sun-Earth-Moon Renderer' },
    role: { ko: '개인 프로젝트 · 그래픽스 실습', en: 'Personal project · Graphics practice' },
    summary: { ko: 'Three.js 없이 순수 WebGL로 셰이더 · Phong 조명 · 텍스처 · 카메라 시점 전환을 직접 구현', en: 'Raw WebGL, no Three.js: hand-written shaders, Phong lighting, textures and camera focus switching' },
    stack: ['JavaScript', 'WebGL', 'GLSL'],
    stats: { impact: 45, scale: 30, craft: 70 },
    links: { demo: 'https://vqlntinx.github.io/Solar_System/', github: 'https://github.com/Vqlntinx/Solar_System' } },
  { id: 'msg', icon: '🏦', color: '#f5b400', year: 2026,
    name: { ko: 'MSG Foundation 자금 계산 시스템', en: 'MSG Foundation Funds System' },
    role: { ko: '개인 프로젝트 · 설계 기반 구현', en: 'Personal project · Design-to-code' },
    summary: { ko: '사례 연구의 분석·설계 보고서를 C# 코드로 옮긴 모의 시스템 · 주간 자금 계산과 주택 구매 지원 승인 규칙 구현, Core/Console/Specs 구조와 외부 패키지 없는 규칙 검증 테스트', en: 'A mock system translating a case-study analysis/design report into C# · weekly fund computation and grant-approval rules, Core/Console/Specs layout with dependency-free rule tests' },
    stack: ['C#', '.NET'],
    stats: { impact: 45, scale: 35, craft: 70 },
    links: { github: 'https://github.com/Vqlntinx/MSG_Foundation_Mortgage_System' } },
];
*/

/* 예시 데이터
const exampleProjects = [
  { id: 'pixelboard', icon: '🎨', color: '#ff4d4d', year: 2025,
    name: { ko: '픽셀보드', en: 'PixelBoard' },
    role: { ko: '프론트엔드 리드', en: 'Frontend Lead' },
    summary: { ko: '실시간 협업 픽셀 아트 캔버스', en: 'Real-time collaborative pixel canvas' },
    stack: ['React', 'WebSocket', 'Canvas'], stats: { impact: 92, scale: 70, craft: 88 },
    links: { demo: '#', github: '#', notion: '#' } },
];
*/
