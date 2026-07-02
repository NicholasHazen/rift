# Week 0 checklist — rig the workshop

Source: `docs/field-manual.html` §Week 00. Budget: ½ week, hard box. Setup week does not get an encore.

**The gate (definition of done):** Character runs in PIE with 2 clients · repo pushed · agent builds from CLI and correctly answers "where is player input handled in this project?" · Clip #001 posted.

Session 1 (2026-07-02) already done: environment audit (git 2.49.0, git-lfs 3.7.1, gh 2.86.0 — all present), repo scaffolding red-teamed by 3 review agents, `git init` + LFS hooks + initial commit, codename decided (**OneMoreRock** — manual rev r1.4), tomorrow-note started, this checklist. Everything below is what remains, ordered by the gate.

---

## [NICK — GUI] — nothing on the agent list unblocks until item 3 lands

1. **Install UE 5.7 via the Epic launcher** (binary build — do *not* source-build; that's week 7 for a reason).
   *Done when:* launcher Library shows 5.7 and the editor reaches the project browser.

2. **Link Epic account ↔ GitHub — while the engine downloads.** Approval latency is exactly why this happens now instead of blocking week 7's source build.
   *Done when:* the EpicGames org invite is accepted and https://github.com/EpicGames/UnrealEngine renders instead of 404 (logged in as NickHazen).

3. **Create the project: Third Person template, C++, into this repo root.** Name it **OneMoreRock** (codename resolved in session 1, manual rev r1.4) — renaming a UE project later is genuinely painful, which is why that question got answered before the launcher opened.
   ⚠ The Unreal Project Browser creates `<Location>/<ProjectName>/` and errors if that folder already exists. Practical path: create it at a temp location, quit the editor, move the *contents* (`.uproject`, `Source/`, `Content/`, `Config/`, …) into this repo root next to `CLAUDE.md`, reopen the `.uproject`. If this bites differently, it's the first UE-GOTCHAS.md entry.
   *Done when:* `OneMoreRock.uproject` and `Source/` sit at the repo root and the editor opens the project.

4. **First PIE run — multiplayer-shaped from minute one** (hard rule 2): before the first Play, set Number of Players = 2 and enable the dedicated-server option (Net Mode: Play As Client) in the PIE multiplayer settings.
   *Done when:* character runs in PIE with 2 clients + dedicated server → **gate item 1**.

5. **IDE decision: Rider vs VS2022 — decide in S1, don't churn later** (manual open question). Reality check: this machine is macOS, where VS2022 doesn't exist — the honest pair here is Rider vs Xcode/VS Code+clangd, unless UE development happens on a Windows box.
   *Done when:* the choice is recorded in CLAUDE.md and the manual's open question gets a RESOLVED tag + rev-log bump.

6. **Read the generated template C++ top to bottom, once.** It's short, and it's your first map of "where code lives" (manual: *You, by hand*).
   *Done when:* you can answer "where is player input handled?" before the agent does.

7. **Codename ceremony:** wire the agent-supplied ASCII splash; traffic-cone hat on the mannequin if it stays under ten minutes.
   *Done when:* the OneMoreRock splash renders on editor/PIE boot, and the cone hat is either on the mannequin or explicitly skipped at the 10-minute timebox — screenshot or clip exists.

8. **Record & post Friday Clip #001** — the character doing literally anything.
   *Done when:* posted to the friends' Discord → **gate item 4**.

---

## [AGENT] — everything unblocked the moment `<Codename>.uproject` exists at repo root

1. **First-commit hygiene → push** (**gate item 2**): audit the generated tree against `.gitignore`; confirm `git lfs ls-files` lists every committed `.uasset`/`.umap` and `git status` shows no `Binaries/`, `Intermediate/`, `Saved/`, `DerivedDataCache/`; extend `.gitattributes` if the template ships other large binary types; create the private GitHub remote (`gh repo create` — Nick approves name/visibility) and push.
   *Done when:* repo is pushed and a fresh clone opens clean in the editor.

2. **Capture real build commands into CLAUDE.md §Build**: find the exact macOS UnrealBuildTool invocation (`Engine/Build/BatchFiles/Mac/Build.sh`, Editor target, Development config), run it to prove it, then replace the failure stub in `scripts/build.sh` with the real thing.
   *Done when:* CLAUDE.md's Build section contains commands that just succeeded on this machine and `scripts/build.sh` builds the editor target.

3. **Generate the clang database**: `UnrealBuildTool -Mode=GenerateClangDatabase` → `compile_commands.json` at repo root; record the refresh command in CLAUDE.md (must be re-run after module/header changes).
   *Done when:* `compile_commands.json` exists, clangd jump-to-definition on the template Character class resolves from it, and the file stays out of git (already ignored).

4. **Gate proof** (**gate item 3**): build from CLI, then answer "where is player input handled in this project?" citing `file:line` in the generated source.
   *Done when:* the answer names the template character's input setup (Enhanced Input mapping + `SetupPlayerInputComponent`) and matches what Nick found in his own read-through.

5. **ASCII splash logo** for the codename ceremony (fun payload support).
   *Done when:* logo delivered; Nick wires it GUI-side.

6. **Folder-by-folder explainer of the project root** — the manual's first test of whether the context files actually work.
   *Done when:* Nick reads it and nothing in it contradicts what the editor shows.

7. **OPTIONAL — skip freely** (manual S3 calls it garnish, not dependency): evaluate Epic's experimental Unreal MCP plugin and/or UnrealClaude as an agent↔editor bridge. Deliberately deferred, not forgotten.
   *Done when:* evaluated-and-adopted, or skipped — either is a pass.
