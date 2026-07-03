# UE 5.8 official docs index — agent lookup map

Fetch-verified 2026-07-02 against the live docs site. This is the fleet's lookup layer: before
web-searching an engine question, check here for the canonical page. It is **not** the reading
list — human-curated, question-first resources live on `docs/manual/shelf.html`.

**Status legend:** `V` = fetched, page header confirms Unreal Engine 5.8 · `S` = no verifiable
page exists; use the given search query.

## Site mechanics (read before trusting any UE doc link)

- Bare URLs under `dev.epicgames.com/documentation/en-us/unreal-engine/<slug>` serve the **5.8**
  page by default. Pin older behavior with `?application_version=5.6` etc.
- **The site never serves a 404.** A dead slug returns a near-empty "Table of Contents" skeleton.
  Treat a skeleton as a dead link (seeded in `UE-GOTCHAS.md`).
- The docs were **reorganized around 5.6–5.8**. Stale slugs in tutorials and LLM memory:
  `property-replication-in-unreal-engine`, `rpcs-in-unreal-engine`,
  `actor-role-and-remoterole-in-unreal-engine`, `actors-and-their-owning-connections-in-unreal-engine`,
  `actor-relevancy-and-priority-in-unreal-engine` — all dead; replacements below.
- API reference pages (`/API/...`) are JS-rendered and unverifiable by fetch; treat them as
  search-index results.
- Booby-trapped slug: `cross-compiler-in-unreal-engine` is the **HLSL shader** cross-compiler,
  not Linux cross-compilation.

## A. Networking

| Topic | URL | Answers | St |
|---|---|---|---|
| Networking overview | https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-overview-for-unreal-engine | Client-server model, net modes, the three replication systems | V |
| Property replication + RepNotify | https://dev.epicgames.com/documentation/en-us/unreal-engine/replicate-actor-properties-in-unreal-engine | `Replicated`/`ReplicatedUsing`, `GetLifetimeReplicatedProps`, OnRep semantics | V |
| RPCs | https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-procedure-calls-in-unreal-engine | Server/Client/NetMulticast, `_Implementation`, reliability, ownership execution matrix | V |
| Actor ownership | https://dev.epicgames.com/documentation/en-us/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine | Which connection owns an actor; why that decides where RPCs run | V |
| Network role / authority | https://dev.epicgames.com/documentation/en-us/unreal-engine/actor-role-and-remote-role-in-unreal-engine | Authority vs autonomous/simulated proxy | V |
| Relevancy | https://dev.epicgames.com/documentation/en-us/unreal-engine/actor-relevancy-in-unreal-engine | Which actors each client hears about (`NetCullDistanceSquared`) | V |
| Priority | https://dev.epicgames.com/documentation/en-us/unreal-engine/actor-priority-in-unreal-engine | `NetPriority` bandwidth split under saturation | V |
| Dormancy | https://dev.epicgames.com/documentation/en-us/unreal-engine/actor-network-dormancy-in-unreal-engine | Sleeping settled actors off the rep list (the chunk contract's net-dormant step) | V |
| Detailed replication flow | https://dev.epicgames.com/documentation/en-us/unreal-engine/detailed-actor-replication-flow-in-unreal-engine | `ServerReplicateActors` internals: dormancy→relevancy→priority→frequency; closest thing to JIP internals | V |
| Join-in-progress | — | `unreal engine join in progress late join initial replication site:dev.epicgames.com` | S |
| Testing multiplayer in PIE | https://dev.epicgames.com/documentation/en-us/unreal-engine/testing-multiplayer-in-unreal-engine | Number of Players, net modes, Run Dedicated Server | V |
| Network emulation | https://dev.epicgames.com/documentation/en-us/unreal-engine/using-network-emulation-in-unreal-engine | Simulated lag/loss/jitter in PIE (rule-5 checkbox) | V |
| Multiplayer quick start | https://dev.epicgames.com/documentation/en-us/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine | Minimal worked C++ example: replication + RepNotify + RPC | V |
| Replication Graph | https://dev.epicgames.com/documentation/en-us/unreal-engine/replication-graph-in-unreal-engine | Scale-tier relevancy (parked; see concept-perf#not-yet) | V |
| Iris | https://dev.epicgames.com/documentation/en-us/unreal-engine/iris-replication-system-in-unreal-engine | Opt-in replication rewrite, production-ready in 5.8 (parked) | V |
| Network Profiler (legacy) | https://dev.epicgames.com/documentation/en-us/unreal-engine/using-the-network-profiler-in-unreal-engine | `.nprof` per-actor/property/RPC bandwidth | V |

## B. Gameplay framework & GAS

| Topic | URL | Answers | St |
|---|---|---|---|
| Gameplay framework overview | https://dev.epicgames.com/documentation/en-us/unreal-engine/gameplay-framework-in-unreal-engine | How the cast fits together | V |
| GameMode & GameState | https://dev.epicgames.com/documentation/en-us/unreal-engine/game-mode-and-game-state-in-unreal-engine | Server-only rules vs replicated match state | V |
| PlayerController | https://dev.epicgames.com/documentation/en-us/unreal-engine/player-controllers-in-unreal-engine | Controller vs pawn split; persistence across respawns | V |
| Pawn | https://dev.epicgames.com/documentation/en-us/unreal-engine/pawn-in-unreal-engine | The possessed world representation | V |
| Character | https://dev.epicgames.com/documentation/en-us/unreal-engine/characters-in-unreal-engine | Pawn + capsule + mesh + CMC | V |
| PlayerState | — | No concept page; API ref only — `APlayerState replication site:dev.epicgames.com` | S |
| GAS overview | https://dev.epicgames.com/documentation/en-us/unreal-engine/gameplay-ability-system-for-unreal-engine | Framework landing page | V |
| GAS concepts | https://dev.epicgames.com/documentation/en-us/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system | Ownership, state, prediction, cues-are-cosmetic | V |
| ASC | https://dev.epicgames.com/documentation/en-us/unreal-engine/gameplay-ability-system-component-and-gameplay-attributes-in-unreal-engine | ASC as actor↔GAS bridge, `IAbilitySystemInterface` | V |
| Attributes & AttributeSets | https://dev.epicgames.com/documentation/en-us/unreal-engine/gameplay-attributes-and-attribute-sets-for-the-gameplay-ability-system-in-unreal-engine | Base vs current value, replication macros | V |
| Gameplay Effects | https://dev.epicgames.com/documentation/en-us/unreal-engine/gameplay-effects-for-the-gameplay-ability-system-in-unreal-engine | Instant/duration/infinite ledger entries | V |
| Gameplay Abilities | https://dev.epicgames.com/documentation/en-us/unreal-engine/using-gameplay-abilities-in-unreal-engine | Lifecycle, costs, instancing, net execution policies | V |
| GameplayTags | https://dev.epicgames.com/documentation/en-us/unreal-engine/using-gameplay-tags-in-unreal-engine | Tag creation, ini/DataTable import, C++ queries | V |

## C. AI

| Topic | URL | Answers | St |
|---|---|---|---|
| StateTree hub | https://dev.epicgames.com/documentation/en-us/unreal-engine/state-tree-in-unreal-engine | Feature landing page | V |
| StateTree overview | https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-state-tree-in-unreal-engine | States, tasks, conditions, transitions, selection | V |
| StateTree quick start | https://dev.epicgames.com/documentation/en-us/unreal-engine/statetree-quick-start-guide | Building tasks/conditions in the editor | V |
| Behavior Trees | https://dev.epicgames.com/documentation/en-us/unreal-engine/behavior-trees-in-unreal-engine | The fallback model (concept-horde#statetree criteria) | V |
| Navigation system | https://dev.epicgames.com/documentation/en-us/unreal-engine/navigation-system-in-unreal-engine | The three generation modes: Static / Dynamic / Dynamic Modifiers Only | V |
| Navigation invokers | https://dev.epicgames.com/documentation/en-us/unreal-engine/using-navigation-invokers-in-unreal-engine | Runtime navmesh around agents (ephemeral rift maps) | V |
| AI Perception | https://dev.epicgames.com/documentation/en-us/unreal-engine/ai-perception-in-unreal-engine | Sight/hearing/damage senses | V |
| Crowd avoidance | https://dev.epicgames.com/documentation/en-us/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine | Detour Crowd vs RVO | V |
| Mass Entity overview | https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-mass-entity-in-unreal-engine | Fragments/archetypes/processors (parked, Stage 3) | V |

## D. Physics & movement

| Topic | URL | Answers | St |
|---|---|---|---|
| Movement components | https://dev.epicgames.com/documentation/en-us/unreal-engine/movement-components-in-unreal-engine | CMC concept home (old standalone CMC page is gone) | V |
| Networked movement prediction | https://dev.epicgames.com/documentation/en-us/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine | `FSavedMove_Character`, ServerMove, reconciliation — why CMC prediction is free | V |
| Chaos physics hub | https://dev.epicgames.com/documentation/en-us/unreal-engine/physics-in-unreal-engine | Landing page (no separate "chaos overview" in 5.8) | V |
| Physics replication | https://dev.epicgames.com/documentation/en-us/unreal-engine/networked-physics-overview | Default / Predictive Interpolation / Resimulation — governs the week-5 Tier-3 spike | V |
| Rigid body sleeping | https://dev.epicgames.com/documentation/en-us/unreal-engine/physics-bodies-reference-for-unreal-engine | Sleep Family, sleep thresholds, wake events (brief; no dedicated page) | V |
| Mover | https://dev.epicgames.com/documentation/en-us/unreal-engine/mover-in-unreal-engine | Experimental CMC successor (parked) | V |
| Mover vs CMC | https://dev.epicgames.com/documentation/en-us/unreal-engine/comparing-mover-and-character-movement-component-in-unreal-engine | Epic's own "CMC is the production choice" guidance | V |

## E. Data & content

| Topic | URL | Answers | St |
|---|---|---|---|
| Data Assets | https://dev.epicgames.com/documentation/en-us/unreal-engine/data-assets-in-unreal-engine | UDataAsset vs UPrimaryDataAsset, C++ setup | V |
| DataTables + CSV/JSON import | https://dev.epicgames.com/documentation/en-us/unreal-engine/data-driven-gameplay-elements-in-unreal-engine | Row structs, import flow, Curve Tables — the JSON→DataTable pipeline | V |

## F. Build & ship

| Topic | URL | Answers | St |
|---|---|---|---|
| UnrealBuildTool | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-build-tool-in-unreal-engine | UBT architecture, configurations | V |
| Modules / Build.cs | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-modules | Module anatomy, dependency lists | V |
| BuildCookRun / UAT | https://dev.epicgames.com/documentation/en-us/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine | The week-7 `scripts/` wrapper reference | V |
| UAT overview | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-automation-tool-overview-for-unreal-engine | What UAT is, how to invoke | V |
| Dedicated servers | https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-dedicated-servers-in-unreal-engine | Source build, Server target, local cook/test | V |
| Cooking & packaging | https://dev.epicgames.com/documentation/en-us/unreal-engine/packaging-your-project | Build/cook/stage/package/deploy stages | V |
| Linux toolchain | https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine | Cross-compile toolchain table (Windows-host — the dev PC's lane, once the engine is source-built) | V |
| VS setup (Windows) | https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine | VS 2022 17.14 + required workloads (Game development with C++, Desktop development with C++, .NET desktop development) — fetch-verified 2026-07-03 | V |
| GenerateClangDatabase | — | No official page; community knowledge — `UnrealBuildTool -mode=GenerateClangDatabase compile_commands.json clangd` | S |

## G. Performance

| Topic | URL | Answers | St |
|---|---|---|---|
| Unreal Insights | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-insights-in-unreal-engine | `.utrace` capture and analysis | V |
| Stat commands | https://dev.epicgames.com/documentation/en-us/unreal-engine/stat-commands-in-unreal-engine | `stat unit`, `stat net`, startfile/stopfile | V |
| Networking Insights | https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-insights-in-unreal-engine | `-trace=net` — the Friday perf-gate tool | V |
| Significance Manager | https://dev.epicgames.com/documentation/en-us/unreal-engine/significance-manager-in-unreal-engine | Importance-scored work throttling (pairs with the entity cap) | V |
| Animation Budget Allocator | https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-budget-allocator-in-unreal-engine | Fixed ms budget for 60–80 skeletal meshes | V |

## H. Orientation & C++ reference

| Topic | URL | Answers | St |
|---|---|---|---|
| Unity → Unreal mapping | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engines-systems-and-workflows-overview-for-unity-developers | System-by-system translation table | V |
| C++ programming guide | https://dev.epicgames.com/documentation/en-us/unreal-engine/programming-with-cplusplus-in-unreal-engine | Gameplay classes, reflection, containers, delegates | V |
| UPROPERTY specifiers | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-uproperties | Full table incl. `Replicated`/`ReplicatedUsing` | V |
| UFUNCTION specifiers | https://dev.epicgames.com/documentation/en-us/unreal-engine/ufunctions-in-unreal-engine | Full table incl. `Server`/`Client`/`NetMulticast`/`Reliable` | V |
| Directory structure | https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-directory-structure | What every folder means once the .uproject lands | V |
| Third Person template | https://dev.epicgames.com/documentation/en-us/unreal-engine/third-person-template-in-unreal-engine | What week 0 creates (+ Combat/Platforming/Side Scroller variants) | V |
| Enhanced Input | https://dev.epicgames.com/documentation/en-us/unreal-engine/enhanced-input-in-unreal-engine | Input Actions, Mapping Contexts, Modifiers, Triggers | V |
| 5.8 release notes | https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-8-release-notes | What changed in the engine we're on | V |
| Unreal MCP (agent bridge) | https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor | The first-party editor MCP server (see docs/agent-tooling.md) | V |
