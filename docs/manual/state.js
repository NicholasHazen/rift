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
   ========================================================================== */

const MANUAL_STATE = {
  week: 0,
  session: 2,
  sessionsDone: 1,
  lastPlayed: "2026-07-02",
  nextAction: "Open the Epic Games Launcher and start the UE 5.7 install; while it downloads, link Epic account ↔ GitHub",
  nextActionHref: "../tomorrow-note.md",
  gates: [],
  clips: [],
  decisionsDue: [
    { oqId: "OQ-02", dueWeek: 0, line: "IDE: Rider vs Xcode/clangd — decide in S2" },
    { oqId: "OQ-03", dueWeek: 1, line: "The build host — this Mac cannot ship week 7's artifacts" },
    { oqId: "OQ-01", dueWeek: 3, line: "Commit to the Bit" }
  ],
  valveByWeek: {
    0: "Valve: switch to the parallel task — read the generated template code top to bottom, or hand the fleet an [AGENT] checklist item."
  }
};

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
  }

  if (typeof document === "undefined") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
