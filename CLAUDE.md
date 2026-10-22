## Definition of done
- The dev server runs on http://localhost:4321.
- After every feature, verify it in a real browser with kane-cli before saying it is done:
  kane-cli run "<objective>" --url http://localhost:4321/<page> --agent
- Read the final run_end line. If it failed, fix the code and run kane-cli again.
- Never tell me a feature works unless kane-cli passed. Paste the share link in your summary.
- Run kane-cli runs one at a time, never in parallel.
