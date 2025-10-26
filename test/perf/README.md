# DrRx Performance Harness

`test/perf/run.js` generates a synthetic `.drrx` tree (about 50k lines by default) and runs the shared linter to capture a rough throughput baseline.

## Usage

- `npm run perf:drrx` &ndash; execute the harness with the default 50,000 line target.
- `node test/perf/run.js --lines 75000` &ndash; override the target line count (rounded up to the nearest full bundle).

The harness prints the line count, elapsed wall-clock time, calculated lines-per-second, and asserts that the synthetic tree produces zero diagnostics.

## Current Baseline (local dev)

Command: `node test/perf/run.js`  
Environment: local workstation (Node.js v18, Windows Subsystem for Linux)  
Output:

```
[drrx-perf] targetLines=50000 actualLines=50003 blocks=5000
[drrx-perf] elapsed=47.62ms throughput=1050055 lines/sec
[drrx-perf] diagnostics=0
```

Use these figures as a coarse guardrail when optimizing the tokenizer or diagnostics passes; a 20% regression should trigger investigation before release.

CI does not fail on this script yet, but it is available via `npm run perf:drrx` for manual checks and future automation.
