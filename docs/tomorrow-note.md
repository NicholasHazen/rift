# Tomorrow note

Re-entry file. One entry per session, newest first: the *first concrete action* of the next session, written before the current one ends. If a session ends without an entry here, the session isn't done (CLAUDE.md).

---

## 2026-07-03 → next session

**First action:** Rig the PC (Windows 11): `winget install Git.Git GitHub.cli`, then Claude Code from PowerShell — `irm https://claude.ai/install.ps1 | iex` — then `gh auth login`, `gh repo clone NicholasHazen/rift`, and open Claude Code once from the repo root. Then start the UE 5.8 install in the Epic Games Launcher and work down week-0 S2's list.

Context for re-entry: the dev machine is the Windows 11 PC (register: `d-devbox`); week-0 S2 on `docs/manual/week-00.html` is written for it — Visual Studio 2022 with the *Game development with C++* workload before the create step, the IDE ballot is VS vs Rider (OQ-02), and the build-host question (OQ-03) now leans "the PC doubles as it." The manual reads from https://nicholashazen.github.io/rift/manual/ before git exists on the PC. Git for Windows carries Git LFS; Claude Code wants Git for Windows installed first (it uses its bash).

## 2026-07-02 → next session

**First action:** Open the Epic Games Launcher and start the UE 5.8 install (binary, not source). While it downloads, do week0-checklist NICK item 2: link Epic account ↔ GitHub and accept the EpicGames org invite.

Context for re-entry: codename is **OneMoreRock** — that's the exact name to type into the Project Browser (Third Person, C++). The Project Browser won't create into this repo root directly; the workaround is in the gotcha box on `docs/manual/week-00.html`. Everything the fleet can do next is queued in that page's S2 [FLEET] list and unblocks the moment `OneMoreRock.uproject` lands at repo root.
