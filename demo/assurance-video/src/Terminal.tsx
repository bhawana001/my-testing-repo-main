import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {STAGES, STEPS, Tone} from './steps';

/* ── timing (30fps · 450 frames · 15s) ────────────────────────── */
const INTRO = 16;
const STEP_LEN = 45;
const TYPE_LEN = 15;
const FADE = 6;
const RAMP = 8; // frames a new line takes to push the scroll

/* ── palette, taken from the reference frame ──────────────────── */
const C = {
  page: '#F2F1EC',
  body: '#1B1B1B',
  chrome: '#262626',
  edge: '#000000',
  path: '#7DC97F',
  chevron: '#6E6E6E',
  cmd: '#F4F4F2',
  dim: '#7C7C7C',
  detail: '#EAEAE8',
  green: '#6FCF7F',
  blue: '#5B9BF8',
  amber: '#E0A93B',
  title: '#8C8C8C',
  rail: '#121212',
  railEdge: '#282828',
  stageOff: '#4A4A4A',
  stageDone: '#8A8A8A',
  stageOn: '#F4F4F2',
};

const SANS =
  "-apple-system, 'SF Pro Text', Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const RAIL_H = 116;
const LINE_H = 60;
const VIEWPORT_H = 804;
const CMD_SIZE = 36;
const SUB_SIZE = 34;

type Line =
  | {kind: 'blank'; at: number}
  | {kind: 'command'; at: number; text: string}
  | {kind: 'note'; at: number; text: string}
  | {kind: 'detail'; at: number; text: string; tone: Tone}
  | {kind: 'result'; at: number; text: string; res: 'ok' | 'link' | 'warn'};

/** Flatten the loop into the exact lines the terminal prints, with their timing. */
const buildLines = (): Line[] => {
  const out: Line[] = [];
  STEPS.forEach((s, i) => {
    const start = INTRO + i * STEP_LEN;
    if (i > 0) out.push({kind: 'blank', at: start - 6});
    out.push({kind: 'command', at: start, text: s.command});
    out.push({kind: 'note', at: start + 20, text: s.note});
    if (s.detail) {
      out.push({kind: 'detail', at: start + 26, text: s.detail.text, tone: s.detail.tone ?? 'plain'});
    }
    out.push({kind: 'result', at: start + 31, text: s.result.text, res: s.result.kind});
  });
  return out;
};

const LINES = buildLines();

const smooth = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

export const Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  /* Continuous line count → the scroll glides instead of snapping. */
  const shown = LINES.reduce((n, l) => n + smooth((frame - l.at) / RAMP), 0);
  /* +1.2 lines of lookahead so the line being typed is never clipped. */
  const scroll = Math.max(0, (shown + 1.2) * LINE_H - VIEWPORT_H);

  const stepIndex = Math.min(
    STEPS.length - 1,
    Math.max(0, Math.floor((frame - INTRO) / STEP_LEN))
  );
  const activeStage = STEPS[stepIndex].stage;

  const appear = smooth(frame / 16);
  const outFade = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: C.body, opacity: outFade}}>
      {/* full-bleed terminal — the window IS the frame */}
      <div style={{position: 'absolute', inset: 0, background: C.body, opacity: appear}}>
        {/* the loop, as a rail above the terminal */}
        <div
          style={{
            height: RAIL_H,
            background: C.rail,
            borderBottom: `1px solid ${C.railEdge}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 15,
            fontFamily: SANS,
            fontSize: 25,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {STAGES.map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 ? <span style={{color: '#3A3A3A', fontWeight: 400}}>→</span> : null}
              <span
                style={{
                  color:
                    i === activeStage ? C.stageOn : i < activeStage ? C.stageDone : C.stageOff,
                  borderBottom:
                    i === activeStage ? `3px solid ${C.green}` : '3px solid transparent',
                  paddingBottom: 6,
                  transition: 'none',
                }}
              >
                {label}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* title bar */}
        <div
          style={{
            height: 92,
            background: C.chrome,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 56,
            gap: 17,
          }}
        >
          {['#E0645C', '#DFB040', '#5DBB63'].map((c) => (
            <div key={c} style={{width: 22, height: 22, borderRadius: 11, background: c}} />
          ))}
          <div
            style={{
              fontFamily: SANS,
              fontSize: 32,
              color: C.title,
              marginLeft: 26,
              letterSpacing: 0.2,
            }}
          >
            kane-cli · assurance
          </div>
        </div>

        {/* scrolling body */}
        <div
          style={{
            height: VIEWPORT_H,
            padding: '34px 60px',
            overflow: 'hidden',
            /* lines dissolve as they scroll under the title bar instead of being sliced */
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, #000 66px)',
            maskImage: 'linear-gradient(to bottom, transparent 0px, #000 66px)',
          }}
        >
          <div style={{transform: `translateY(${-scroll}px)`}}>
            {LINES.map((l, i) => (
              <Row key={i} line={l} frame={frame} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Row: React.FC<{line: Line; frame: number}> = ({line, frame}) => {
  const age = frame - line.at;
  if (age < 0 || line.kind === 'blank') return <div style={{height: LINE_H}} />;

  const base: React.CSSProperties = {
    height: LINE_H,
    fontFamily: SANS,
    lineHeight: `${LINE_H}px`,
    whiteSpace: 'pre',
    opacity: smooth(age / FADE),
    display: 'flex',
    alignItems: 'center',
  };

  if (line.kind === 'command') {
    const typed = Math.round(
      interpolate(age, [0, TYPE_LEN], [0, line.text.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    );
    const typing = age < TYPE_LEN;
    return (
      <div style={{...base, fontSize: CMD_SIZE}}>
        <span style={{color: C.path}}>~/checkout</span>
        <span style={{color: C.chevron, margin: '0 18px'}}>❯</span>
        <span style={{color: C.cmd}}>{line.text.slice(0, typed)}</span>
        {typing ? <span style={{color: C.cmd, opacity: 0.75}}>▏</span> : null}
      </div>
    );
  }

  if (line.kind === 'note') {
    return (
      <div style={{...base, fontSize: SUB_SIZE, color: C.dim}}>
        <span style={{marginRight: 20}}>↳</span>
        {line.text}
      </div>
    );
  }

  if (line.kind === 'detail') {
    return (
      <div
        style={{
          ...base,
          fontSize: SUB_SIZE,
          color: line.tone === 'pass' ? C.green : C.detail,
          paddingLeft: 52,
        }}
      >
        {line.text}
      </div>
    );
  }

  const glyph = line.res === 'ok' ? '✓' : line.res === 'link' ? '→' : '!';
  const color = line.res === 'ok' ? C.green : line.res === 'link' ? C.blue : C.amber;
  return (
    <div style={{...base, fontSize: SUB_SIZE, color}}>
      <span style={{marginRight: 20}}>{glyph}</span>
      {line.text}
    </div>
  );
};
