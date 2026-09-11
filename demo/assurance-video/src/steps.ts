export type Tone = 'plain' | 'pass';

/** The pipeline shown on the rail above the terminal. */
export const STAGES = [
  'Source Requirements',
  'Scenario Design',
  'AI Code Generation',
  'Agentic Verification',
  'Sealed Evidence',
  'Ship Verdict',
] as const;

export type Step = {
  /** Index into STAGES — which stage of the loop this command belongs to. */
  stage: number;
  command: string;
  /** The dim "↳" line under the command — what the command is doing. */
  note: string;
  /** Optional indented sample of the command's own output. */
  detail?: {text: string; tone?: Tone};
  result: {text: string; kind: 'ok' | 'link' | 'warn'};
};

/**
 * The assurance loop in the order kane-cli prescribes:
 * requirements → reviewed use-cases → designed tests → authored → replayed → evidence → coverage.
 */
export const STEPS: Step[] = [
  {
    stage: 0,
    command: 'kane-cli context ingest ./PRD-refunds.md',
    note: 'snapshotting the requirements · content-addressed',
    result: {text: '1 source ingested → .context/', kind: 'ok'},
  },
  {
    stage: 0,
    command: 'kane-cli context extract --mode agent',
    note: 'proposing use-cases · every claim cited to the source',
    result: {text: '5 use-cases proposed · derived', kind: 'ok'},
  },
  {
    stage: 0,
    command: 'kane-cli context review --verdicts verdicts.json',
    note: 'checkpoint · promotion is the human’s call, not the agent’s',
    result: {text: '5 approved · derived → trusted', kind: 'ok'},
  },
  {
    stage: 1,
    command: 'kane-cli design tests --use-case UC-refund --per-ac',
    note: 'writing one test per AC · each oracle proves its AC',
    detail: {text: 'T-refund-approved   AC-refund-1   expect status == refunded'},
    result: {text: '8 tests written · 2 gaps ranked', kind: 'ok'},
  },
  {
    stage: 1,
    command: 'kane-cli context review --verdicts design.json',
    note: 'checkpoint · the design is approved before anything runs',
    result: {text: '8 tests kept · trusted', kind: 'ok'},
  },
  {
    stage: 2,
    command: 'kane-cli testmd run .testmuai/tests/t-refund-approved_test.md --agent',
    note: 'the agent authors the runnable test in a real browser',
    result: {text: 'authored · recording committed', kind: 'ok'},
  },
  {
    stage: 3,
    command: 'kane-cli run --impacted-by AC-refund-4 --build 1843',
    note: '9 tests impacted · isolated context · replay-free',
    detail: {text: 'PASS   refund-day-14 · refund-amount · refund-auth', tone: 'pass'},
    result: {text: 'passed → ./checkout.evidence', kind: 'link'},
  },
  {
    stage: 4,
    command: 'kane-cli evidence validate ./checkout.evidence --json',
    note: 'steps, screenshots, console + network — sealed in one pack',
    result: {text: 'pack valid · 9 runs · tamper-evident', kind: 'ok'},
  },
  {
    stage: 5,
    command: 'kane-cli cover --use-case UC-refund --rollup strict',
    note: 'strict 7/8  ·  lenient 8/8  ·  2 gaps ranked',
    result: {text: 'AC-refund-6 email — lenient, not counted', kind: 'warn'},
  },
];
