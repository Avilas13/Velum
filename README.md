# VELUM — Maison Numérique

> *Your curated link collections, beautifully organised.*

---

## Project Structure

```
velum/
├── index.html       ← Main HTML (layout & mascot SVG)
├── style.css        ← All styles & themes (edit here to customise)
├── script.js        ← All logic (storage, render, export/import)
├── README.md        ← This file
└── .vscode/
    ├── settings.json      ← Editor formatting preferences
    └── extensions.json    ← Recommended VS Code extensions
```

---

## Opening in VS Code

1. Unzip the folder
2. Open VS Code → **File → Open Folder** → select the `velum` folder
3. Install the recommended extension when prompted: **Live Preview** by Microsoft
4. Right-click `index.html` in the Explorer → **Open with Live Preview**
5. Your browser tab will auto-reload whenever you save a file

Alternatively, just open `index.html` directly in any browser — no server needed.

---

## Customising Themes

All theme colours are CSS variables at the top of `style.css`.
To change a theme, find its block and edit the hex values:

```css
/* Example: make Classique accent green instead of gold */
:root {
  --accent: #4a8c3f;   /* ← change this */
}
```

To add a brand new theme:
1. Copy any `[data-theme=...]` block in `style.css` and rename it
2. Add a card `<div class="t-card" data-t="yourtheme">` in `index.html`
3. Add quote lines in `QUOTES` and mascot lines in `LINES` in `script.js`

---

## Adding Topic Icons

In `script.js`, find the `TOPICS` array and add a new entry:

```js
{ k: ['youtube', 'video', 'vlog'], i: '📹' },
```

The `k` array is keywords — if any appear in a collection name, the icon `i` is shown.

---

## Data Storage

- Your links and theme preference are saved in **browser localStorage**
- Use **Export ↓** to download a `.json` backup you can move between browsers/devices
- Use **Import ↑** to restore from a backup file
- Use **Save to disk** (Chrome/Edge only) to write directly to a file on your computer

---

## Features

| Feature | Description |
|---|---|
| 5 Themes | Classique, Anime, Sakura, Cyber, Noir |
| Sakura Petals | Animated falling petals on Anime/Sakura themes |
| Bunny Mascot | Bobbing bunny with per-theme speech bubbles |
| Topic Icons | Auto emoji based on collection name keywords |
| Visit Counter | Tracks how many times each link was opened |
| Daily Quote | Random motivational quote per theme on every load |
| Font Picker | 5 font options in the customise panel |
| Export / Import | Backup and restore your data as JSON |
| Save to Disk | Chrome/Edge: write directly to a file on your computer |
| Clear Data | Reset everything with one click |
