date · symptom · cause · fix

2026-07-02 · (pre-seeded from research, not yet bitten) hot reload after C++ edits never works on this Mac · Live Coding is Live++-based and has no macOS support in UE 5.8 · close the editor, build via `Build.sh`, relaunch — never CLI-build while the editor holds the module dylibs

2026-07-02 · (pre-seeded from research, not yet bitten) engine or project suddenly fails to compile after an Xcode update · Epic pins each engine version to specific Xcode SDKs; newer Xcode than the engine blesses breaks builds · check `Engine/Config/Apple/Apple_SDK.json` in the UE 5.8 install and hold Xcode at a blessed version; don't auto-update

2026-07-02 · an Epic docs URL from a tutorial or an LLM's memory loads a near-empty "Table of Contents" page · the docs were reorganized around 5.6–5.8 (old slugs like `property-replication-in-unreal-engine`, `rpcs-in-unreal-engine`, `actor-relevancy-and-priority-in-unreal-engine` are gone) and the site serves a silent skeleton instead of a 404 · treat a skeleton page as a dead link; find the current slug via docs search or `docs/ue-docs-index.md`, or pin old behavior with `?application_version=5.x`. Bonus trap: `cross-compiler-in-unreal-engine` is the HLSL shader compiler, not Linux cross-compilation
