---
name: Favela Walking Tour
description: A field map of Rocinha where every tour is a route drawn across the hill, times read as departures and prices as waypoint stamps.
colors:
  paper: "#EDE4C8"
  paper-2: "#E4D8B6"
  paper-3: "#D9CBA4"
  card-paper: "#FBF6E8"
  ink: "#22180F"
  ink-2: "#4A3A2B"
  ink-3: "#6B5641"
  contour: "#B0714A"
  route: "#E2441C"
  route-deep: "#B02E0F"
  gold: "#E7AE3A"
  gold-soft: "#F2CF7E"
  forest: "#1E4634"
  forest-2: "#2B5E47"
  forest-ink: "#E9EFD9"
  forest-ink-2: "#BFD0B4"
  night: "#121A22"
  night-2: "#1C2631"
  night-ink: "#F1E6CC"
  night-ink-2: "#C9B892"
  sea: "#9FC3C4"
  whatsapp: "#17703D"
  contour-night: "#6E5A3A"
  road-edge: "#8A6E52"
  window-light: "#F0B44C"
  window-hot: "#FFE3A3"
  sea-label: "#3F6E70"
  forest-label: "#3D5E37"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.7vw, 4.6rem)"
    fontWeight: 900
    lineHeight: 0.93
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.6vw, 4.2rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.7rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 108"
  departure:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1, 'lnum' 1"
    fontVariation: "'wdth' 72"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  button:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 92"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 75"
  map-label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.24em"
    fontVariation: "'wdth' 72"
  map-label-major:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.42em"
    fontVariation: "'wdth' 72"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(72px, 10vw, 140px)"
  container: "1320px"
  header: "72px"
components:
  button-primary:
    backgroundColor: "{colors.route-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
    height: "52px"
  button-small:
    backgroundColor: "{colors.route-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.55em 1.05em"
    height: "42px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
    height: "52px"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
    height: "52px"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.5em 0.8em"
  nav-link-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  tag:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.35em 0.75em"
  route-legend:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px 16px 10px"
    width: "min(560px, 100%)"
  route-legend-night:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.night-ink}"
  legend-row-selected:
    textColor: "{colors.route-deep}"
  legend-go:
    backgroundColor: "{colors.route-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "40px"
  route-sheet:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(24px, 3.4vw, 48px)"
  route-sheet-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.lg}"
  waypoint-stamp:
    textColor: "{colors.route-deep}"
    typography: "{typography.departure}"
  waypoint-stamp-night:
    textColor: "{colors.gold}"
  timeline-stop:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.route}"
    size: "14px"
  ruled-list-row:
    textColor: "{colors.ink}"
    padding: "18px 4px"
  ruled-list-row-night:
    textColor: "{colors.night-ink}"
    padding: "18px 6px"
  seal:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 18px 12px 12px"
---

# Design System: Favela Walking Tour

## Overview

**Creative North Star: "The Field Map of the Hill"**

The page is a hand-inked topographic sheet of Rocinha. A sun-bleached paper ground carries brick-earth contour lines generated from a height field, a forest-green flank where the Tijuca and Dois Irmãos rise, and a sea-grey Atlantic at the foot. Tours are not cards; they are routes inked across those contours in a hot signal orange, with departure times set as large condensed numerals and prices stamped beside a waypoint ring. Everything that follows the hero, from the route sheets to the ruled lists, is a page torn from the same field notebook.

The world has two lighting states and only two. Day is paper and ink. Dusk, the 16:30 route, turns the whole map to deep earth-navy with gold window lights scattered across the houses and a string of street lamps along the Estrada da Gávea; the dusk accent is gold, never orange. Density is generous on the map and tight in the data: legends, timelines and departure rows are set close and ruled, like a printed timetable.

One typeface, Archivo variable, does every job by moving along its width axis: expanded black for the voice, condensed tracked caps for anything that labels terrain or data, tabular numerals for every time and price. Photography of the real community sits inside sheets as evidence, never as a full-bleed backdrop.

**Key Characteristics:**
- Paper-and-ink ground with generated contour lines; no photographic hero.
- Routes as stroked paths: solid for walking, dotted for van, long-dashed for motorbike.
- Day and night are the same map in two lights; night is triggered by choosing the dusk route.
- Archivo width axis carries hierarchy: 118% display down to 72% for numerals and map labels.
- Prices sit in a waypoint-stamp ring; times are departures in condensed tabular numerals.
- Ruled lines (1.5px ink rules, 1px tinted dividers) structure data instead of boxes.

## Colors

An earthy map palette: bleached paper and umber ink, brick contours, one hot route orange for the day and one gold for dusk, with forest green and night navy as the two full-bleed section grounds.

### Primary
- **Signal Route Orange** (`route`): the ink of drawn routes on the map, timeline stop rings and connector lines, legend swatches, the oversized quotation mark, focus outline, text selection. A line color: it is never used for running text.
- **Fired Brick** (`route-deep`): the readable form of the route color. Primary button fill, the emphasized word in the hero headline, prices in the legend and on route sheets, selected legend row title, star ratings, the round "go" arrow in each legend row.

### Secondary
- **Dusk Gold** (`gold`): the night accent. In night mode it replaces orange on routes, stop rings, stamped prices, the headline emphasis, stars and the legend "go" button; it fills the gold button and the promo copy button in the night section. Draws the dusk walking route and the dashed motorbike leg by day too.
- **Lamplight Gold** (`gold-soft`): icon tint on forest grounds, footer column headings, the major "Rocinha" map label at night.

### Tertiary
- **Tijuca Forest** (`forest`): full-bleed ground for the "why us" section and the footer; seal badge fill.
- **Canopy** (`forest-2`): raised surfaces on forest (value icons, the social project panel, the "before you go" block, social buttons); check icons for inclusions.
- **Forest Paper** (`forest-ink`) and **Lichen** (`forest-ink-2`): primary and secondary text on forest.
- **Rocinha Night** (`night`): the night map ground, the night route sheet, the quick-links section, mobile theme-color in night mode.
- **Night Slate** (`night-2`): raised surfaces on night (legend cartouche at night, side cards, icon discs, tags on the night sheet).
- **Moon Paper** (`night-ink`) and **Night Sand** (`night-ink-2`): primary and secondary text on night.
- **WhatsApp Green** (`whatsapp`): WhatsApp buttons and the WhatsApp row icon only. It is the one borrowed color, kept because the channel is recognized by it.

### Neutral
- **Bleached Map Paper** (`paper`): page ground, header, mobile dock, sheet menu; text on brick buttons.
- **Folded Paper** (`paper-2`): gallery section ground, tags, nav hover, warning notes, scrollbar track.
- **Shaded Paper** (`paper-3`): image placeholders behind photos.
- **Card Paper** (`card-paper`): the lighter sheet the cartouches are printed on: route legend, route sheets, quote cards, seals, route glyph, map inset frame, map roads, waypoint ring fill.
- **Umber Ink** (`ink`), **Walnut Ink** (`ink-2`), **Faded Ink** (`ink-3`): headline and body text, secondary text and map labels, meta lines and captions. Ink at 12-18% alpha makes every divider.
- **Brick Contour** (`contour`): contour lines on the day map, scrollbar thumb.

### Map states
The map is the only place these appear; they are part of the map grammar, not general UI colors.
- **Day terrain:** paper ground, forest fields blended from #C4CFA0 to #A8BE87 by height, sea in `sea`, roads `card-paper` over a `road-edge` casing, wave marks #6E9EA0, sea label in `sea-label` italic, forest labels in `forest-label`, metro roundel #1F4AA8. Houses are small slope-aligned blocks drawn from a weighted roof palette of terracotta, clay, concrete grey and sand, with rare blue water tanks (#2E6FB0).
- **Night terrain:** `night` ground, forest fields #132624 to #0F201E, sea #0A121E, houses #26303A / #1F2832, contours in `contour-night`, roads #3A3024 on #0B0906, labels in `night-ink-2`. Most houses show a lit window in `window-light`, the hottest in `window-hot`, with a soft gold glow; street lamps (#FFE1A0) are dotted every 26 units along the Estrada da Gávea.

### Named Rules
**The Two Inks Rule.** Day routes are inked in orange, dusk routes in gold. A route's color tells its time of day; never swap them or add a third route hue.

**The Deep Ink Rule.** Signal orange draws lines, rings and marks. Any text that needs the route color uses Fired Brick (or Dusk Gold on night grounds).

**The Same Map, Two Lights Rule.** Night is not a theme toggle; it is the dusk route selected. Every map element has a declared night value, and every paper surface in the hero has a night counterpart.

## Typography

**Display Font:** Archivo variable, wdth 62-125, wght 100-900 (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Archivo variable, same family
**Label/Mono Font:** Archivo condensed (wdth 72-80%) with tabular, lining numerals

**Character:** One grotesque stretched across its whole width range. Wide and black, it shouts like a map title; narrow and tracked, it reads like the lettering printed along a road or ridge.

### Hierarchy
- **Display** (900, clamp(2.5rem, 4.7vw, 4.6rem), 0.93, wdth 118%): the hero headline only. One emphasized phrase in Fired Brick (gold at night). 2.35rem under 520px.
- **Headline** (850, clamp(2.2rem, 4.6vw, 4.2rem), 0.98, wdth 112%): section titles, paired with a lede in a two-column header that stacks under 800px.
- **Title** (850, clamp(1.8rem, 3vw, 2.7rem), 0.98, wdth 108%): route sheet names. Smaller titles step down in size and width (1.3-2.1rem, wdth 100-108%) for panels, values and the "other experiences" heading.
- **Departure** (850, clamp(2.4rem, 4.4vw, 3.6rem), 1, wdth 72%, tabular): departure times and the stamped price on route sheets.
- **Body** (400, 17px, 1.55, wdth 100%): running text, ledes at 1.05-1.22rem with a 30-36em measure. Secondary text in Walnut Ink.
- **Button** (750, 1rem, wdth 92%): every button; 0.92rem on small buttons.
- **Label** (650, 0.78rem, 0.12em, wdth 75%, uppercase): data labels attached to a value ("Saída", "A partir de", "Rota"), the legend heading at 800/80%, footer column heads at 750/80% in Lamplight Gold.
- **Map label** (700, 19px, 0.24em, wdth 72%, uppercase): place names on the map, set on paths or rotated with the terrain, with a paper-colored halo stroke (paint-order: stroke). Major place name at 800, 44px, 0.42em, rotated -14 degrees. Road names at 15px along their road path; notes at 15px, 600, wdth 80%.

### Named Rules
**The Width Axis Rule.** Hierarchy moves on width as much as weight: voice is expanded (108-118%), data is condensed (72-92%). Never pull in a second family to get contrast.

**The Tabular Time Rule.** Every time and price uses tabular lining numerals so departures align like a timetable.

**The Halo Rule.** Map lettering always carries a halo stroke in the current ground color, so labels stay legible over contours and houses in both lights.

## Layout

A 1320px container with a fluid gutter (clamp(16px, 4vw, 56px)) and sections padded clamp(72px, 10vw, 140px) top and bottom. The sticky header is 72px; anchor scrolling offsets by 84px.

The hero is a full-bleed map at min-height 100svh minus the header. On desktop the map covers the whole hero, anchored right (`xMaxYMid slice`), with a paper-to-transparent gradient over the left 52% so the headline sits on clean paper; the legend cartouche sits low-left under the copy. At 960px and below the hero becomes a column: headline and CTAs first, then the map as a 58svh band (44svh, min 300px under 520px) with the inset photo and north arrow removed, then the legend overlapping the map's lower edge by 56px.

Route sheets are two-column grids (5fr photo / 7fr body), alternating sides, collapsing to one column with a 4:3 photo under 860px. Reviews use a 1.25fr / 1fr split with a tall lead quote; the gallery is a 4-column dense grid that drops to 2. A fixed bottom dock with Reservar and WhatsApp appears on screens up to 960px once the hero has scrolled away.

Rhythm runs on 8px, 12px, 16px, 24px and 48px steps: 8px between chips, 10-12px between buttons, 16-22px inside sheet stacks, 24-28px card padding, 48px at the top of the sheet padding clamp.

## Elevation & Depth

Depth is printed, not lifted. Most structure comes from ground changes (paper, forest, night) and from rules. Shadows are reserved for objects that sit on top of the map or page like a separate sheet of paper: the legend cartouche, route sheets, quote cards, seals and the route glyph share one soft ambient shadow. Buttons carry a colored glow below them that deepens on hover as the button rises 2px. At night the cartouche loses its paper shadow and gets a hairline light ring plus a deep black drop.

### Shadow Vocabulary
- **Paper sheet** (`box-shadow: 0 1px 2px rgba(34,24,15,.08), 0 10px 30px -12px rgba(34,24,15,.28)`): legend, route sheets, quotes, seals, route glyph.
- **Brick glow** (`box-shadow: 0 1px 0 rgba(255,255,255,.18) inset, 0 8px 20px -10px rgba(191,51,18,.7)`): primary buttons; hover deepens to `0 14px 26px -12px rgba(191,51,18,.8)`.
- **Night cartouche** (`box-shadow: 0 0 0 1px rgba(241,230,204,.1), 0 20px 40px -20px #000`): legend at night.
- **Night sheet** (`box-shadow: 0 20px 50px -24px rgba(18,26,34,.9)`): the dusk route sheet.
- **Header rule** (`box-shadow: 0 1px 0 rgba(34,24,15,.14), 0 12px 24px -20px rgba(34,24,15,.5)`): the sticky header once scrolled, and (inverted) the mobile dock.

### Named Rules
**The Cartouche Rule.** Only things printed on a separate sheet (cartouche, route sheet, quote, seal) get the paper shadow. Lists, panels on colored grounds and section bands stay flat.

## Shapes

Soft-cornered sheets on a ruled page. Sheets round at 20px (route sheets, project panel), cartouches and cards at 14px, small inner surfaces at 8-12px (legend row hover, warnings, gallery tiles, glyph). Every action is a full pill (999px): buttons, tags, nav links, seals, the copy button, and round 40-56px discs for icons and the legend "go" arrow.

Lines carry the rest of the form language. A 1.5px ink rule frames departure rows and tops ruled lists; 1px dividers at 12-22% of the ground's ink color separate rows. Map routes use round caps and joins over a 12px paper-colored underlay so they read as ink laid on the terrain. Waypoints are rings: 9px-radius circles on the map, 14px dots with a 3px border on timelines, and a triple-ring stamp before every price.

## Components

### Buttons
Confident, warm, tactile pills that rise on hover.
- **Shape:** full pill (999px), 52px minimum height, icon gap 0.6em.
- **Primary:** Fired Brick fill with paper text, Archivo 750 at wdth 92%, brick glow. Labelled "Reservar agora" with an arrow that slides 3px right on hover.
- **Hover / Focus:** translateY(-2px) with a deeper glow over 0.35s on the shared ease; back to rest on press. Focus is a 3px Signal Route Orange outline offset 3px.
- **WhatsApp:** WhatsApp Green fill, glyph left of the label.
- **Ghost:** transparent with a 1.5px inset ring in currentColor; hover tints with 6% ink. Used for "Dúvidas" beside a primary on sheets; flips to Moon Paper on night.
- **Gold:** Dusk Gold fill with night text; the primary action on night grounds.
- **Small:** 42px height, 0.92rem, for the header CTA.
- **Text link button:** underlined Walnut Ink with a map icon ("Ver no mapa"); scrolls to the hero and selects that route.

### Tags
- **Style:** pill, Folded Paper ground, Walnut Ink text at 0.82rem, 650, wdth 85%, leading icon. Night Slate on the dusk sheet.
- **Language chips:** 8px radius, 1.5px inset ring in Faded Ink, 800 condensed caps codes.

### Route Legend (signature)
The map cartouche. A Card Paper panel (14px radius, paper shadow, max 560px) headed "ROTAS" in condensed tracked caps over a 1.5px currentColor rule. Each row is a two-part grid: a select button (44px line swatch drawn in the route's own stroke style, condensed title at 780, meta line in Faded Ink with tabular times) and a booking link (stamped price with "a partir de" label, plus a 40px Fired Brick disc with an arrow). Selecting a row sets `aria-pressed`, turns its title Fired Brick, dims the other routes on the map to 16% opacity, fades the inset photo, shows that route's timed stops and redraws its path. Selecting the dusk row turns the map, header and cartouche to night: Night Slate panel, gold title, gold stamps and gold disc. A fine-print footer reads "Mapa ilustrativo, fora de escala" and "Valor final confirmado na reserva". Selecting the same row again clears the selection.

### Route Sheets (signature)
Each tour is a sheet: photo panel and body, 20px radius, Card Paper, paper shadow. The photo corner carries a small route glyph, the same path drawn on a mini map tile. The body stacks tags, title and summary, then:
- **Departures row:** times as Departure numerals with a "Saída" label above, framed top and bottom by 1.5px ink rules, with the price pushed right.
- **Waypoint-stamp price:** the price in Fired Brick preceded by a triple-ring stamp (a card-paper dot ringed by currentColor, paper, currentColor), with "por pessoa" beneath.
- **Timeline:** an ordered list on a 110px / 26px / 1fr grid (52px / 20px on mobile). Times condensed at 800 with the afternoon departure beneath in Faded Ink; each stop is a 14px ring in Signal Route Orange joined by a 3px vertical line; van legs use a dotted connector.
- **Inclusions** with forest check icons, an optional warning note on Folded Paper with a brick alert icon, then actions (primary, ghost, "Ver no mapa").
- **Night sheet:** the dusk tour flips the whole sheet to Rocinha Night with Moon Paper text, gold rings, gold connectors, gold stamp and a darkening gradient on the photo's lower half. Photo hover scales the image to 1.035 over 1.2s.

### Ruled Lists
Rows instead of cards. The "other experiences" list opens with a 1.5px ink rule; each row is a grid of name (760, wdth 95%), meta (Faded Ink, wdth 88%), price (850, wdth 80%) and a brick arrow, divided by 1px ink rules at 18%. The night quick-links list uses the same grammar on Rocinha Night with a 48px Night Slate icon disc (WhatsApp Green for the WhatsApp row) and Moon Paper dividers at 20%. On hover a row tints 4-5% and its padding opens to 14px, while the arrow slides right and turns gold on night.

### Navigation
- **Header:** sticky 72px Bleached Map Paper bar with the logo, condensed 600 nav links in Walnut Ink on pill hit areas (Folded Paper on hover) and a small primary CTA. Turns Rocinha Night when the map is at night.
- **Mobile:** under 960px the links collapse to a 46px round menu button; the menu is a full-height paper sheet of 2rem expanded (wdth 112%) links divided by ink rules, with Reservar and WhatsApp below. A fixed dock repeats both actions.

### Seals and Quotes
Seals are pill chips on Card Paper with a 44px Tijuca Forest badge in Lamplight Gold. Quote cards are Card Paper at 14px radius with an oversized Signal Route Orange opening quote at 900 and stars in Fired Brick.

### Map Grammar (signature)
The hero map is a 1600 x 1000 drawing in three layers: two painted canvases (day and night terrain) and an SVG of contours, roads, labels, routes and stops.
- **Contours:** generated by marching squares over the height field; 1px Brick Contour at 55% opacity, every fifth line an index contour at 1.7px and 75%, non-scaling strokes.
- **Roads:** Card Paper 9px over a 12px Road Edge casing at 55%; road names follow their paths.
- **Routes:** walk 6px solid, van 4px dotted (2 / 11), dusk walk 6px gold solid, motorbike 4px gold dashed (14 / 10), all over a 12px ground-colored underlay.
- **Landmarks:** small filled peak triangles for Dois Irmãos, a stroked arch for the Passarela, a blue metro roundel, a north arrow, and on desktop an inset photo of the viewpoint on a Card Paper frame tied to its point by a dashed leader.
- **Stops:** paper-filled rings with ink stroke, times in Fired Brick at 850 (gold rings and times at night), shown only for the selected route.
- **Night mode:** the night canvas fades in over the day canvas; contours, roads, waves, labels, halos, ring fills and the hero gradient all switch to their night values together. The browser theme color switches with it.

### Motion Grammar
- **Shared ease:** `cubic-bezier(.16,1,.3,1)` for hovers, reveals, sheet menu and dock.
- **Route draw:** each path is revealed by a mask stroke animating `stroke-dashoffset` with `cubic-bezier(.45,0,.2,1)`, lasting max(0.9s, length / 700) seconds, legs staggered by 0.55s. On first view the day route starts at 0.3s and the dusk route at 1.6s; selecting a route redraws it.
- **Dim and reveal:** unselected routes fade to 16% and stops fade in over 0.45-0.5s.
- **Day to night:** grounds and inks cross-fade over 0.9s, the night canvas over 1.1s.
- **Hover:** buttons rise 2px over 0.35s; arrows slide 3-4px; photos scale slowly (1.035-1.05 over 1-1.2s).
- **Scroll reveal:** blocks rise 22px and fade in over 0.9s.
- **Reduced motion:** all transitions collapse to near-zero, routes appear fully drawn, reveals show immediately and smooth scrolling is off.

## Do's and Don'ts

### Do:
- **Do** draw tours as routes on the contour map and list them in the legend cartouche with time, stamped price and a direct booking link.
- **Do** ink day routes in Signal Route Orange and the dusk route in Dusk Gold, using solid for walking, dotted for van and long dashes for motorbike.
- **Do** set every time and price in Archivo with tabular lining numerals, condensed (wdth 72-90%).
- **Do** give every new map element and every hero surface both a day and a night value, switched together over 0.9s.
- **Do** put prices behind the triple-ring waypoint stamp and frame departures between 1.5px ink rules.
- **Do** use Fired Brick, not Signal Route Orange, for any orange text.
- **Do** halo map labels with a stroke in the current ground color.
- **Do** keep every action a pill of at least 52px (42px for the header CTA) with the 2px hover rise.
- **Do** honor `prefers-reduced-motion` by showing routes fully drawn with no transitions.

### Don't:
- **Don't** put a drone photo behind a centred headline with three identical tour cards underneath; the map is the hero.
- **Don't** introduce a second typeface; get contrast from Archivo's width and weight axes.
- **Don't** use gold for day routes or orange for the dusk route.
- **Don't** add the paper shadow to lists or panels on forest and night grounds; they stay flat and ruled.
- **Don't** invent stops, meeting points, prices or timings on the map; every stop and time comes from the confirmed tour data.
