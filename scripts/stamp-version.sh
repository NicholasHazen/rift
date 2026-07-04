#!/usr/bin/env bash
# stamp-version.sh — write the manual's version stamp into docs/manual/state.js
# from the current git HEAD, so the masthead shows which revision + commit is on
# screen and a stale cache is caught at a glance rather than lying silently.
#
# Run it as the LAST step of a manual change, AFTER committing the content:
#
#   git commit -m "…"            # the content commit
#   scripts/stamp-version.sh     # stamps HEAD's rev/date/hash into state.js
#   git commit -am "Stamp manual version"   # tiny metadata commit
#
# Values:
#   rev  = highest-numbered real changelog row (id="rN"; the empty placeholder
#          row has no id, so it is never picked)
#   date = HEAD's commit date, UTC
#   hash = HEAD's short SHA
#
# The three MANUAL_VERSION keys are unique to that block and it sits first in
# state.js, so a plain first-match replace is safe.
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
state="$repo/docs/manual/state.js"
changelog="$repo/docs/manual/changelog.html"

sha="$(git -C "$repo" rev-parse --short HEAD)"
date="$(TZ=UTC git -C "$repo" log -1 --format=%cd --date=format:'%Y-%m-%d %H:%M UTC' HEAD)"
rev="$(grep -oE 'id="r[0-9]+"' "$changelog" | grep -oE 'r[0-9]+' | sort -V | tail -1)"

perl -0777 -pi -e "s/(rev:\\s*\")[^\"]*(\")/\${1}${rev}\${2}/; s/(date:\\s*\")[^\"]*(\")/\${1}${date}\${2}/; s/(commit:\\s*\")[^\"]*(\")/\${1}${sha}\${2}/" "$state"

echo "stamped docs/manual/state.js -> rev ${rev} · ${date} · ${sha}"
