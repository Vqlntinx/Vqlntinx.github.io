// ✏️ 내 정보. avatar는 public 폴더 기준 이미지 경로.
export const profile = {
  name: { ko: '정혁진', en: 'Jeong Hyoek-jin' },
  role: { ko: '주니어 개발자', en: 'Junior Developer' },
  avatar: './avatar.webp', // 마스코트 이미지 (public/avatar.webp)
  birth: '2000-08-28',
  friendCode: 'tkzksktm01@gmail.com',
  links: [
    { id: 'email', label: 'Email', href: 'mailto:tkzksktm01@gmail.com' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/Vqlntinx' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vqlntinx' },
    { id: 'steam', label: 'Steam', href: 'https://steamcommunity.com/id/vqlntinx/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vqlntinx/' },
  ],
  // ✏️ 프로필에 랜덤으로 뜨는 글귀. 계속 추가하세요 (en은 없으면 ko가 그대로 쓰여요).
  quotes: [
    { text: { ko: '나를 죽이지 못하는 것은 나를 더 강하게 만든다.', en: 'What does not kill me makes me stronger.' },
      by: { ko: "프리드리히 니체, '우상의 황혼'", en: 'Friedrich Nietzsche, Twilight of the Idols' } },
    { text: { ko: '하지만 인간은 패배하도록 창조된 게 아니야. 인간은 파멸당할 수 있을지 몰라도 패배할 수는 없어.', en: 'But man is not made for defeat. A man can be destroyed but not defeated.' },
      by: { ko: "어니스트 헤밍웨이, '노인과 바다'", en: 'Ernest Hemingway, The Old Man and the Sea' } },
    { text: { ko: '배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각만 하고 배우지 않으면 위태롭다.', en: 'Learning without thought is labor lost; thought without learning is perilous.' },
      by: { ko: "공자, '논어 중 위정 편'", en: 'Confucius, The Analects (Wei Zheng)' } },
  ],
};

// 만 나이를 년·개월로 (예: { years: 26, months: 3 })
export function ageParts(birth = profile.birth, now = new Date()) {
  const [y, m, d = 1] = birth.split('-').map(Number);
  let months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  if (now.getDate() < d) months -= 1;
  return { years: Math.floor(months / 12), months: months % 12 };
}
