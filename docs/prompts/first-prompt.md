# First prompt — paste this as your opening message in Claude Code
# (Run from the repo root. Delete this file after use, or move it to docs/prompts/.)

Read CLAUDE.md and docs/manual/ (the wiki; formerly docs/field-manual.html) in full before doing anything else. Confirm you've read both by telling me the current week's gate and the three hard rules most relevant to today.

Then execute Week 0 bootstrap, session 1 — scoped strictly to what you can do before the UE project exists:

1. **Environment audit.** Check for git and git-lfs (versions), and report anything missing. Do not install anything without asking.

2. **Repo scaffold.**
   - `.gitignore` — standard Unreal Engine ignore set
   - `.gitattributes` — LFS tracking for `*.uasset` and `*.umap`
   - `UE-GOTCHAS.md` — empty except a one-line format header (date · symptom · cause · fix)
   - `docs/tomorrow-note.md` — created, first entry written at the end of this session
   - `scripts/build.sh` (and `.ps1` if you think it's warranted) — a placeholder that fails loudly with "UE project not created yet — see docs/week0-checklist.md" so nothing downstream silently no-ops

3. **Week-0 checklist.** Produce `docs/week0-checklist.md` splitting the remaining Week 0 work into:
   - **[NICK — GUI]**: install UE 5.7 via Epic launcher; create the Third Person C++ template project into this repo root; IDE decision (Rider vs VS2022); link Epic account ↔ GitHub now so week 7's source build isn't blocked on approval later
   - **[AGENT]**: everything that becomes possible the moment the project exists (clang database generation, build command capture into CLAUDE.md, first-commit hygiene)
   Order it by the Week 0 gate in the manual, each item with a one-line definition of done.

4. **One question, then close out.** Ask me the codename question (Week 0 open-questions block in the manual) — one question only. Then commit everything with a clean imperative message and write the first tomorrow-note.

Constraints: create no UE or C++ files, guess no build commands, install nothing unprompted. End your session with exactly three things: what you did, what's blocked on me, and the tomorrow-note contents.
