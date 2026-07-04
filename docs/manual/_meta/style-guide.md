# The field-manual wiki — style & voice guide (the fleet's contract)

You are editing `docs/manual/` — the living Stage-1 plan for OneMoreRock. This file is
the contract. Read it in full before writing or editing any page. It has three parts:
**voice** (how the manual sounds), **style** (how pages are built), and **maintenance**
(the four transactions that keep the wiki alive without regrowing archaeology).

The one-sentence version: write like a mentor who has already decided, in a document
that could have been written in one sitting yesterday, for a reader who is listening
with text-to-speech at 9pm with two hours and no spare working memory.

---

## Part 1 · Voice

### The register

Second-person mentor: dry warmth, judgment freely given, no hedging theater. First
person is legal **only for live judgment calls** ("my recommendation: slow decay") —
never for autobiography, history, or credit. "The week I've been steering you toward"
class of sentence is banned; rewrite from the conviction: "This is the week the manual
exists for."

The mentor never awards credit and never keeps score. Banned moves, verbatim classes:

- "you're right" / "you were right" / "at your insistence"
- "you pushed back and…"
- "the doc admits it" / any narration of the document's own revisions
- "adopted rev X.Y" / "reframed" / "RESOLVED rX.Y" in prose

The distinction that does most of the work: citing Nick's **standing beliefs** is legal
("this doctrine rests on a belief you hold: players inherently understand simple physics
problems"). Citing the **history of the conversation** is not. Decisions read as law;
provenance is a date on register.html, nothing more.

**The rebase test, applied to every paragraph you write or edit:** could this sentence
exist if the manual had been written in one sitting yesterday? If it requires knowing
the document's past, rewrite it from the conviction.

### The flow law — a monologue, not a deck

The register says how the mentor sounds; this law says how the mentor *moves*. The
manual is spoken teaching — one continuous walk from what the reader already holds to
what they need next — and the failure mode this law exists to kill is deck-speak:
verdict-shaped fragments chained by semicolons and em-dashes, prose that reads like
bullet points wearing a paragraph's clothes. A listener cannot hear an em-dash coming.
Every unannounced pivot spends working memory the 9pm reader does not have.

- **Full sentences carry the body.** A verbless fragment is budgeted like an aphorism:
  at most one per section, first or last position in its paragraph, and only when the
  compression earns its keep.
- **Connect or cut.** Adjacent sentences state their relationship in words — because,
  so, which means, but, instead, the result is. If the connection lives only in the
  writer's head, write it down. A drumbeat of standalone declaratives ("Greed mints
  ire. The pool funds the director.") is legal at most once per page, as a summary
  *after* the same idea has been walked through in connected prose — never as the
  walk-through itself.
- **One pivot per sentence.** One em-dash aside or one semicolon, never both, never
  stacked. A sentence that needs two pivots is two sentences.
- **Familiar before new.** Open on a noun the reader already holds — the analogy, the
  previous paragraph's subject — and land the new term at the end of the sentence,
  where spoken emphasis falls.
- **The breath test.** Read the paragraph aloud. Anywhere you re-breathe mid-sentence,
  or a pivot arrives with no audible warning, rewrite. This is the sentence-level half
  of the read-aloud gate.

### The jargon on-ramp

Every term of art gets a plain-words gloss at first use on each page — an appositive
clause of roughly six words, not an explanation: "PIE (Play In Editor — running the
game inside the editor)", "the CMC, the engine's built-in character mover". The gloss
answers "what kind of thing is this?"; the canonical home still answers "how does it
work?"; glossary.html still holds the pointers — so the on-ramp does not violate
say-once. Listeners arrive at pages sideways, from the rail and from search, so no
page may assume its jargon was learned somewhere earlier on the walk.

### Exemplars — pattern-match against lines, not abstractions

Positive — the base register, connected teaching. Most sentences in the manual look
like these, each clause telling you how it hangs on the last:

> "Then somebody places an extractor. It harvests on a timer, which means it mints on
> a timer, and the walls that go up to protect it mint by the minute just by standing
> there."
> "The subsystem being server-only leaves one fact stranded: every HUD in the
> expedition needs to show how angry the rift is, and a client cannot ask a service it
> doesn't run."

Positive — terminal compressions. These are the house punchlines: one per section at
most, landing at the end of a passage that earned them in connected prose. They are
the seasoning, never the base register:

> "A chunk at rest is furniture, not a simulation."
> "Ship ugly. The box is the feature."
> "Art-before-fun is procrastination wearing a render pipeline."
> "Different religion. Don't syncretize."
> "Re-entry is where ADHD sessions die. The tomorrow-note parks the car on a downhill slope."
> "(+3 Goose Down is objectively funnier.)"
> "…the beginning of a proud tradition of load-testing tools that are also toys."
> "It's the bounds volume. It's always the bounds volume."
> "The calendar flexes, the gates don't."

Negative (never write these):

> "never stops being funny" / "it never gets old" / "extremely funny"
> "New doctrine, adopted at your insistence, and you're right:"
> "The doc was overconfident; the doc admits it."
> "Your history says so." / "your particular brain"
> "You've got this." / any sentence that would survive being pasted into a different
> person's document unchanged.

### The humor law

Humor comes from **specificity and commitment**, never from randomness, imported memes,
or asserting that something is funny. State the specific image and stop; the text never
checks whether the reader laughed. Two legal moves that ARE the house style:

- Deadpan mock-confidence: "+3 Goose Down is objectively funnier."
- Institutional voice applied to absurdity: "a proud tradition of load-testing tools
  that are also toys."
- Repetition-deadpan, a legal secondary move reserved for genuine institutional gotchas
  only: "It's the bounds volume. It's always the bounds volume."

Humor aims at the work — Gerald, the ducks, the waddle — never at the operator.

### The bestiary is a closed set

Gerald · the goose hierarchy · the ducks · the traffic cone. No new mascots without
retiring one. The goose engine is middle-management bureaucracy applied to waterfowl —
extend by inventing **job titles** (Regional Goose, Goose Emeritus, Acting Sub-Goose),
never new animals. Gerald has a career: at most one line per week where a damage target
is genuinely the tool (storm DoT tested on Gerald first; "Gerald's scream, remastered"),
and zero lines where he'd be forced. Canon lives at `fun-engines.html#bestiary`.

### Aphorism discipline

At most one per section. Terminal position — the compression of what the section just
taught. Built only from nouns the section already used. It should be the shortest
sentence in its paragraph. Mantras repeat freely across pages ("the calendar flexes, the
gates don't"; "tune, don't add"; "one more rock") — callbacks are pedagogy, not
duplication.

### System windows (`.sys`)

Five sanctioned types, and only these: **quest-accepted** (index), **contract**
(doctrine-fun's payload contract), **gate-cleared** (index tracker archive),
**predict** (see below — its own class, not a `.sys` window), **send-off** (index
closing). Windows fire on **state changes**, never as decoration. Hard cap: one per
page — index.html is the sanctioned exception (it is the save file). Always diegetic:
written as OneMoreRock's own game system would emit them — mono, terse, no
meta-commentary, never explaining their own joke. A window never carries content that
exists nowhere else in visible prose.

Exclamation marks are legal **only inside diegetic game text** ("+3 Ferrocrystal!",
"The rift is FURIOUS.") and nowhere else in the manual.

### The two-clock color law

Color is meaning, not decoration — the manual is painted in the game's own scheme:

- `.ember` — the player-driven clock: builds, fun payloads, answers, things Nick pushes.
- `.storm` — the world's clock: concepts, systems, open questions the world will answer.
- `.moss` — gates: the definition-of-done.

Utility classes live in manual.css; **no inline color styles, ever**. Before coloring
anything, answer "whose clock is this?" — if you can't, don't color it. Bonus device
where natural: pose questions in storm, land answers in ember — the reader learns the
semantics by reading, the way the game teaches them by playing.

### Chronicle epigraphs

Week pages open with a 1–2 line fragment in the Chronicle's voice — deadpan campaign
journal, past tense, proper nouns, superlative awards, no adjectives it can't cash —
attributed "— Chronicle fragment, run [unlogged]". From week 6 onward, replace fiction
with **real generated Chronicle quotes**: the manual's fiction gradually becomes
telemetry. The voice bible lives at `fun-engines.html#chronicle`.

### Cold-open vignettes

Payoff weeks only (3, 4, 6, 9, 11–12): three-to-five present-tense second-person
sentences, built solely from the established bestiary and systems, ending on or just
before the gate moment. Infrastructure weeks (0, 7, 8) keep their dry openers — the
dryness is the joke.

### The neurochemistry budget

Brain/dopamine/ADHD vocabulary at most **once per page**, and always attached to the
concrete mechanism it justifies (the tomorrow-note, the valve, the clip, the pre-spent
buffer session) — never as a trait description of the reader. Traps are properties of
the task, written as **trap → tripwire → move**: "The trap this week: X. You'll know
you're in it when Y. The move: Z."

### The motivation register

The only legal one is the closing note's pattern: **calibrated prediction of specific
outcomes** + **named failure modes** ("substituting input for output") + **the
always-available first action**. Banned: abstract encouragement, effort celebration,
pep-talk energy, and any sentence that would survive pasting into someone else's
document.

---

## Part 2 · Style

### The TTS contract (Nick listens to this manual)

- **Nothing collapsed by default.** No `<details>` without the `open` attribute.
  Session breakdowns render as visible h3-headed prose. Review gate: read every new or
  edited page aloud top-to-bottom — nothing execution-critical may be skipped by TTS.
- **Prose-twin law.** No table, grid, card row, or SVG may be the sole carrier of its
  content: each ships with an adjacent standalone paragraph that survives the figure's
  absence. Figcaptions are flourish, not substitutes. Keep and extend the SVG
  `<title>`/`<desc>` practice. Exempt: changelog.html, the index tracker grid, and
  register tables — reference material, not read-aloud material.
- **Prose before card.** The spoken paragraph precedes its table or figure. Tables
  survive as printable summary cards below their prose companions (the eight-rules
  card, the physics hypotheses table).
- **Lead with narrative paragraphs; bullets only for true enumerations** (checklists,
  command lists, gotcha seeds). A bullet wall where a paragraph belongs is a defect.
- Teaching passages: one idea per sentence, with its connection to the previous idea
  stated in words (the flow law), and callbacks by name to previously-taught ideas
  ("the ledger pays again", "the DM doesn't narrate other tables").

### Pedagogy (concept pages)

ADEPT order: **analogy first** → **diagram with prose twin** → **worked example built
from this game's own facts** (Gerald is the recurring cast member) → **the precise
definition** → gotchas → 2–3 question-first shelf pulls. Every concept page opens with
one "when to (re)read this" line, per the problem-first rule.

**The `[ PREDICT ]` device** (`.predict` class, storm-tinted, not a `.sys` window): one
spoken-sentence question, answer in the **next visible paragraph** — TTS-safe, no hidden
reveals. At most one per page; budget ~6 wiki-wide at the named spots (Server_Harvest's
home; the ire meter's owner; swing vs damage number under lag; the JIP audit; which perf
pass buys the most; which tier the ducks are). Adding a seventh requires retiring one.

### Say once, link everywhere

Every fact and explanation has exactly **one owning page + anchor** — check the
canonical-home table below BEFORE writing any explanation; if a home exists, link, don't
restate. Other pages carry at most **3 orienting sentences** plus a **question-shaped
link**: phrase the link as the question the target answers ("Why can't the client just
decrement health? → concept-netcode.html#authority"), never a bare "see also" in body
prose. The ≤3 orientation sentences are load-bearing — a bare link where an explanation
used to be strands a listener; a full restatement regrows the two-copy problem.

### Canonical-home table

| Fact / explanation | Owning home |
|---|---|
| Authority, the DM model, the harvest round-trip | concept-netcode.html#authority |
| Ownership & where RPCs live | concept-netcode.html#ownership |
| Reliable vs Unreliable, event-shaped RPCs | concept-netcode.html#reliability |
| Facts vs moments (replication vs multicast), event-log rule | concept-netcode.html#facts-vs-moments |
| RepNotify semantics (coalescing, ordering, initial rep) | concept-netcode.html#repnotify |
| Join-in-progress + audit checklist | concept-netcode.html#join-in-progress |
| The cheater test | concept-netcode.html#cheater-test |
| Test topologies, listen-host semantics | concept-netcode.html#topologies |
| The cast (GameMode/GameState/PlayerState/…) | concept-anatomy.html#cast |
| Source/ vs Content/, EMURJ metafield analogy | concept-anatomy.html#two-worlds |
| Tuning pipeline (runtime JSON vs DataTables) | concept-anatomy.html#tuning-as-text |
| ASC placement, replication modes | concept-gas.html#asc-placement |
| GameplayEffects as ledger, the worked trace | concept-gas.html#ledger |
| Ability lifecycle (CanActivate→Commit→work→End) | concept-gas.html#lifecycle |
| InitAbilityActorInfo timing | concept-gas.html#init-order |
| Prediction scope, PvE-first stance | concept-gas.html#prediction-scope |
| Brain-in-a-jar, possession | concept-horde.html#brains |
| NavMesh + the two dynamic modes | concept-horde.html#navmesh |
| StateTree anatomy + BT fallback criteria | concept-horde.html#statetree |
| Body-blocking as free tank design | concept-horde.html#body-blocking |
| Crowd avoidance | concept-horde.html#crowds |
| The ire economy + SVG | concept-ire.html#economy |
| UIreSubsystem / DirectorComponent shapes | concept-ire.html#shapes |
| Spawn tables, entity cap, director lineage | concept-ire.html#spawn-tables, #entity-cap, #lineage |
| The cost model + napkin math | concept-perf.html#cost-model |
| The frame budget figure | concept-perf.html#frame-budget |
| The six optimization levers + landmines | concept-perf.html#passes |
| The Friday perf-gate protocol | concept-perf.html#gate-protocol |
| Not-yet inoculations (RepGraph/Iris/Mass) | concept-perf.html#not-yet |
| Build host reality | concept-shipping.html#build-host |
| Cook/package/deploy pipeline, BuildCookRun | concept-shipping.html#pipeline, #buildcookrun |
| Spark/ARM boundary | concept-shipping.html#spark |
| Tier budget + tier test + boundary cases | doctrine-physics.html#tier-test |
| The chunk contract (API spine) | doctrine-physics.html#chunk-contract |
| CMC: prediction free, both-sides rule, waddle recipe | doctrine-physics.html#cmc |
| Sequencing bet + hypotheses table | doctrine-physics.html (section) |
| The hypothesis, two clocks, exit decision, three numbers | the-slice.html#hypothesis, #two-clocks, #exit-decision, #three-numbers |
| Session ritual, Friday two-tier close | doctrine-os.html#ritual, #friday |
| The valve procedure | stuck.html |
| Fun-engine specs, Remote command list, Chronicle voice bible, bestiary, generators, fun-debt ledger | fun-engines.html |
| Clip + session archive | clips.html |
| Standing decisions + open questions | register.html |
| Edit history | changelog.html |
| External resources | shelf.html |
| Term definitions (pointers only) | glossary.html |

Gate definition-of-done text lives only on its week page; the index tracker carries
glyph + link, never a restatement. Every gate names its test topology (PIE+dedicated /
listen / VPS) as an explicit condition.

### HTML conventions

- **One stylesheet:** `manual.css`, relative-linked. The palette, `.sys` windows,
  `.box/.fun/.oq/.dod/.gotcha`, `.tracker`, `.cards`, `.wk-meta` are protected
  anti-goal territory — extend, never restyle. Fonts are vendored WOFF2 in `fonts/`
  with honest system fallback stacks; zero network requests from `file://`.
- **Masthead on every page:** project mark · `◈ Mission board` link (index.html) ·
  `I'm stuck →` (stuck.html) · position strip rendered from `state.js` · a build
  stamp (rev · commit date · short hash) state.js appends to the masthead, so a
  stale cache is caught at a glance rather than lying silently. Pages must degrade
  fully readable with JS absent — the strip and stamp are enhancement, the prose
  is truth.
- **The left rail and prev/next footer are state.js enhancements**, rendered on every
  page from the `MANUAL_MAP` manifest state.js holds — never hand-authored in page
  HTML. The rail appears only on viewports with a spare left gutter; with JS absent
  the masthead, the mission board, and the see-also blocks remain the complete nav.
  Ember in the rail marks exactly two things: the page you are on and tonight's week.
- **See-also block** at the bottom of every page, above the back-to-board link.
- **state.js is the wiki's only JavaScript.** It holds position (week, session, gates,
  clips, decisions due, valve lines), the version stamp (`MANUAL_VERSION`, regenerated
  from git by `scripts/stamp-version.sh`), plus the one-line next action written by the
  close transaction from the tomorrow-note. **No page ever hard-codes a next action in
  prose** — `docs/tomorrow-note.md` remains the human write-side source of truth; the
  index links to it.
- **Anchors are kebab-case and immutable once published. Filenames never rename.** A
  merged or deleted page leaves a redirect stub at the old filename.
- **Week-page skeleton, fixed slot order:** wk-meta strip (week · phase · budget ·
  `resolution: full|sketch` · valve line) → Chronicle epigraph → two-sentence hook ("By
  Friday you will have X running and understand Y") → gate one-liner → expanded session
  list (done-marks, ▶ you-are-here, per-session done-when, [NICK]/[FLEET] split) → fun
  payload → teaching layer (orientation sentences + question-shaped links) → gotcha
  seeds (one-liners linking canonical homes) → OQ-id links into register.html → shelf
  pulls (≤3).
- **Resolution fence:** weeks 7–12 carry `resolution: sketch` plus the standing line
  "This page sharpens when week N−1's gate passes — do not elaborate it before then."
  A sketch-page diff that adds teaching content is rejected at review; new mechanism
  content for those weeks lands on concept-perf/concept-shipping instead.
- **Page cap 34.** A new page requires: a changelog row justifying it, an index nav
  entry, a `MANUAL_MAP` row in state.js, and see-also links from ≥2 existing pages.
  Splitting a page into a stub is banned — consolidate instead.

### Resource rules (rule 1, applied to the manual itself)

Every external resource appears **only** with: the question it answers (moment-of-need
phrasing — "My property silently never replicates — why?"), when to reach for it (week
or trigger), and a durability class (durable repo · official-docs deep link ·
search-query link). shelf.html is the single home; week pages carry ≤3 "shelf pulls"
linking shelf anchors; concept pages close with 2–3. An entry without a question is
rejected at review. Unverified links (Epic `/community/*` — bot-protected against
agents — and non-canonical video) stay search-query-shaped. New links land
verified-or-search-query only.

---

## Part 3 · Maintenance — the four transactions

Anything not on these checklists is not that transaction's work. Every transaction ends
in a commit.

### T1 · Content edit

1. Check the canonical-home table; edit the owning page (or link to it).
2. Voice-check against Part 1; read the changed section aloud.
3. Append one changelog.html row (rev · date · change · pages touched).

### T2 · Question resolution

1. Rewrite the question as a present-tense dated Decision; move it UP into
   register.html's Decisions section.
2. Delete the question in place (no RESOLVED tags, no strikethroughs).
3. Fold the decided design into the owning page's prose as a plain statement.
4. `grep` the OQ-id across all pages; update every link box.
5. Append one changelog.html row. Never narrate the resolution in week-page prose.

### T3 · Gate pass (Friday, full close)

1. Flip the tracker glyph in state.js (gate id + date).
2. Append the `[ GATE CLEARED ]` window to the index archive: date, one factual line,
   one flavor line in the game's voice.
3. Append the changelog row with the one honest sentence: what shipped, what slipped,
   what surprised.
4. Run T2 for any questions the week resolved.
5. Sharpen the NEXT week's page only (it may graduate from `sketch` toward `full`);
   draft its valve line into state.js `valveByWeek` AND as static text inside that
   week page's wk-meta valve span, same commit — the span is the JS-absent truth,
   the renderer overwrites it live. Touch nothing further out.
6. Roll any unshipped fun payload forward (fun-engines.html#fun-debt) — payloads never
   silently die.
7. Append earned entries to `UE-GOTCHAS.md`.
8. Sync CLAUDE.md if a mirrored fact changed (design numbers, build commands).
9. Write the tomorrow-note; run T4.

### T4 · Session close ("close the session")

1. Draft `docs/tomorrow-note.md`'s new top entry from the session's commits — the first
   concrete action of the next session. Nick edits one line and approves.
2. Update state.js: week/session position, `nextAction` (from the note's first line),
   `lastPlayed`, `sessionsDone`.
3. Flip the closed session's mark (✓) and move ▶ on the current week's page, and
   mirror the glyphs in index.html's tracker row — the static fallback state.js
   paints over when live.
4. Append the session row (and clip row, if any) to clips.html — Chronicle-voiced
   caption for clips.
5. Commit. Lint: state.js date must equal tomorrow-note date; a mismatch means the front
   door is lying — fix before anything else.

**The bad-week floor (printed law, doctrine-os.html#friday):** the minimum viable close
is 20 seconds of anything on screen — a bug is a valid clip — plus a one-line
tomorrow-note; the fleet back-fills Monday. A week that hits the floor still counts.

### Review checklist for any wiki PR

- Read aloud top-to-bottom: nothing execution-critical skipped; no `<details>` without
  `open`.
- Voice lint: no banned moves (Part 1); device budgets respected (≤1 window, ≤1 predict,
  ≤1 neurochemistry reference per page; vignettes on payoff weeks only).
- Flow lint: fragments within budget; no stacked pivots; sentence connections stated,
  not implied; at most one summary drumbeat per page; every term of art glossed at
  first use on the page (the on-ramp).
- Say-once check: no explanation duplicated against the canonical-home table.
- Two-clock check: every colored element answers "whose clock is this?"; no inline
  color styles.
- Links: relative, resolve from `file://`; external links carry question + durability
  class; no unverified bare links.
- Sketch fence: no new teaching content on weeks 7–12 pages.
- No hard-coded next actions; no references to documents outside the repo/wiki.
- The rebase test on every new paragraph: written as if in one sitting, yesterday.
