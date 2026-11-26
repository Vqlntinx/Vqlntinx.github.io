// width/height는 그 이미지의 실제 픽셀 크기. 비워두면(null) 임시로 그린 지형
export const worldMap = { image: './world-map.webp', width: 6144, height: 4096 };

// ✏️ 경험 = 지도 위의 장소. x, y는 지도 위 위치(%)이고, 핀의 뾰족한 끝이 그 지점을 가리켜요.
// 오래된 것부터 순서대로 (그 순서대로 길이 이어져요).
// kind(지도 아이콘): school | village | cafe | arena | beacon | castle | tower | shrine
// title · quests 안의 \n 은 줄바꿈
// story(선택): quests 아래 가로줄 밑에 나오는 긴 글. 백틱(`)으로 감싸면 줄바꿈을 그대로
//   빈 줄 = 문단 나눔, **글자** = 굵게. 없으면 그 칸은 숨겨짐
export const experience = [
  { id: 'dku', kind: 'school', x: 12.5, y: 55.5, period: '2020.03 – 2026.08',
    place: { ko: '단국대학교', en: 'Dankook University' },
    title: { ko: '최종 학점 : 3.91\n취득 학점 : 176', en: 'GPA : 3.91\nCredits : 176' },
    quests: [{ ko: '유럽중남미학부 독일학전공', en: 'German Studies (MAJOR)' }, { ko: 'SW융합대학 소프트웨어학과', en: 'Software Studies (DOUBLE-MAJOR)'}, { ko: '\'단웅즈\' 야구관람 동아리 활동', en : '\'Danwoongs\' Baseball Fan Club'}, { ko: '\'M.O.D.E\' e스포츠 동아리 활동', en: '\'M.O.D.E\' eSports Club'}],
    story: {
      ko: `독일학을 전공하고 소프트웨어학을 복수전공하며, **사람을 이해하는 눈과 문제를 논리적으로 푸는 힘**을 함께 기를 수 있었습니다.

독일학에서는 언어와 함께 그 언어를 쓰는 사회의 역사, 문화, 사고방식을 배웠습니다. 같은 문장도 맥락에 따라 전혀 다르게 읽힌다는 것을 배우며, 글과 말 너머에 있는 **상대의 의도와 맥락을 읽는 습관**을 갖게 되었습니다. 낯선 텍스트를 끝까지 붙들고 해석하는 과정은 끈기를 길러 주었습니다.

소프트웨어학에서는 문제를 작은 단위로 나누고, 조건과 예외를 하나씩 따져 가며 해결하는 **논리적인 문제 해결 방식**을 배웠습니다. 자료구조와 알고리즘, 데이터베이스, 설계를 공부하며 "왜 이렇게 동작하는가"를 끝까지 확인하는 태도를 익혔고, 이를 RocksDB 컴팩션 필터나 캡스톤 게임 같은 실제 프로젝트에 적용해 보았습니다.

두 전공은 서로 멀어 보이지만, 저에게는 하나로 이어졌습니다. 인문학이 **"무엇을, 왜 만들어야 하는가"**를 묻게 했다면, 소프트웨어는 **"어떻게 정확하게 만들 것인가"**에 답하게 했습니다. 사용자의 입장을 먼저 생각하고, 그것을 논리적인 구조로 옮기는 개발자가 되고자 하는 이유도 여기에 있습니다.

또한 야구 관람 동아리와 e스포츠 동아리 활동을 통해 전공 밖의 사람들과 어울리며 함께하는 즐거움, 나와 다른 사람들을 이해하는 법을 배웠습니다.`,
      en: `Majoring in German Studies with a double major in Software let me build two things at once: **an eye for understanding people and the ability to solve problems logically**.

German Studies taught me a language along with the history, culture and ways of thinking of the society that speaks it. Learning that the same sentence can read completely differently in another context gave me **the habit of reading the intent and context behind words**. Working through unfamiliar texts until they made sense also built my persistence.

Software taught me **a logical way to solve problems**: break them into small pieces and check each condition and edge case one by one. Studying data structures, algorithms, databases and design, I learned to keep asking "why does this work this way?" until I knew, and I put that into real projects like the RocksDB compaction filter and our capstone game.

The two majors look far apart, but for me they connect. The humanities taught me to ask **"what should we build, and why?"**, and software taught me to answer **"how do we build it correctly?"** That is why I want to be a developer who thinks from the user's side first and turns that into a sound, logical structure.

Through the baseball fan club and the eSports club, I also spent time with people outside my majors and learned the joy of doing things together and the value of communication.`,
    } },
  { id: 'lol', kind: 'arena', x: 49, y: 35, period: '2023.01 – 2023.07',
    place: { ko: 'LoL 대학 대표팀', en: 'LoL University Team' },
    title: { ko: '단국대학교 대표 (서포터)', en: 'Representing Dankook University' },
    quests: [{ ko: '경기게임문화센터배 대학교 대항전 참가', en: 'Competed in the Gyeonggi Game Culture Center inter-university cup' }, { ko: '2023 이스포츠 대학리그 LOL 전국 본선 진출', en: 'Qualified for the National Finals of the 2023 Esports University League (League of Legends)'}],
    story: {
      ko: `대학교 리그 오브 레전드 대표팀에서 서포터 포지션을 맡아 활동하며 **소통과 정보 전달의 중요성**을 배웠습니다.

서포터는 단순히 팀원을 보조하는 역할이 아니라, 경기 상황을 파악하고 필요한 정보를 전달하며 팀원들이 최상의 성과를 낼 수 있도록 돕는 포지션입니다. 이에 가장 필요한 부분은 게임의 흐름을 가장 빨리 읽고 한 수 앞을 먼저 바라보며 팀원들에게 알리는 것이었습니다. 저는 팀원들과 지속적으로 소통하고, 각자의 플레이 스타일과 강점을 이해하며 팀 전체의 호흡을 맞추는 데 집중했습니다.

특히 경기에서 불리한 상황에 직면했을 때 감정적으로 대응하기보다 문제의 원인을 분석하고 팀원들과 개선 방향을 논의하는 과정에서 **침착한 상황 판단력과 문제 해결 능력**을 기를 수 있었습니다.

가장 중요한 부분은 경기에서 패배했을 때 많이 배웠습니다. 승부욕에 휘말려 감정이 태도가 되지 않게 하고, 팀원들과 적극적으로 피드백을 하며 긍정적인 방향으로 팀워크를 향상시키는 것이었습니다.

이러한 경험을 통해 뛰어난 개인의 역량만큼이나 구성원 간의 신뢰와 유기적인 협력이 공동의 목표를 달성하는 데 중요하다는 사실을 깨달았습니다.`,
      en: `Playing support for my university's League of Legends team taught me **the value of communication and passing on information**.

Support isn't just about backing teammates up. It means reading the state of the game, passing on what the team needs to know, and helping everyone play at their best. Above all, it meant reading the flow of the game first, looking one move ahead, and telling the team. I kept talking with my teammates, learned each person's play style and strengths, and focused on getting the whole team in sync.

When we fell behind in a match, instead of reacting emotionally I looked for the cause and talked through fixes with the team, which built my **calm judgment and problem-solving under pressure**.

I learned the most from losses: not letting competitiveness turn into a bad attitude, and giving each other honest feedback to grow our teamwork in a positive direction.

This taught me that trust and close cooperation between teammates matter just as much as individual skill in reaching a shared goal.`,
    } },
  { id: 'discord', kind: 'beacon', x: 80, y: 74, period: '2024.07 – 2025.02',
    place: { ko: 'IT 및 게임 정보 공유 커뮤니티 (Discord)', en: 'IT & Game Info Community (Discord)' },
    title: { ko: '서버 운영진', en: 'Server moderator' },
    quests: [
      { ko: '300명 이상 규모 서버 운영', en: 'Ran a 300+ member server' },
      { ko: '주간 활성 사용자(WAU) 증대를 목표로 참여 이벤트 · 공지 기획', en: 'Planned events and announcements to grow weekly active users (WAU)' },
      { ko: '음성 채널 활동 순위 봇(Suribot)을 직접 만들어 도입, 꾸준한 참여 유도', en: 'Built and launched my own voice-activity ranking bot (Suribot) to keep members coming back' },
      { ko: '채널 구조 · 규칙을 정비하고 신규 멤버 안내', en: 'Reorganized channels and rules, and onboarded new members' },
      { ko: '신고 · 분쟁 대응 및 멤버 간 소통 중재', en: 'Handled reports and disputes, and mediated between members' },
    ],
    story: {
      ko: `300명 이상이 모인 IT · 게임 정보 공유 디스코드 서버의 운영진으로 활동하며 **사람이 머무는 공간을 만드는 법**을 배웠습니다.

서버는 인원이 많다고 살아 있는 것이 아니었습니다. 가입만 하고 조용히 떠나는 멤버가 많았고, 실제로 매주 대화에 참여하는 사람의 수가 커뮤니티의 진짜 크기라는 것을 알게 되었습니다. 그래서 주간 활성 사용자(WAU)를 기준으로 삼고, 어떤 공지와 이벤트에 사람들이 반응하는지 살피며 운영 방향을 조정했습니다.

참여를 늘리기 위해 개발자로서 할 수 있는 일도 찾았습니다. 음성 채널에서 함께 보낸 시간을 기록하고 순위로 보여주는 봇 'Suribot'을 직접 만들어 서버에 도입했고, 멤버들이 자연스럽게 다시 모이는 계기가 되었습니다. 이 경험으로 **기술은 실제 사람의 문제를 풀 때 가장 가치 있다**는 것을 느꼈습니다.

운영진으로서 분쟁이나 신고를 다룰 때는 한쪽 이야기만 듣지 않고, 정해진 규칙에 따라 일관되게 판단하려 노력했습니다. 규칙이 공정하게 지켜질 때 멤버들이 서버를 신뢰한다는 것을 배웠습니다.

이 경험을 통해 좋은 서비스는 기능만으로 완성되지 않으며, **사용자의 반응을 관찰하고 그에 맞춰 개선해 나가는 과정**이 중요하다는 사실을 깨달았습니다.`,
      en: `As a moderator of an IT and gaming Discord server with 300+ members, I learned **how to build a space where people actually stay**.

A big member count didn't mean the server was alive. Many people joined and quietly drifted away, and I realized the real size of a community is how many people take part each week. So I used weekly active users (WAU) as our yardstick, watched which announcements and events people responded to, and adjusted how we ran things.

I also looked for what I could do as a developer. I built 'Suribot', a bot that records time spent together in voice channels and shows it as a ranking, and brought it into the server, where it gave members a natural reason to come back. It taught me that **technology is most valuable when it solves a real person's problem**.

When handling disputes and reports, I tried not to hear only one side and to judge consistently by the rules. I learned that members trust a server when its rules are applied fairly.

This showed me that a good service isn't finished by its features alone: **watching how users respond and improving from there** is what matters.`,
    } },
];

// 빼둔 경험 (아르바이트)
//   { id: 'ashley', kind: 'cafe', x: 45.5, y: 71, period: '2019.12 – 2020.02',
//     place: { ko: '애슐리퀸즈 평택점', en: "Ashley Queens, Pyeongtaek" },
//     title: { ko: '아르바이트 · 매장 메이트', en: 'Part-time · Store crew' },
//     quests: [{ ko: '매장 메이트로 근무', en: 'Worked as store crew' }] },
//   { id: 'galbi', kind: 'village', x: 34, y: 43.5, period: '2021.01 – 2021.04',
//     place: { ko: '북촌삼대갈비 소사벌점', en: 'Bukchon Samdae Galbi, Sosabeol' },
//     title: { ko: '아르바이트 · 홀 / 운영', en: 'Part-time · Floor & operations' },
//     quests: [{ ko: '홀 업무', en: 'Floor service' }, { ko: '지점 운영관리 및 마감 정산', en: 'Store operations and closing settlement' }] },
//   { id: 'brunch', kind: 'cafe', x: 63, y: 52, period: '2023.09 – 2023.11',
//     place: { ko: '어나더 브런치카페', en: 'Another Brunch Cafe' },
//     title: { ko: '아르바이트 · 주방 / 카페', en: 'Part-time · Kitchen & cafe' },
//     quests: [{ ko: '주방 및 카페 업무 담당', en: 'Handled kitchen and cafe work' }] },