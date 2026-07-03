# Agent tooling — Claude Code × UE 5.8 on the Windows 11 PC

How the fleet plugs into the engine. Researched 2026-07-02 against UE 5.8 (released 2026-06-17);
re-pathed for the Windows 11 dev machine 2026-07-03 (register: d-devbox). Companion file:
`docs/ue-docs-index.md` (official docs per concept). Reader-facing resources stay on
`docs/manual/shelf.html`.

## The stance

Weeks 0–4 need **zero MCP**. The fleet's real job — compile, navigate, and edit C++ — runs on
clangd + CLI builds. The editor bridge is optional garnish, evaluated once in week 0 S3 inside a
timebox, adopted only if it earns its keep. Its sanctioned uses are running automation tests and
inspecting the live world; it never authors Blueprint logic (hard rule 1 applies to robots too).

## Tier 1 — the CLI loop (week 0, required)

Paths assume the launcher engine at `C:\Program Files\Epic Games\UE_5.8` and the repo at
`C:\Code\rift`; verify both after install and correct here.

**Build the editor target** (record the proven invocation in CLAUDE.md §Build once it succeeds):

```
"C:\Program Files\Epic Games\UE_5.8\Engine\Build\BatchFiles\Build.bat" ^
  OneMoreRockEditor Win64 Development ^
  -project="C:\Code\rift\OneMoreRock.uproject" -WaitMutex
```

**Generate the clang database** (repeat after module/header changes; it's non-incremental by
design — full regen every run is normal):

```
"C:\Program Files\Epic Games\UE_5.8\Engine\Build\BatchFiles\Build.bat" ^
  -mode=GenerateClangDatabase -project="C:\Code\rift\OneMoreRock.uproject" ^
  OneMoreRockEditor Win64 Development
```

It writes `compile_commands.json` into the **engine** directory by default — copy it to the repo
root, keep it out of git, and drop a `.clangd` file pointing at it (`CompilationDatabase: .`).
Unverified on this machine: the entries come out MSVC-flag-shaped; clangd handles clang-cl driver
mode, but if it chokes, regenerate with `-Compiler=Clang` appended and note the result here.

**The loop's one law: agents build with the editor closed.** Live Coding exists on Windows
(Ctrl+Alt+F11) and is Nick's in-editor iteration path for function-body edits — but a CLI build
while the editor holds the module DLLs corrupts state, and header/class-layout changes always
take the full close → build → relaunch cycle. (Seeded in UE-GOTCHAS.md.)

## Tier 2 — headless automation tests (~week 5+, when tests exist)

No plugin needed; works out of the box on Windows:

```
"C:\Program Files\Epic Games\UE_5.8\Engine\Binaries\Win64\UnrealEditor-Cmd.exe" ^
  "C:\Code\rift\OneMoreRock.uproject" ^
  -ExecCmds="Automation RunTests OneMoreRock.;Quit" ^
  -unattended -nopause -nosplash -nullrhi -nosound ^
  -testexit="Automation Test Queue Empty" -ReportExportPath="%TEMP%\onemorerock-tests" -log
```

`-ReportExportPath` emits JSON + HTML the fleet can parse. This is the backbone of the
"headless testing TBD ~week 5+" line in CLAUDE.md §Build. Gauntlet (multi-client orchestration)
waits for the week-8 perf gate; steep setup, not a week-0 problem.

## Tier 3 — the editor bridge (optional, week 0 S3 timebox)

UE 5.8 ships a first-party MCP server: the `ModelContextProtocol` engine plugin (Experimental,
disabled by default, loopback-only HTTP at `http://127.0.0.1:8000/mcp`, no auth). Epic pairs it
with an official Claude Code plugin: `EpicGames/unreal-engine-skills-for-claude-code-plugin`
(MIT) — skills plus 30+ toolsets (actors, StateTree, GAS, automation testing, scripting).

Adoption steps, if the timebox says yes:

1. Enable the `ModelContextProtocol` + `AllToolsets` engine plugins.
2. Sanity-check the server locally first (`ModelContextProtocol.StartServer` in the editor
   console, then hit the endpoint with MCP Inspector) — trust it after it answers, not before.
3. `ModelContextProtocol.GenerateClientConfig ClaudeCode` writes the client config; launch
   Claude Code from the repo root.
4. Optionally install Epic's Claude Code plugin via `/plugin marketplace add`.

Third-party MCP plugins (chongdashu/unreal-mcp, flopperam, kvick, runeape, monolith, …) are
stale, commercially pivoted, version-lagging, or too young — all superseded by the first-party
pair for a fresh 5.8 project. Fallback surfaces that need no MCP at all: the Editor Python
plugin (`-ExecutePythonScript=`) and the Remote Control HTTP API (port 30010).

## The EULA line

Epic's EULA bars using engine code as input where the AI **trains on it**. Claude Code under
Anthropic's commercial terms doesn't train on inputs by default, and Epic shipping an official
MCP + Claude Code plugin makes assistant *use* unambiguous. House rules: project source is
always fine; engine source through Claude Code is fine with training off; engine source never
goes into any tool that trains on inputs.
