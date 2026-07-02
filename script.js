/* ============================================================
   VAULTÉ — script.js
   ============================================================
   Sections:
   1. Sakura Petals
  2. Bunny Speech
   3. Motivational Quotes
   4. Theme & Font Preferences
   5. Topic Icons
   6. State (localStorage persistence)
   7. Render
   8. User Actions (add, delete, rename, reset)
   9. Export / Import / Save to Disk
   10. Boot
   ============================================================ */


/* ============================================================
   1. SAKURA PETALS
   Creates floating petal elements; CSS handles visibility
   per theme (anime / sakura themes show them).
   ============================================================ */
(function createPetals() {
  const container = document.getElementById('petals');
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.animationDuration = (18 + Math.random() * 20) + 's'; // 18–38 s (slow drift)
    p.style.animationDelay    = (-Math.random() * 22) + 's';
    p.style.width             = (9  + Math.random() * 8) + 'px';
    p.style.height            = (11 + Math.random() * 9) + 'px';
    p.style.opacity           = 0.5 + Math.random() * 0.4;
    container.appendChild(p);
  }
}());


const bunny = document.getElementById("bunny");
const speech = document.getElementById("speech");
const toggleBtn = document.getElementById("toggleBunny");
const petMessages = [
  "Pet me more!",
  "Hop hop!",
  "I like that!",
  "You're my friend!",
  "That tickles!"
];
const randomMessages = [
  "I'm exploring...",
  "Nice app!",
  "Can we play?",
  "I found a cozy spot.",
  "Hop hop!"
];
let hidden = localStorage.getItem("bunnyHidden") === "true";

function updateVisibility() {
  bunny.style.display = hidden ? "none" : "block";
  toggleBtn.textContent = hidden
    ? "Show Bunny"
    : "Hide Bunny";
}

function speak(text) {
  speech.textContent = text;
  const rect = bunny.getBoundingClientRect();
  speech.style.left = rect.left + "px";
  speech.style.top = (rect.top - 60) + "px";
  speech.style.display = "block";
  clearTimeout(window.speechTimeout);
  window.speechTimeout = setTimeout(() => {
    speech.style.display = "none";
  }, 3000);
}

function hopToRandomSpot() {
  if (hidden) return;
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 100;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  bunny.style.transform = "translateY(-40px)";
  setTimeout(() => {
    bunny.style.left = `${x}px`;
    bunny.style.top = `${y}px`;
    bunny.style.transform = "translateY(0)";
  }, 300);
}

function randomBehavior() {
  if (hidden) return;
  const msg =
    randomMessages[
      Math.floor(Math.random() * randomMessages.length)
    ];
  speak(msg);
  hopToRandomSpot();
}

bunny.addEventListener("click", () => {
  const msg =
    petMessages[
      Math.floor(Math.random() * petMessages.length)
    ];
  bunny.style.transform = "scale(1.25)";
  setTimeout(() => {
    bunny.style.transform = "scale(1)";
  }, 300);
  speak(msg);
});

toggleBtn.addEventListener("click", () => {
  hidden = !hidden;
  localStorage.setItem(
    "bunnyHidden",
    hidden
  );
  updateVisibility();
  if (!hidden) {
    speak("I'm back!");
  }
});

function playHideAndSeek() {
  if (hidden) return;
  speak("Find me!");
  bunny.style.opacity = "0";
  setTimeout(() => {
    hopToRandomSpot();
    bunny.style.opacity = "1";
    speak("You found me!");
  }, 5000);
}

updateVisibility();
setInterval(randomBehavior, 15000);
setInterval(() => {
  if (Math.random() < 0.3) {
    playHideAndSeek();
  }
}, 45000);
speak("Hello! I'm BunBun!");


/* ============================================================
   3. MOTIVATIONAL QUOTES
   Different quote pools per theme, shown in the banner.
   ============================================================ */
const QUOTES = {
  classique: [
    'Elegance is the only beauty that never fades.',
    'Luxury is the absence of clutter.',
    'Quality is remembered long after price is forgotten.',
    'Style is a way of saying who you are without speaking.',
    'Small collections, kept well, become a life well organised.',
  ],
  anime: [
    '信じる道を歩め — Walk the path you believe in.',
    '諦めないで — Never give up, even when no one believes in you.',
    'The will of the heart exceeds the limits of the body.',
    '強さとは、折れても立ち上がること — Strength is rising after being broken.',
    'Your power is not gone — it is sleeping, waiting to be awakened.',
  ],
  sakura: [
    '桜のように — Like the sakura, bloom briefly but brilliantly.',
    'The most beautiful moments are fleeting — cherish them.',
    '春が来た — Spring has come, and with it, new beginnings.',
    'Petals fall so new ones can grow.',
  ],
  cyber: [
    'SYSTEM ONLINE // THE FUTURE IS HANDCRAFTED.',
    'IN A WORLD OF NOISE, CURATE YOUR SIGNAL.',
    'UPLOAD YOUR AMBITION. DOWNLOAD YOUR DREAMS.',
    'THE NET IS VAST — BUILD YOUR OWN CORNER.',
  ],
  noir: [
    'In darkness, even a single link shines like a star.',
    'The archive never sleeps. Neither does ambition.',
    'Collect the shadows. Let the light find you.',
    'What you return to is what you truly value.',
  ],
  forest: [
    'In nature, we find clarity. In curation, we find peace.',
    'Every root grows deep. Every collection grows meaningful.',
    'The forest breathes in silence. Organize in serenity.',
    'Grow your collection like ancient trees grow rings.',
  ],
  ocean: [
    'The ocean organizes itself in endless depths. So do you.',
    'Dive deep into your collections. Surface with clarity.',
    'Like waves, let your links flow and align.',
    'In the vastness of the sea, find your beacon.',
  ],
  sunset: [
    'Every sunset is the beginning of a new collection.',
    'Warm colours, curated thoughts, golden moments.',
    'The day fades beautifully. Your links glow on.',
    'Even endings are beautiful when well-organized.',
  ],
  midnight: [
    'The cosmos expands infinitely. So does your imagination.',
    'Between the stars, find your purpose.',
    'In the silence of midnight, clarity speaks.',
    'The universe is vast. Your collection is your constellation.',
  ],
};

function showQuote() {
  const theme = document.body.getAttribute('data-theme') || 'classique';
  const pool  = QUOTES[theme] || QUOTES.classique;
  document.getElementById('quoteText').textContent =
    pool[Math.floor(Math.random() * pool.length)];
}


/* ============================================================
   4. THEME & FONT PREFERENCES
   Stored in localStorage under PREF_KEY.
   ============================================================ */
const PREF_KEY = 'vaulte_prefs_v1';
const DATA_KEY = 'vaulte_data_v1';

function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; }
  catch (e) { return {}; }
}
function savePrefs(p) { localStorage.setItem(PREF_KEY, JSON.stringify(p)); }

function applyTheme(t) {
  document.body.setAttribute('data-theme', t);
  document.querySelectorAll('.t-card').forEach(card => {
    card.classList.toggle('active', card.dataset.t === t);
  });
  showQuote();
  document.dispatchEvent(new Event('themechange')); // notify bunny etc.
  const p = loadPrefs(); p.theme = t; savePrefs(p);
}

function applyFont(f) {
  if (f) document.body.style.setProperty('--font-d', f);
  else   document.body.style.removeProperty('--font-d');
  document.querySelectorAll('.font-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.font === f);
  });
  const p = loadPrefs(); p.font = f; savePrefs(p);
}

// Wire up theme cards
document.querySelectorAll('.t-card').forEach(card => {
  card.addEventListener('click', () => applyTheme(card.dataset.t));
});

// Wire up font pills
document.querySelectorAll('.font-pill').forEach(btn => {
  btn.addEventListener('click', () => applyFont(btn.dataset.font));
});

// Customise panel open/close
const custPanel = document.getElementById('custPanel');
const overlay   = document.getElementById('overlay');

document.getElementById('custBtn').addEventListener('click', () => {
  custPanel.classList.add('open');
  overlay.classList.add('show');
});
document.getElementById('custClose').addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

function closePanel() {
  custPanel.classList.remove('open');
  overlay.classList.remove('show');
}


/* ============================================================
   5. TOPIC ICONS
   Automatically assigns an emoji icon to a group based on
   keywords in its name. Add more entries to extend.
   ============================================================ */
const TOPICS = [
  { k: ['anime', 'manga', 'otaku', 'weeb'],          i: '⛩️'  },
  { k: ['game', 'gaming', 'games', 'esport'],         i: '🎮'  },
  { k: ['music', 'song', 'playlist', 'band'],         i: '🎵'  },
  { k: ['work', 'business', 'office', 'client'],      i: '💼'  },
  { k: ['study', 'school', 'course', 'class', 'uni'], i: '📚'  },
  { k: ['shop', 'shopping', 'store', 'fashion'],      i: '🛍️' },
  { k: ['movie', 'film', 'cinema', 'netflix'],        i: '🎬'  },
  { k: ['travel', 'trip', 'flight', 'vacation'],      i: '✈️'  },
  { k: ['food', 'recipe', 'cook', 'restaurant'],      i: '🍜'  },
  { k: ['art', 'design', 'draw', 'paint'],            i: '🎨'  },
  { k: ['code', 'dev', 'programming', 'github'],      i: '⌨️'  },
  { k: ['news', 'article', 'read', 'blog'],           i: '📰'  },
  { k: ['sport', 'fitness', 'gym', 'workout'],        i: '🏆'  },
  { k: ['social', 'twitter', 'instagram', 'tiktok'],  i: '📱'  },
  { k: ['sakura', 'cherry', '花', '春'],              i: '🌸'  },
  { k: ['cyber', 'hack', 'matrix', 'dark'],           i: '🌐'  },
];

function iconFor(name) {
  const lower = name.toLowerCase();
  for (const topic of TOPICS) {
    if (topic.k.some(kw => lower.includes(kw))) return topic.i;
  }
  return '◆';
}


/* ============================================================
   6. STATE & PERSISTENCE
   All data lives in localStorage[DATA_KEY] as JSON.
   Shape: { groups: [{ id, name, open, links: [{ id, name, url, visits }] }] }
   ============================================================ */
let state = { groups: [] };

function uid() { return Math.random().toString(36).slice(2, 10); }

function loadState() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    state = raw
      ? JSON.parse(raw)
      : { groups: [{ id: uid(), name: 'General', open: true, links: [] }] };
  } catch (e) {
    state = { groups: [{ id: uid(), name: 'General', open: true, links: [] }] };
  }
  render();
}

function save() {
  localStorage.setItem(DATA_KEY, JSON.stringify(state));
}


/* ============================================================
   7. HELPERS
   ============================================================ */
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function faviconFor(url) {
  try {
    return `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
  } catch (e) { return ''; }
}

function normaliseUrl(u) {
  u = u.trim();
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u;
}

// Toast notification
let toastTimer;
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// Confirm modal
let confirmCallback = null;
function confirm2(title, body, onConfirm) {
  document.getElementById('mTitle').textContent = title;
  document.getElementById('mBody').textContent  = body;
  confirmCallback = onConfirm;
  document.getElementById('modal').classList.add('show');
}
document.getElementById('mCancel').onclick = () => {
  document.getElementById('modal').classList.remove('show');
  confirmCallback = null;
};
document.getElementById('mOk').onclick = () => {
  if (confirmCallback) confirmCallback();
  document.getElementById('modal').classList.remove('show');
  confirmCallback = null;
};


/* ============================================================
   8. RENDER
   ============================================================ */
function fillGroupSelect() {
  const sel  = document.getElementById('groupSel');
  const prev = sel.value;
  sel.innerHTML = '';
  state.groups.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.id; opt.textContent = g.name;
    sel.appendChild(opt);
  });
  if (prev && state.groups.some(g => g.id === prev)) sel.value = prev;
}

function render() {
  fillGroupSelect();
  const container = document.getElementById('groups');
  container.innerHTML = '';

  if (!state.groups.length) {
    container.innerHTML =
      `<div class="empty">
         <div class="big">No collections yet</div>
         <div class="sm">Click "+ New Collection" to begin.</div>
       </div>`;
    return;
  }

  state.groups.forEach(group => {
    // Group wrapper
    const wrap = document.createElement('div');
    wrap.className = 'group';

    // Group header
    const head = document.createElement('div');
    head.className = 'group-head';
    head.innerHTML = `
      <div class="group-title">
        <span class="topic-icon">${iconFor(group.name)}</span>
        <h2>${esc(group.name)}</h2>
        <span class="count">${group.links.length} item${group.links.length === 1 ? '' : 's'}</span>
      </div>
      <div class="group-tools">
        <button class="icon-btn"     data-a="rename" title="Rename">✎</button>
        <button class="icon-btn del" data-a="del"    title="Delete">✕</button>
        <span class="chev ${group.open ? 'open' : ''}">›</span>
      </div>`;

    // Toggle open/closed
    head.addEventListener('click', e => {
      if (e.target.closest('[data-a]')) return;
      group.open = !group.open; save(); render();
    });

    // Rename
    head.querySelector('[data-a=rename]').addEventListener('click', e => {
      e.stopPropagation();
      const newName = prompt('Rename collection', group.name);
      if (newName && newName.trim()) { group.name = newName.trim(); save(); render(); }
    });

    // Delete group
    head.querySelector('[data-a=del]').addEventListener('click', e => {
      e.stopPropagation();
      confirm2(
        'Delete this collection?',
        `"${group.name}" and all its links will be removed.`,
        () => { state.groups = state.groups.filter(x => x.id !== group.id); save(); render(); }
      );
    });

    wrap.appendChild(head);

    // Links list (only when open)
    if (group.open) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'links';

      if (!group.links.length) {
        linksDiv.innerHTML =
          `<div class="empty"><div class="sm">No links yet — add one above.</div></div>`;
      } else {
        group.links.forEach(link => {
          const row = document.createElement('div');
          row.className = 'link-row';
          row.innerHTML = `
            <div class="link-main">
              <div class="fav">
                <img src="${faviconFor(link.url)}" onerror="this.style.display='none'">
              </div>
              <div class="link-text">
                <div class="link-name">${esc(link.name)}</div>
                <div class="link-url">${esc(link.url)}</div>
              </div>
            </div>
            <div class="link-right">
              <span class="vbadge">${link.visits || 0} visit${link.visits === 1 ? '' : 's'}</span>
              <button class="link-del" title="Remove">✕</button>
            </div>`;

          // Open link + increment visit count
          row.querySelector('.link-main').addEventListener('click', () => {
            link.visits = (link.visits || 0) + 1;
            save(); render();
            window.open(link.url, '_blank', 'noopener');
          });

          // Remove link
          row.querySelector('.link-del').addEventListener('click', e => {
            e.stopPropagation();
            group.links = group.links.filter(l => l.id !== link.id);
            save(); render();
          });

          linksDiv.appendChild(row);
        });
      }
      wrap.appendChild(linksDiv);
    }

    container.appendChild(wrap);
  });
}


/* ============================================================
   9. USER ACTIONS
   ============================================================ */

// New collection
document.getElementById('newGroupBtn').addEventListener('click', () => {
  const name = prompt('Collection name (e.g. Anime, Work, Sakura)', 'New Collection');
  if (name && name.trim()) {
    state.groups.push({ id: uid(), name: name.trim(), open: true, links: [] });
    save(); render(); toast('Collection created');
  }
});

// Add link
function addLink() {
  const gid     = document.getElementById('groupSel').value;
  const nameIn  = document.getElementById('nameIn');
  const urlIn   = document.getElementById('urlIn');
  let   name    = nameIn.value.trim();
  let   url     = urlIn.value.trim();

  if (!url) { toast('Enter a URL first'); return; }
  url = normaliseUrl(url);
  if (!name) {
    try { name = new URL(url).hostname.replace('www.', ''); }
    catch (e) { name = url; }
  }

  const group = state.groups.find(g => g.id === gid);
  if (!group) { toast('Select a collection'); return; }

  group.links.push({ id: uid(), name, url, visits: 0 });
  group.open = true; save(); render();
  nameIn.value = ''; urlIn.value = ''; nameIn.focus();
  toast('Link added');
}

document.getElementById('addBtn').addEventListener('click', addLink);
['nameIn', 'urlIn'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') addLink();
  });
});

// Clear all data
document.getElementById('resetBtn').addEventListener('click', () => {
  confirm2(
    'Clear all data?',
    'Every collection and link will be permanently deleted.',
    () => {
      state = { groups: [{ id: uid(), name: 'General', open: true, links: [] }] };
      save(); render(); toast('All data cleared');
    }
  );
});


/* ============================================================
   10. EXPORT / IMPORT / SAVE TO DISK
   ============================================================ */

// Helper — create a JSON blob of current state
function stateBlob() {
  return new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
}

// Export — download a dated backup JSON
document.getElementById('exportBtn').addEventListener('click', () => {
  const a = document.createElement('a');
  a.href     = URL.createObjectURL(stateBlob());
  a.download = `vaulte-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  toast('Exported ✓');
});

// Import — pick a previously exported JSON file
document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('importFile').click();
});
document.getElementById('importFile').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const parsed = JSON.parse(ev.target.result);
      if (!parsed || !Array.isArray(parsed.groups)) throw new Error('bad format');
      confirm2(
        'Import this file?',
        'This will replace all current collections and links.',
        () => { state = parsed; save(); render(); toast('Imported ✓'); }
      );
    } catch {
      toast('Invalid file — could not import');
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // reset input so same file can be re-selected
});

// Save to disk — File System Access API (Chrome/Edge only)
// Keeps a handle so subsequent saves skip the picker dialog.
let diskHandle = null;
document.getElementById('diskBtn').addEventListener('click', async () => {
  if (!window.showSaveFilePicker) {
    toast('Not supported in this browser — use Export instead');
    return;
  }
  try {
    if (!diskHandle) {
      diskHandle = await window.showSaveFilePicker({
        suggestedName: 'vaulte-data.json',
        types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
      });
    }
    const writable = await diskHandle.createWritable();
    await writable.write(stateBlob());
    await writable.close();
    toast('Saved to disk ✓');
  } catch (err) {
    if (err.name !== 'AbortError') {
      diskHandle = null; // reset so picker shows again next time
      toast('Could not save to disk');
    }
  }
});


/* ============================================================
   BOOT — run on page load
   ============================================================ */
(function boot() {
  const prefs = loadPrefs();
  applyTheme(prefs.theme || 'classique');
  if (prefs.font) applyFont(prefs.font);
  showQuote();
  loadState();
}());
