# Experience 지도 이미지 프롬프트

## 프롬프트 (영어로 그대로 붙여넣기)

```
A hand-painted top-down fantasy world map for an open-world adventure game's map screen,
seen from directly above. One large continent filling most of a 3:2 landscape canvas,
surrounded by deep teal ocean that darkens toward every edge of the image.

Style: soft painterly gouache and watercolor, muted natural palette (sage and moss greens,
warm sand, slate-blue water, pale stone grey), gentle top-left lighting with soft terrain
shading, faint topographic contour lines over the land, very subtle parchment-like texture.
Calm, cozy, nostalgic. Consistent level of fine detail across the whole map so it still
looks good when zoomed in: individual trees, rocks, rivers, small roads, tiny buildings.

Landmarks (positions as % from left, % from top):
- around 14%, 70%: a quiet coastal plain with a small stone academy and a glowing shrine
- around 36%, 46%: rolling meadows with a small cozy village, farms and a windmill
- around 60%, 66%: a busy riverside town with a tall watchtower
- around 82%, 30%: a grand castle on a plateau beneath snowy mountains
- a faint winding dirt road connecting these four places in that order

Other regions to fill the world: snowy mountain range across the north, a dense ancient
forest in the west, a large lake near the center, a dry canyon / desert in the east,
rolling hills and small farms, rivers flowing from the mountains to the sea, a few small
islands off the coast, ruins and a lighthouse on cliffs.

No text, no labels, no letters, no numbers, no icons, no map pins, no UI, no legend,
no compass rose, no frame or border.
```

**Negative prompt** (해당 칸이 있는 도구만)
```
text, letters, words, labels, numbers, watermark, signature, logo, UI, HUD, icons, map pins,
markers, compass, legend, frame, border, grid labels, perspective view, isometric, tilted
camera, characters, people, blurry, low detail, oversaturated, neon
```

## 만드는 방법
1. **비율은 3:2 가로**로 설정하고, 도구가 허용하는 가장 큰 크기로 생성하세요(보통 2048×1365 이상).
2. 업스케일러(예: Upscayl 무료, Magnific, Topaz)로 **4800×3200**까지 키우세요. 대부분의 AI 이미지 도구는 처음부터 이 크기로 만들지 못하고, 지도를 크게 확대하려면 이 해상도가 필요해요.
3. **WebP(품질 80~85)** 로 저장하면 용량을 3~6MB 정도로 줄일 수 있어요.
4. `public/world-map.webp`로 넣고, `src/data/experience.js`의 `worldMap`을 이렇게 바꾸세요.
   ```js
   export const worldMap = { image: './world-map.webp', width: 4800, height: 3200 };
   ```
5. 핀 위치는 각 경험의 `x`, `y`(%)로 맞춥니다. 위 프롬프트는 지금 핀 위치에 랜드마크를 두도록 썼지만, 생성된 지도에서 위치가 조금씩 다를 수 있어요.

## 팁
- 게임 이름(젤다 등)은 프롬프트에 넣지 않았어요. 상표권 문제도 있고, 많은 이미지 도구가 실제 게임 이름을 거부하거나 원작을 너무 비슷하게 베끼기 때문이에요.
- 글자는 꼭 빼세요. 지명과 핀은 사이트가 위에 따로 그려서, 이미지에 글자가 있으면 겹쳐요.
- 가장자리가 어두운 바다로 끝나야, 최대로 축소했을 때 지도의 경계가 자연스럽게 보여요.
