export const profile = {
  name: { ko: '정혁진', en: 'Jeong Hyoek-jin' },
  role: { ko: '주니어 개발자', en: 'Junior Developer' },
  intro: {
    ko: '게임은 예술이 아닌 것 같습니다.\n과거의 저는 게임을 하나의 \'예술\'로 바라봤습니다. 저만의 하나의 예술작품을 만들어보고 싶었습니다. 하지만 여러 게임을 하면서, 게임 세상을 바라보면서 든 생각은, 게이머들은 예술작품을 사고 싶은게 아닌 것 같습니다. 누군가는 친구들과 즐거운 시간을 보내고 싶었으며, 누군가에게는 고된 하루를 마무리하는 하나의 루틴이고, 또 누군가는 어려움을 이겨낸 성취감을 느끼고 싶어서 게임을 합니다. \n물론 게임에는 예술적 가치가 존재합니다. 아름다운 그래픽, 훌륭한 음악, 깊이 있는 서사는 게임의 완성도를 높여주는 요소입니다. 하지만 그것들이 게임의 본질을 대신할 수는 없습니다. \n저도 훌륭한 게임을 만드는 법은 아직 잘 모르겠습니다. 다만 제가 사랑하는 게임들의 한가지 공통점이었던, 그저 \'재미있는 게임\'을 만들기 위해 나아가겠습니다.',
    en: 'I don\'t think games are art.\nI used to see games as a kind of \'art\', and I wanted to make a work of art of my own. But after playing many games and looking at the world of games, I came to think that gamers don\'t want to buy a work of art. Some play to have a good time with friends, for some it is a routine that closes out a hard day, and others play to feel the satisfaction of overcoming a challenge.\nOf course, games have artistic value. Beautiful graphics, great music and a deep story all make a game more polished. But they cannot replace what a game is at its core.\nI still don\'t really know how to make a great game. But I will keep working toward the one thing the games I love have in common: simply being a \'fun game\'.',
  },
  avatar: './avatar.webp',
  birth: '2000-08-28',
  friendCode: 'tkzksktm01@gmail.com',
  links: [
    { id: 'email', label: 'Email', href: 'mailto:tkzksktm01@gmail.com' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/Vqlntinx' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vqlntinx' },
    { id: 'steam', label: 'Steam', href: 'https://steamcommunity.com/id/vqlntinx/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vqlntinx/' },
  ],
  quotes: [
    { text: { ko: '나를 죽이지 못하는 것은 나를 더 강하게 만든다.', en: 'What does not kill me makes me stronger.' },
      by: { ko: "프리드리히 니체, '우상의 황혼'", en: 'Friedrich Nietzsche, Twilight of the Idols' } },
    { text: { ko: '하지만 인간은 패배하도록 창조된 게 아니야. 인간은 파멸당할 수 있을지 몰라도 패배할 수는 없어.', en: 'But man is not made for defeat. A man can be destroyed but not defeated.' },
      by: { ko: "어니스트 헤밍웨이, '노인과 바다'", en: 'Ernest Hemingway, The Old Man and the Sea' } },
    { text: { ko: '배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각만 하고 배우지 않으면 위태롭다.', en: 'Learning without thought is labor lost; thought without learning is perilous.' },
      by: { ko: "공자, '논어 중 위정 편'", en: 'Confucius, The Analects (Wei Zheng)' } },
  ],
};

export function ageParts(birth = profile.birth, now = new Date()) {
  const [y, m, d = 1] = birth.split('-').map(Number);
  let months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  if (now.getDate() < d) months -= 1;
  return { years: Math.floor(months / 12), months: months % 12 };
}
