# 홈 카드 커버 이미지 프롬프트

카드 5장을 "게임 패키지 패러디" 커버로 만드는 프롬프트예요.
모든 프롬프트는 **영어 그대로** 이미지 AI에 붙여넣으세요.

## 먼저 읽어주세요: 저작권을 피하는 원칙

실제 게임 표지를 AI에 넣으면 결과물이 원작과 너무 비슷해지기 쉬워요. 특히 캐릭터나 로고가 남으면, "패러디"라고 해도 공개 사이트에서는 문제가 될 수 있어요. 그래서 아래 원칙을 지키는 게 가장 안전해요.

1. **원본 표지는 '분위기 참고'로만 쓰세요.** 이미지 참고 강도를 설정할 수 있는 도구라면 **낮게(0.2~0.35)** 두세요. 텍스트 프롬프트만으로 만들 수 있으면 그게 제일 안전해요.
2. **원작 캐릭터, 로고, 제목 글꼴, 상징물은 절대 넣지 않아요.** 아래 각 프롬프트의 `Avoid` 목록이 이걸 막아줘요.
3. **모든 커버에 같은 오리지널 주인공('Player One')을 등장시켜요.** 원작 캐릭터 대신 내 캐릭터가 주인공이라서 "새로운 작품"이라는 게 분명해지고, 다섯 장의 통일감도 생겨요.
4. **제목은 패러디 제목만 넣어요.** (SUPER PROJECT, GAME·DEX 등)

## 공통 블록 (모든 프롬프트 앞에 붙이기)

```
Square 1:1 video game box-art style illustration for a personal portfolio website.
The hero is an ORIGINAL character called "Player One": a cheerful young adventurer with
messy dark-brown hair, cyan over-ear headphones, an orange hoodie and navy pants.
Original artwork only. No real game logos, no existing game characters, no trademarked
symbols, no publisher marks, no age-rating badges, no copyright text.
```

**원본 표지를 참고 이미지로 넣는 경우 공통 블록 뒤에 추가:**
```
Use the attached cover ONLY as a loose reference for overall composition, color mood and
genre feeling. Do not copy its characters, logo, title, typography, symbols or any
distinctive design element. The result must be a clearly new, original illustration
that playfully nods to the genre.
```

---

## 1. Projects — 슈퍼마리오풍 플랫포머

```
Bright, glossy 3D-rendered platformer world in a cheerful toy-like style. Blue sky with
puffy clouds, rolling green hills, floating orange brick blocks and golden mystery blocks,
green warp pipes, spinning gold coins. Player One is jumping mid-air with a fist raised,
bumping a mystery block from which a glowing laptop and colorful code brackets </> pop
out with sparkles. Dynamic diagonal composition, high energy, saturated colors.
Title at the top in chunky rounded multicolor 3D letters with a thick dark outline:
"SUPER PROJECT".
```
`Avoid:` red cap, mustache, blue overalls, mushroom characters, turtle or shell enemies, any plumber, any existing logo.

## 2. Experience — 젤다(야숨/왕눈)풍 오픈월드

```
Painterly open-world fantasy adventure scene with a soft cel-shaded watercolor look,
golden-hour light. Player One, seen from behind, stands on a grassy cliff edge with a
long red-orange scarf flowing in the wind, looking over a vast valley with rivers,
waterfalls and distant mountains. Floating sky islands with ancient stone ruins drift
in the sky. Calm, epic, nostalgic mood.
Title at the bottom in an elegant engraved gold serif font: "THE CHRONICLE OF EXPERIENCE",
with a small subtitle below: "Tears of the Deadline".
```
`Avoid:` green tunic, pointed elf ears, blond hero, triangle emblem, famous sword or shield designs, eye-shaped tribal symbols.

## 3. Skills — 별의 커비풍 드림랜드

```
Pastel dreamy cartoon world: pink and lavender sky, fluffy white clouds, a soft rainbow,
twinkling stars. A big friendly yellow star with a cute smiling face flies through the
sky, and Player One rides on top of it, waving happily. Around them float shiny round
bubbles, each holding a skill icon: code brackets, a paintbrush, a gear, a database
cylinder, a terminal window. Round, soft, bouncy shapes; candy-like colors.
Title in round bubbly pink letters with a thick white outline: "SKILLS DREAM LAND".
```
`Avoid:` pink round puffball character, penguin king, any existing star vehicle design, any existing logo.

## 4. Games — 포켓몬 도감풍 GAME·DEX

```
A glossy red handheld encyclopedia gadget in a playful anime style, opened up, with a big
glowing blue lens light and small red, yellow and green indicator lights. Its screen shows
a grid of colorful game cartridges drawn like cute collectible creatures with tiny eyes.
Player One stands beside it, pointing excitedly at the screen, with a few game cartridges
floating around like caught creatures. Bright adventure-anime colors, clean line art.
Title at the top in bold white letters with a red outline: "GAME·DEX".
```
`Avoid:` red-and-white capture ball, electric yellow mouse, any existing creature, any existing logo.

## 5. Reads — 동물의 숲풍 아늑한 도서관

```
Cozy village scene in a soft rounded 3D toy-like style with chunky proportions, warm
sunny afternoon. A small wooden library cottage with round windows, flower boxes and
leaf-shaped decorations, bookshelves overflowing with colorful books visible inside.
Player One, in cute chibi proportions, sits under a big leafy tree reading a book, with
fallen leaves and a cup of tea nearby. Warm cream, leaf green and wood-brown palette.
Title on a rounded white badge with a small green leaf: "BOOK CROSSING", and a small green
pill-shaped subtitle below: "New Pages".
```
`Avoid:` leaf logo of any game, raccoon shopkeeper, yellow dog secretary, brown owl with bow tie, any existing villager.

---

## 만든 뒤에

- **크기:** 정사각형 **1024×1024 이상**이 좋아요(1536×1536 권장).
- **글자가 깨질 때:** 제목 글자가 이상하게 나오면 다시 생성하거나, 프롬프트에서 Title 줄을 빼고 `No text.`를 붙여서 그림만 만드세요. 제목은 사이트에서 코드로 얹어드릴 수 있어요.
- **넣는 방법:** 파일을 `public/cards/` 폴더에 `projects.webp`, `experience.webp`, `skills.webp`, `games.webp`, `reads.webp` 이름으로 넣으세요. 그다음 `src/components/HomeShell.jsx`의 `CARDS`에서 `image: null`을 `image: './cards/projects.webp'`처럼 바꾸면 돼요. 파일만 주시면 변환과 연결은 제가 해드릴게요.
