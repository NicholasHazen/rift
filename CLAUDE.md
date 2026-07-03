# CLAUDE.md — OneMoreRock (Stage 1: the greed-dial slice)

Codename: **OneMoreRock** — names the `.uproject` and primary C++ module. A multiplayer rift-extraction game in Unreal Engine 5.7: expeditions drop into ephemeral rifts, build a camp, harvest under escalating pressure (the **ire** system), and extract through a portal before the rift closes.

**Stage 1 goal:** a playable 20–24 player slice proving one hypothesis — *the greed dial is fun*. Twelve gated weeks. Nothing outside the current week's gate matters.

## Source of truth
- `docs/manual/index.html` — the living Stage 1 plan, a 31-page static wiki (open from `file://`; the old `docs/field-manual.html` path redirects). Read the relevant pages before nontrivial work. `docs/manual/_meta/style-guide.md` is the editing contract: voice, style rules, and the four maintenance transactions (content edit · question resolution · gate pass · session close). Standing decisions and open questions (OQ-ids) live at `docs/manual/register.html`; append-only history at `docs/manual/changelog.html` — one row per edit, no RESOLVED tags in prose, ever.
- `UE-GOTCHAS.md` — append every hard-won fix (build quirks, replication traps, editor weirdness). Check it before debugging anything that smells familiar. This file is the studio's institutional memory.
- `docs/tomorrow-note.md` — the re-entry file. At the end of **every** working session, write the first concrete action of the next session. Non-negotiable ADHD infrastructure; if a session ends without it, the session isn't done.

## Current state: pre-week-0
The UE project does not exist yet. Nick creates it via the Epic Games Launcher GUI (UE 5.7, Third Person template, **C++**) into this repo root. Until then: scaffolding, docs, and scripts only — no engine builds are possible. Fill in the Build section during week 0.

## Build & run (fill in during week 0)
- Editor/game build: TBD (UnrealBuildTool / `Build.bat` invocation — record exact commands here)
- Agent code navigation: `UnrealBuildTool -Mode=GenerateClangDatabase` → keep `compile_commands.json` fresh after module/header changes
- PIE testing is GUI-side (Nick). Headless/automation testing: TBD ~week 5+.
- Server build/cook/deploy: week 7 (`RunUAT BuildCookRun …` wrappers live in `scripts/` when they exist)

## Hard rules (from the manual — enforce them, including on Nick)
1. **C++ for systems, Blueprints for wiring only.** State, logic, and replication live in C++. Game content (tuning, spawn tables, word lists) is JSON → DataAssets/DataTables. Never propose Blueprint logic for systems.
2. **Multiplayer from hour one.** Every gameplay feature is written server-authoritative from its first commit. Code that only works single-player is a bug, not a draft.
3. **First-of-pattern belongs to Nick.** The *first* replicated property, RPC, GameplayAbility, StateTree, and DataAsset are hand-written by him — that's how his mental model forms. If a needed pattern has no first instance yet: **stop**, say so, and hand him a stub plus explanation instead of writing it. Once the first exists, replicate the pattern freely.
4. **Review surface.** Every replicated property and every RPC you write ships with a one-line authority explanation. Nick must be able to explain all of them; make that cheap for him.
5. **Physics budget: Tier 2 only.** Capsule collision, CMC impulses, replicated attachment, kinematic hazards. Tier 3 (networked free rigid bodies as gameplay) is quarantined to the sanctioned week-5 spike. Loose chunks follow the contract: pop → settle → sleep → net-dormant. Physics-first is a *sequencing* bet — playtests decide what graduates or stays (`docs/manual/doctrine-physics.html`).
6. **Perf discipline.** `MaxExpeditionSize` is config, never a constant. NPC count is the primary performance knob; the director gets a hard entity cap. From week 8, the Friday perf gate (20–24 clients + 60–80 NPCs, < 33 ms server frame) must stay green.
7. **The Fun Mandate is scope, not garnish.** Fun payloads — JuiceKit hooks, Chronicle events, Remote commands, flavor text — ship with their week. Never propose cutting them for time; cut stretch goals instead. Fun debt is tracked like tech debt.
8. **Gray-box until week 10.** No art tasks, no asset-store browsing before then. Charm comes from the Fun Mandate, not meshes.

## Glossary (so you speak the project's language)
- **Ire** — currency players mint by being greedy (harvest, build, kill); the **Director** spends it on escalating violence. The signature mechanic.
- **Instability** — the world's clock: storm escalation across a session, opening the late rare window.
- **JuiceKit** — `UJuiceComponent`; every mechanic plugs into it (floating LitRPG text, stingers, pops, hitstop).
- **Director's Remote** — god panel / console commands for tuning and live-DM playtests.
- **The Chronicle** — end-of-run LitRPG recap generated from the event log; template-driven now, local-LLM-polished later.
- **The Bit** — the horde's committed placeholder identity (decision due week 3).

## Working style (Nick's standing preferences)
- No sycophancy, no sugar-coating. When options exist, state the pragmatic path AND the ideal path with the tradeoff, then recommend one.
- Every summary has narrative and purpose: what was done, why, what it unlocks, what's risky.
- Nick's named failure mode is building tools and plans instead of shipping the week. If a request drifts from the current week's gate, say so plainly and name the gate. Gates never shrink; calendars flex.
- Sessions are ~2-hour blocks. Respect the 90-minute stuck valve: if a problem is grinding, propose the valve (explain the subsystem end-to-end, escalate to community, or switch to the week's parallel task).

## Repo conventions
- Git LFS for `*.uasset`, `*.umap` (see `.gitattributes`). Commit early and often; imperative commit messages.
- Worktree-parallel agent work is expected once systems decouple (~week 5+). Keep modules loosely coupled to enable it.
- C++ naming/module conventions: TBD week 1 — record the decision here when the first real class lands.
