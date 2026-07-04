/* ============================================================================
   state.js — the save file. The wiki's ONLY JavaScript.

   Loaded by every page via <script src="state.js" defer>. file:// blocks
   fetch; a plain script src works everywhere.

   SHAPE
     week          number   — current week (0–12)
     session       number   — the NEXT session to play (1-based within week)
     sessionsDone  number   — total sessions completed, all weeks
     lastPlayed    string   — ISO date of the last close-session
     nextAction    string   — first concrete action of the next session,
                              drafted from docs/tomorrow-note.md's first line
     nextActionHref string  — where the full re-entry context lives
     gates         [{id, date, fact, flavor}]      — cleared gates, in order
     clips         [{n, week, date, caption, link}] — Friday clips
     decisionsDue  [{oqId, dueWeek, line}]          — open questions with dates
     valveByWeek   {week: "Valve: …"}               — pre-chosen 90-min valves

   WHO WRITES THIS FILE — exactly two transactions (style-guide.md, Part 3),
   always in the SAME atomic commit that writes docs/tomorrow-note.md:

     T3 · Gate pass: "Flip the tracker glyph in state.js (gate id + date)"
     and "draft its valve line into state.js `valveByWeek`."

     T4 · Session close: "Update state.js: week/session position, `nextAction`
     (from the note's first line), `lastPlayed`, `sessionsDone`."
     Lint: "state.js date must equal tomorrow-note date; a mismatch means the
     front door is lying — fix before anything else."

   No page ever hard-codes a next action in prose; docs/tomorrow-note.md stays
   the human write-side source of truth. Pages must render fully readable when
   this file is absent — the strip is enhancement, the prose is truth.

   This file also holds MANUAL_MAP — the manual's page manifest — from which
   the renderer builds the left rail and the prev/next footer on every page.
   Same law applies: enhancement only, the masthead and mission board are the
   JS-absent truth. Adding a page = adding a MANUAL_MAP row, same commit as
   its changelog row.
   ========================================================================== */

/* ---- Version stamp --------------------------------------------------------
   Which revision + commit is on screen, rendered into the masthead so a stale
   cache — a browser or the Pages CDN — is visible at a glance instead of lying
   silently. `rev` rides the latest changelog row; `date` and `commit` are the
   commit date and short hash of the content commit this file was stamped
   against. Regenerated from git by scripts/stamp-version.sh — don't hand-edit
   the date or commit; bump `rev` when you add the changelog row. */
const MANUAL_VERSION = {
  rev:    "r8",
  date:   "2026-07-04 14:54 UTC",
  commit: "4b5f8a2"
};

const MANUAL_STATE = {
  week: 0,
  session: 2,
  sessionsDone: 1,
  lastPlayed: "2026-07-03",
  nextAction: "Rig the PC: install Git + gh + Claude Code, clone the repo, then start the UE 5.8 install",
  nextActionHref: "../tomorrow-note.md",
  gates: [],
  clips: [],
  decisionsDue: [
    { oqId: "OQ-02", dueWeek: 0, line: "IDE: Visual Studio vs Rider — decide in S2" },
    { oqId: "OQ-03", dueWeek: 1, line: "The build host — does the dev PC double as it? Needs sign-off" },
    { oqId: "OQ-01", dueWeek: 3, line: "Commit to the Bit" }
  ],
  valveByWeek: {
    0: "Valve: switch to the parallel task — read the generated template code top to bottom, or hand the fleet an [AGENT] checklist item."
  }
};

/* ---- The manual map --------------------------------------------------------
   One entry per page, grouped exactly like the index's mission board. The
   renderer builds the left rail (wide viewports only) and each page's
   prev/next footer from this list — no page hand-authors either. Enhancement
   only: with JS absent, the masthead, the mission board, and the see-also
   blocks remain the complete nav. A new page buys its row here in the same
   commit as its changelog row (style-guide.md §HTML conventions). */
var MANUAL_MAP = [
  { group: "Doctrine", pages: [
    ["doctrine-fun.html",     "The Fun Mandate"],
    ["doctrine-physics.html", "Physics-legible first"],
    ["doctrine-os.html",      "Operating system"]
  ]},
  { group: "Target", pages: [
    ["the-slice.html", "The greed-dial slice"]
  ]},
  { group: "Concepts", pages: [
    ["concept-netcode.html",  "Netcode"],
    ["concept-anatomy.html",  "Project anatomy"],
    ["concept-gas.html",      "GAS — abilities"],
    ["concept-horde.html",    "The horde"],
    ["concept-ire.html",      "Ire & the director"],
    ["concept-perf.html",     "Performance"],
    ["concept-shipping.html", "Shipping"]
  ]},
  { group: "Weeks", chips: true, pages: [
    ["week-00.html",    "W0 · Rig the workshop",     "W0"],
    ["week-01.html",    "W1 · The resource node",    "W1"],
    ["week-02.html",    "W2 · Combat (GAS)",         "W2"],
    ["week-03.html",    "W3 · The rift pushes back", "W3"],
    ["week-04.html",    "W4 · Ire & the director",   "W4"],
    ["week-05.html",    "W5 · Camp as machine",      "W5"],
    ["week-06.html",    "W6 · The whole story",      "W6"],
    ["week-07.html",    "W7 · Real infrastructure",  "W7"],
    ["week-08.html",    "W8 · Earning the 24",       "W8"],
    ["week-09.html",    "W9 · Two clocks",           "W9"],
    ["week-10.html",    "W10 · Feel & legibility",   "W10"],
    ["week-11-12.html", "W11–12 · The fun test",     "W11·12"]
  ]},
  { group: "Reference", pages: [
    ["fun-engines.html", "The fun engines"],
    ["register.html",    "Decisions & questions"],
    ["shelf.html",       "The shelf"],
    ["glossary.html",    "Glossary"]
  ]},
  { group: "Workflow", pages: [
    ["stuck.html",     "The 90-minute valve"],
    ["clips.html",     "Clips & sessions"],
    ["changelog.html", "Changelog"]
  ]}
];

/* ---- Renderer --------------------------------------------------------------
   Fills the [data-state] slots. Never throws when a slot is missing: every
   lookup is a querySelectorAll loop over what actually exists on the page. */
(function () {
  "use strict";

  function el(tag, text, attrs) {
    var node = document.createElement(tag);
    if (text) node.textContent = text;
    if (attrs) for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function fill(selector, build) {
    var nodes = document.querySelectorAll('[data-state="' + selector + '"]');
    for (var i = 0; i < nodes.length; i++) {
      try {
        nodes[i].textContent = "";
        build(nodes[i]);
      } catch (e) { /* a broken slot must never break the page */ }
    }
  }

  function actionLink() {
    return el("a", MANUAL_STATE.nextAction, { href: MANUAL_STATE.nextActionHref });
  }

  /* The current week's page. Weeks 11–12 share one file. */
  function weekHref() {
    var w = MANUAL_STATE.week;
    if (w >= 11) return "week-11-12.html";
    return "week-" + (w < 10 ? "0" + w : w) + ".html";
  }

  /* This page's filename; pages live flat in docs/manual/. */
  function hereFile() {
    return location.pathname.split("/").pop() || "index.html";
  }

  /* The left rail: on-this-page anchors + the mission-board map, built from
     MANUAL_MAP. Appended to <body> AFTER .wrap so linear readers (TTS) finish
     the prose first; manual.css shows it only when the viewport has a spare
     left gutter. Ember marks exactly two things: the page you are on, and
     tonight's week. */
  function renderRail() {
    if (typeof MANUAL_MAP === "undefined" || document.querySelector(".rail")) return;
    var here = hereFile();
    var rail = el("nav", null, { "class": "rail", "aria-label": "Manual map" });

    rail.appendChild(el("a", "◈ Mission board", {
      href: "index.html",
      "class": "rail-home" + (here === "index.html" ? " here" : "")
    }));

    var heads = document.querySelectorAll("h2[id]");
    if (heads.length >= 2) {
      rail.appendChild(el("div", "On this page", { "class": "rail-h" }));
      for (var i = 0; i < heads.length; i++) {
        rail.appendChild(el("a", heads[i].textContent.trim(), { href: "#" + heads[i].id }));
      }
    }

    var nowChip = MANUAL_STATE.week >= 11 ? 11 : MANUAL_STATE.week;
    for (var g = 0; g < MANUAL_MAP.length; g++) {
      var group = MANUAL_MAP[g];
      rail.appendChild(el("div", group.group, { "class": "rail-h" }));
      var holder = rail;
      if (group.chips) {
        holder = el("div", null, { "class": "rail-weeks" });
        rail.appendChild(holder);
      }
      for (var p = 0; p < group.pages.length; p++) {
        var page = group.pages[p];
        var cls = page[0] === here ? "here" : "";
        var attrs = { href: page[0] };
        if (group.chips) {
          if (p === nowChip && !cls) cls = "now";
          attrs.title = page[1];
        }
        if (cls) attrs["class"] = cls;
        holder.appendChild(el("a", group.chips ? page[2] : page[1], attrs));
      }
    }
    document.body.appendChild(rail);
  }

  /* Prev/next within the page's own mission-board group, injected just above
     the back-to-board footer. Weeks walk W0 → W11–12; concepts walk the
     curriculum. Pages outside the map (index) get nothing. */
  function renderPagenav() {
    if (typeof MANUAL_MAP === "undefined" || document.querySelector(".pagenav")) return;
    var here = hereFile();
    var top = document.querySelector("p.top");
    if (!top) return;
    for (var g = 0; g < MANUAL_MAP.length; g++) {
      var pages = MANUAL_MAP[g].pages;
      for (var p = 0; p < pages.length; p++) {
        if (pages[p][0] !== here) continue;
        var nav = el("nav", null, { "class": "pagenav", "aria-label": "Neighboring pages" });
        if (p > 0) nav.appendChild(el("a", "← " + pages[p - 1][1], { href: pages[p - 1][0], "class": "prev" }));
        if (p < pages.length - 1) nav.appendChild(el("a", pages[p + 1][1] + " →", { href: pages[p + 1][0], "class": "next" }));
        if (nav.childNodes.length) top.parentNode.insertBefore(nav, top);
        return;
      }
    }
  }

  /* The masthead build stamp: rev · date · commit, appended to .masthead so no
     page hand-authors it; flex-basis:100% drops it onto its own line. The hash
     links to the commit on GitHub. Metadata, not a clock — faint neutral.
     Enhancement only: absent without JS, like the position strip. */
  function renderVersion() {
    if (typeof MANUAL_VERSION === "undefined") return;
    var head = document.querySelector(".masthead");
    if (!head || head.querySelector(".buildstamp")) return;
    var v = MANUAL_VERSION;
    var stamp = el("span", null, { "class": "buildstamp" });
    stamp.appendChild(document.createTextNode("rev " + v.rev + " · " + v.date + " · "));
    stamp.appendChild(el("a", v.commit, {
      href: "https://github.com/NicholasHazen/rift/commit/" + v.commit,
      title: "the commit this page was built from"
    }));
    head.appendChild(stamp);
  }

  function render() {
    var s = MANUAL_STATE;

    /* Masthead position strip: "W0 · S2 · next: {nextAction}".
       The W·S pair links the current week's page — the ritual's click two. */
    fill("position", function (slot) {
      slot.appendChild(el("a", "W" + s.week + " · S" + s.session, { href: weekHref() }));
      slot.appendChild(document.createTextNode(" · next: "));
      slot.appendChild(actionLink());
    });

    /* Any door marked data-week-door points at the current week's page.
       href-only rewrite: the static href (week-00.html) is the JS-absent truth. */
    var doors = document.querySelectorAll("[data-week-door]");
    for (var i = 0; i < doors.length; i++) {
      doors[i].setAttribute("href", weekHref());
    }

    /* The index tracker (marked data-tracker): paint the cleared column from
       gates[] and the current week's row from session position. Enhancement
       only — the static glyphs are the JS-absent truth, maintained at close. */
    var tracker = document.querySelector("[data-tracker]");
    if (tracker) {
      var rows = tracker.querySelectorAll("tr");
      var currentRow = s.week >= 11 ? 11 : s.week;
      for (var r = 1; r < rows.length; r++) {
        var cells = rows[r].querySelectorAll("td");
        if (!cells.length) continue;
        var rowWeek = r - 1; // rows ride in week order, W0 first
        if (rowWeek < s.gates.length && s.gates[rowWeek]) {
          cells[0].textContent = "";
          cells[0].appendChild(el("span", "✓", { "class": "moss" }));
        }
        if (rowWeek === currentRow) {
          for (var c = 1; c < cells.length; c++) {
            if (c < s.session) {
              cells[c].textContent = "";
              cells[c].appendChild(el("span", "✓", { "class": "ember" }));
            } else if (c === s.session) {
              cells[c].textContent = "";
              cells[c].appendChild(el("span", "▶", { "class": "ember" }));
            }
          }
        }
      }
    }

    /* The full [ SAVE FILE ] window body (index only) */
    fill("savefile", function (slot) {
      var pos = el("div", "Week " + s.week + " · Session " + s.session + " next · last played " + s.lastPlayed);
      slot.appendChild(pos);

      var next = el("div", "Next action: ");
      next.appendChild(actionLink());
      slot.appendChild(next);

      slot.appendChild(el("div",
        "Gates: " + s.gates.length + "/12 · Sessions: " + s.sessionsDone +
        "/~59 · Clips: " + s.clips.length));

      if (s.decisionsDue.length) {
        slot.appendChild(el("div", "Decisions due:"));
        var ul = el("ul");
        for (var i = 0; i < s.decisionsDue.length; i++) {
          var d = s.decisionsDue[i];
          var li = el("li");
          li.appendChild(el("a", d.oqId, { href: "register.html#" + d.oqId.toLowerCase() }));
          li.appendChild(document.createTextNode(" (wk " + d.dueWeek + ") — " + d.line));
          ul.appendChild(li);
        }
        slot.appendChild(ul);
      }
    });

    /* This week's pre-chosen valve line (stuck.html, week pages) */
    fill("valve", function (slot) {
      var line = s.valveByWeek[s.week];
      if (line) slot.appendChild(document.createTextNode(line));
    });

    /* The bare next-action line, linked to the tomorrow-note */
    fill("next-action", function (slot) {
      slot.appendChild(actionLink());
    });

    renderVersion();
    renderRail();
    renderPagenav();
  }

  if (typeof document === "undefined") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
