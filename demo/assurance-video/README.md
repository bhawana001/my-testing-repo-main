# assurance-loop — Remotion video

A 15-second, 1920×1080 (YouTube) terminal animation that walks through the
kane-cli **assurance loop** one command at a time: requirements → reviewed
use-cases → designed tests → authored in a real browser → batch replay →
coverage.

```bash
npm install
npm run dev       # Remotion Studio, live preview at localhost:3000
npm run render    # -> out/assurance-loop.mp4
```

- Composition: `AssuranceLoop`, 1920×1080, 30fps, 450 frames.
- The commands live in one place — [`src/steps.ts`](src/steps.ts). Edit that
  array to change the script; timing adapts as long as the step count and
  `durationInFrames` stay in sync (`INTRO + steps × STEP_LEN + outro = 450`).
- `render`/`still` pass `--browser-executable` pointing at Google Chrome,
  because Remotion's bundled Headless Shell download does not persist here.
  Drop that flag on a machine where `npx remotion browser ensure` works.
