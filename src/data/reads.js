// ✏️ 읽은 책 = 동물의 숲풍 도서관 책장. color는 책등 색, rating은 1~5(잎사귀 개수).
// review는 독후감
export const reads = [
  { id: 'r1', color: '#e8826b', height: 92, date: '2026.09',
    title: { ko: '미야모토 시게루의 게임론', en: 'Shigeru Miyamoto: Super Mario Bros., Donkey Kong, The Legend of Zelda' }, author: { ko: '제니퍼 드윈터', en: 'Jennifer deWinter' }, rating: 5,
    review: { ko: '게임을 만들다보면 자연스럽게 기술적인 부분에 집중하게 된다. 주어진 기능을 어떻게 구현할지, 발생한 버그를 어떻게 해결할지, 어떻게 더 효율적인 구조로 만들지 등을 고민하는 시간이 많다. 하지만 이 책을 읽고서 게임 개발에서 가장 중요한 것이 무엇인지 다시 생각하게 되었다. 결국 게임의 본질은 기술 그 자체가 아니라, 플레이어에게 어떤 재미와 경험을 전달하느냐에 있다. 가장 인상 깊었던 부분은 미야모토 시게루가 게임을 바라보는 관점이었다. 그는 복잡한 이야기나 화려한 연출에 의존하기보다 플레이어가 직접 움직이고, 탐색하고, 발견하는 과정에서 재미를 느낄 수 있도록 게임을 설계했다. 특히 슈퍼 마리오와 젤다의 전설을 통해 공간 자체가 플레이어의 행동을 유도하고 새로운 경험을 만들어 낸다는 점이 흥미로웠다. 게임 속 공간은 단순히 캐릭터가 움직이는 장소가 아니라, 플레이어에게 자연스럽게 규칙을 알려 주고 호기심을 자극하는 요소였다.', en: '' } },
  { id: 'r2', color: '#6fa8dc', height: 100, date: '2023.08',
    title: { ko: '클린 코드', en: 'Clean Code' }, author: { ko: '로버트 C. 마틴', en: 'Robert C. Martin' }, rating: 4,
    review: { ko: '이 책에서 가장 인상 깊었던 부분은 코드는 작성하는 시간보다 읽는 시간이 훨씬 많다는 관점이었다. 처음에는 코드를 작성할 때 얼마나 효율적으로 구현하는지가 중요하다고 생각했다. 그러나 실제 업무를 경험하면서 기존 코드를 분석하거나 다른 사람이 작성한 코드를 이해하는 데 상당한 시간이 필요하다는 것을 느꼈다. 특히 게임 개발에서는 하나의 기능이 여러 시스템과 연결되는 경우가 많아 코드의 흐름을 이해하기 어려우면 작은 수정에도 많은 시간이 소요될 수 있다. 이러한 경험을 떠올리며 가독성은 단순히 코드를 보기 좋게 만드는 것이 아니라 개발 효율과 유지보수에 직접적인 영향을 주는 중요한 요소라는 점을 깨달았다.', en: '' } },
  { id: 'r3', color: '#93c47d', height: 86, date: '2025.06',
    title: { ko: '논어', en: 'The Analects' }, author: { ko: '공자', en: 'Confucius' }, rating: 5,
    review: { ko: '', en: '' } },
  { id: 'r4', color: '#f6c26b', height: 96, date: '2025.03',
    title: { ko: '게임 디자인 원론', en: 'The Art of Game Design' }, author: { ko: '제시 셸', en: 'Jesse Schell' }, rating: 5,
    review: { ko: '', en: '' } },
  { id: 'r5', color: '#b4a7d6', height: 90, date: '2024.12',
    title: { ko: '우상과 황혼', en: 'The Twilight of the Idols' }, author: { ko: '프리드리히 니체', en: 'Friedrich Nietzsche' }, rating: 5,
    review: { ko: '', en: '' } },
  { id: 'r6', color: '#76a5af', height: 98, date: '2024.09',
    title: { ko: '노인과 바다', en: 'The Old Man and the Sea' }, author: { ko: '어니스트 헤밍웨이', en: 'Ernest Hemingway' }, rating: 5,
    review: { ko: '', en: '' } },
  { id: 'r7', color: '#e06666', height: 84, date: '2024.05',
    title: { ko: '데미안', en: 'Demian' }, author: { ko: '헤르만 헤세', en: 'Hermann Hesse' }, rating: 5,
    review: { ko: '', en: '' } },
  { id: 'r8', color: '#a2c4c9', height: 94, date: '2024.02',
    title: { ko: '돈키호테', en: 'Don Quixote' }, author: { ko: '미겔 드 세르반테스', en: 'Miguel de Cervantes' }, rating: 5,
    review: { ko: '', en: '' } },
  { id: 'r9', color: '#ffd966', height: 88, date: '2023.11',
    title: { ko: '차라투스트라는 이렇게 말했다', en: 'Thus Spoke Zarathustra' }, author: { ko: '프리드리히 니체', en: 'Friedrich Nietzsche' }, rating: 5,
    review: { ko: '', en: '' } },
];


/* 틀
  { id: '', color: '#', height: , date: '202.',
    title: { ko: '', en: '' }, author: { ko: '', en: '' }, rating: ,
    review: { ko: '', en: '' } },
*/