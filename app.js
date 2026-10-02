/**
 * StudyPin - Google IT Automation Concept Wall
 * Interactive Corkboard, Yarn Links & Active Recall Memorization Tool
 */

(function () {
  'use strict';

  // --- Initial Curated Course Starter Pack ---
  const GOOGLE_IT_AUTOMATION_STARTER_NOTES = [
    {
      id: "note_with_open",
      title: "Python 'with open()' & File Closure",
      module: "c2",
      badge: "Concept",
      color: "yellow",
      pinColor: "red",
      x: 2150,
      y: 2100,
      rotation: -1.5,
      isLocked: false,
      content: `### Why use \`with open()\`?
Context manager guarantees file closes **immediately** when the block exits—even if an exception occurs!

\`\`\`python
with open("believe.txt", "r") as file:
    for line in file:
        print(line.strip().upper())
\`\`\`

**Read Methods:**
- \`.read()\` : Entire file as a single string.
- \`.readline()\` : Reads one single line at a time.
- \`.readlines()\` : Returns ||a list of all lines||.

💡 **Key Takeaway:** Iterating with \`for line in file\` is memory-efficient for huge log files!`
    },
    {
      id: "note_file_modes",
      title: "File Modes & Pitfalls (w, r, a, r+)",
      module: "c2",
      badge: "Gotcha",
      color: "pink",
      pinColor: "yellow",
      x: 2480,
      y: 2080,
      rotation: 2.0,
      isLocked: false,
      content: `### Mode Cheat Sheet:
- \`"r"\` : Read only (default). Fails if missing.
- \`"w"\` : Write only. ||OVERWRITES & TRUNCATES|| existing file to 0 bytes!
- \`"a"\` : Append to end of file without erasing.
- \`"r+"\`: Read and write simultaneously.

⚠️ **Deadly Trap:**
Opening a file in \`"w"\` mode immediately erases its contents before you even call \`.write()\`!`
    },
    {
      id: "note_os_path",
      title: "OS & os.path Cross-Platform Rules",
      module: "c2",
      badge: "Syntax",
      color: "blue",
      pinColor: "green",
      x: 2150,
      y: 2440,
      rotation: 1.2,
      isLocked: false,
      content: `\`\`\`python
import os

# Check existence & size
os.path.exists("script.py")   # True/False
os.path.getsize("data.csv")   # Size in bytes
os.path.abspath("relative")   # Full absolute path

# Cross-platform joining (Windows \\ vs Linux /)
full_path = os.path.join("logs", "2026", "audit.log")
\`\`\`

**Recall Quiz:**
How do you safely split directory name and filename?
Answer: ||os.path.split(path) returns (dir, file)||`
    },
    {
      id: "note_regex_basics",
      title: "Regex Patterns in Automation (re module)",
      module: "c2",
      badge: "CheatSheet",
      color: "green",
      pinColor: "blue",
      x: 2500,
      y: 2460,
      rotation: -2.0,
      isLocked: false,
      content: `\`\`\`python
import re

log_line = "Jul 26 14:02:11 host service[12345]: ERROR"
pattern = r"service\\[(\\d+)\\]: (ERROR|WARN)"
match = re.search(pattern, log_line)

if match:
    pid = match.group(1)      # "12345"
    level = match.group(2)    # "ERROR"
\`\`\`

- \`^pattern\` : Anchors to ||beginning of line||
- \`pattern$\` : Anchors to ||end of line||
- \`.*?\` : Non-greedy matching (stops at first match)`
    },
    {
      id: "note_csv_handling",
      title: "CSV: DictReader vs Regular Reader",
      module: "c2",
      badge: "Concept",
      color: "purple",
      pinColor: "silver",
      x: 1820,
      y: 2280,
      rotation: 1.8,
      isLocked: false,
      content: `### Always prefer DictReader when headers exist!

\`\`\`python
import csv

with open("users.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Access via column header name!
        print(row["username"], row["department"])
\`\`\`

💡 If the CSV column positions reorder, \`DictReader\` won't break your script!`
    },
    {
      id: "note_subprocess",
      title: "Managing External Processes (subprocess.run)",
      module: "c2",
      badge: "Command",
      color: "dark",
      pinColor: "red",
      x: 2840,
      y: 2260,
      rotation: -1.0,
      isLocked: false,
      content: `\`\`\`python
import subprocess

# Run bash command safely with arguments list:
res = subprocess.run(["ping", "-c", "1", "8.8.8.8"], 
                     capture_output=True, 
                     text=True)

if res.returncode == 0:
    print("Host alive! Output:", res.stdout)
else:
    print("Failed! Error:", res.stderr)
\`\`\`

⚠️ **Never use \`shell=True\`** with untrusted user input to avoid command injection!`
    },
    {
      id: "note_troubleshooting_loop",
      title: "Google's 4-Step Troubleshooting Method",
      module: "c4",
      badge: "Concept",
      color: "yellow",
      pinColor: "red",
      x: 2480,
      y: 2820,
      rotation: 0.8,
      isLocked: false,
      content: `### Systematic Debugging Cycle:
1. **Gather Information & Reproduce:**
   Check logs, reproduce consistently, isolate environmental variables.
2. **Find the Root Cause:**
   Use ||Binary Search / Git Bisect|| to split possibilities in half.
3. **Remediate:**
   Deploy the smallest safe fix that solves the root problem.
4. **Document & Prevent:**
   Write post-mortem, automate regression test, add monitoring.`
    }
  ];

  const STARTER_LINKS = [
    { id: "link_1", from: "note_with_open", to: "note_file_modes" },
    { id: "link_2", from: "note_with_open", to: "note_csv_handling" },
    { id: "link_3", from: "note_with_open", to: "note_os_path" },
    { id: "link_4", from: "note_os_path", to: "note_regex_basics" },
    { id: "link_5", from: "note_regex_basics", to: "note_subprocess" },
    { id: "link_6", from: "note_os_path", to: "note_troubleshooting_loop" }
  ];

  // --- App State ---
  const STORAGE_KEY = "studypin_board_data_v1";

  let state = {
    notes: [],
    links: [],
    view: { x: 0, y: 0, scale: 1 },
    theme: "corkboard",
    filterModule: "all",
    searchQuery: "",
    isRecallMode: false,
    stringLinkMode: { active: false, sourceId: null },
    editingNoteId: null
  };

  // --- Sound FX via Web Audio API (tactile feedback, zero external files) ---
  let audioCtx = null;
  function playTactileSound(type) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const now = audioCtx.currentTime;

      if (type === 'pin') {
        // Subtle crisp pin thud
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'link') {
        // String strum tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio autoplay blocked or unsupported
    }
  }

  // --- DOM Elements ---
  const boardViewport = document.getElementById("board-viewport");
  const boardCanvas = document.getElementById("board-canvas");
  const notesContainer = document.getElementById("notes-container");
  const svgStrings = document.getElementById("svg-strings");

  const btnNewNote = document.getElementById("btn-new-note");
  const btnToggleStringMode = document.getElementById("btn-toggle-string-mode");
  const btnRecallMode = document.getElementById("btn-recall-mode");
  const inputSearch = document.getElementById("input-search");
  const btnClearSearch = document.getElementById("btn-clear-search");
  const selectModuleFilter = document.getElementById("select-module-filter");

  const btnZoomIn = document.getElementById("btn-zoom-in");
  const btnZoomOut = document.getElementById("btn-zoom-out");
  const btnZoomReset = document.getElementById("btn-zoom-reset");
  const btnTidyBoard = document.getElementById("btn-tidy-board");
  const btnMenuSettings = document.getElementById("btn-menu-settings");

  const bannerNotification = document.getElementById("banner-notification");
  const bannerMessage = document.getElementById("banner-message");
  const btnCancelStringMode = document.getElementById("btn-cancel-string-mode");

  const hudNoteCount = document.getElementById("hud-note-count");
  const hudStringCount = document.getElementById("hud-string-count");
  const hudFilterLabel = document.getElementById("hud-filter-label");

  // Modals
  const modalNoteEditor = document.getElementById("modal-note-editor");
  const formNoteEditor = document.getElementById("form-note-editor");
  const editorDialogTitle = document.getElementById("editor-dialog-title");
  const noteTitleInput = document.getElementById("note-title");
  const noteModuleInput = document.getElementById("note-module");
  const noteBadgeInput = document.getElementById("note-badge");
  const noteContentInput = document.getElementById("note-content");
  const btnDeleteCurrentNote = document.getElementById("btn-delete-current-note");
  const btnCloseEditor = document.getElementById("btn-close-editor");
  const btnCancelEditor = document.getElementById("btn-cancel-editor");

  const modalSettings = document.getElementById("modal-settings");
  const btnCloseSettings = document.getElementById("btn-close-settings");
  const btnSettingsDone = document.getElementById("btn-settings-done");
  const btnLoadStarterNotes = document.getElementById("btn-load-starter-notes");
  const btnClearAllNotes = document.getElementById("btn-clear-all-notes");
  const btnExportBackup = document.getElementById("btn-export-backup");
  const inputImportFile = document.getElementById("input-import-file");
  const btnPrintWall = document.getElementById("btn-print-wall");

  // --- Persistence Functions ---
  function saveToStorage() {
    try {
      const payload = {
        notes: state.notes,
        links: state.links,
        theme: state.theme,
        view: state.view
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
    updateHUD();
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.notes) && data.notes.length > 0) {
          state.notes = data.notes;
          state.links = Array.isArray(data.links) ? data.links : [];
          if (data.theme) state.theme = data.theme;
          if (data.view) state.view = data.view;
          return true;
        }
      }
    } catch (e) {
      console.error("Failed to load notes", e);
    }
    return false;
  }

  function loadStarterKit() {
    state.notes = JSON.parse(JSON.stringify(GOOGLE_IT_AUTOMATION_STARTER_NOTES));
    state.links = JSON.parse(JSON.stringify(STARTER_LINKS));
    saveToStorage();
    centerCanvasOnNotes();
    renderAllNotes();
    renderAllStrings();
    playTactileSound('pin');
  }

  // --- Viewport & Canvas Pan / Zoom ---
  let isPanning = false;
  let panStart = { x: 0, y: 0 };
  let viewStart = { x: 0, y: 0 };

  function applyTransform() {
    boardCanvas.style.transform = `translate(${state.view.x}px, ${state.view.y}px) scale(${state.view.scale})`;
    btnZoomReset.textContent = `${Math.round(state.view.scale * 100)}%`;
  }

  function centerCanvasOnNotes() {
    if (state.notes.length === 0) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      state.view.scale = 1.0;
      state.view.x = vw / 2 - 2500;
      state.view.y = vh / 2 - 2500;
      applyTransform();
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.notes.forEach(n => {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + 300);
      maxY = Math.max(maxY, n.y + 260);
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    state.view.scale = 0.95;
    state.view.x = (vw / 2) - (centerX * state.view.scale);
    state.view.y = (vh / 2) - (centerY * state.view.scale);
    applyTransform();
  }

  function zoomAtPoint(scaleDelta, clientX, clientY) {
    const newScale = Math.min(Math.max(state.view.scale + scaleDelta, 0.35), 2.2);
    if (newScale === state.view.scale) return;

    // Zoom centered around mouse coordinate
    const worldX = (clientX - state.view.x) / state.view.scale;
    const worldY = (clientY - state.view.y) / state.view.scale;

    state.view.scale = newScale;
    state.view.x = clientX - worldX * newScale;
    state.view.y = clientY - worldY * newScale;
    applyTransform();
  }

  // --- Markdown & Content Parser ---
  function parseContent(text) {
    if (!text) return "";
    let safe = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks with syntax copy button
    safe = safe.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, function (match, lang, code) {
      const codeId = "code_" + Math.random().toString(36).substring(2, 8);
      return `<div class="code-block-wrapper maskable">
        <div class="code-block-header">
          <span>${lang ? lang.toUpperCase() : 'CODE'}</span>
          <button type="button" class="btn-copy-code" data-code="${encodeURIComponent(code)}">Copy</button>
        </div>
        <pre><code id="${codeId}">${code.trim()}</code></pre>
      </div>`;
    });

    // Spoilers for Active Recall: ||hidden answer||
    safe = safe.replace(/\|\|(.*?)\|\|/g, '<span class="spoiler" title="Click or hover to reveal in active recall">$1</span>');

    // Headers
    safe = safe.replace(/^### (.*$)/gim, '<div style="font-weight:700; font-size:0.92rem; margin:6px 0 2px 0;">$1</div>');
    safe = safe.replace(/^## (.*$)/gim, '<div style="font-weight:700; font-size:1.0rem; margin:8px 0 3px 0;">$1</div>');

    // Bold & Italic
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Inline code
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Callout box: > 💡 Tip: ...
    safe = safe.replace(/^>\s*(.*?)$/gim, '<div class="note-callout">$1</div>');

    // Bullet points
    safe = safe.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>');
    safe = safe.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');

    // Clean up multiple consecutive ULs
    safe = safe.replace(/<\/ul>\s*<ul>/g, '');

    // Paragraph line breaks
    safe = safe.replace(/\n\n/g, '<p></p>');

    return safe;
  }

  // --- Rendering Sticky Notes ---
  function renderAllNotes() {
    notesContainer.innerHTML = "";
    state.notes.forEach(note => {
      const el = createNoteElement(note);
      notesContainer.appendChild(el);
    });
    applyFilterAndSearch();
    updateHUD();
  }

  function getModuleLabel(code) {
    const map = {
      c1: "C1: Python Crash",
      c2: "C2: OS & Python",
      c3: "C3: Git & GitHub",
      c4: "C4: Troubleshooting",
      c5: "C5: Puppet & Cloud",
      c6: "C6: Real-World Auto",
      custom: "Custom"
    };
    return map[code] || "General";
  }

  function createNoteElement(note) {
    const el = document.createElement("div");
    el.id = note.id;
    el.className = `sticky-note color-${note.color || 'yellow'} ${note.isLocked ? 'is-locked' : ''}`;
    el.style.left = `${note.x}px`;
    el.style.top = `${note.y}px`;
    el.style.setProperty("--rot", `${note.rotation || 0}deg`);

    const parsedBody = parseContent(note.content);

    el.innerHTML = `
      <div class="pushpin-anchor" title="${note.isLocked ? 'Pinned tight (Locked). Click pin to unlock.' : 'Click pin to toggle lock / drag'}">
        <div class="pin-head pin-${note.pinColor || 'red'}"></div>
        <div class="pin-hole-shadow"></div>
      </div>

      <div class="note-header">
        <div class="note-tags">
          <span class="badge-tag">${note.badge || 'Concept'}</span>
          <span class="badge-module">${getModuleLabel(note.module)}</span>
        </div>
        <div class="note-actions">
          <button class="btn-note-action btn-link-this" title="Connect string from this note">🔗</button>
          <button class="btn-note-action btn-edit-note" title="Edit note">✏️</button>
          <button class="btn-note-action btn-del-note" title="Remove note">&times;</button>
        </div>
      </div>

      <h3 class="note-title">${note.title}</h3>
      <div class="note-body">${parsedBody}</div>

      <div class="note-footer">
        <span>${note.isLocked ? '📌 Pinned Locked' : '✋ Draggable'}</span>
        <span>${getModuleLabel(note.module)}</span>
      </div>
    `;

    attachNoteEvents(el, note);
    return el;
  }

  function attachNoteEvents(noteEl, note) {
    const pinAnchor = noteEl.querySelector(".pushpin-anchor");
    const btnLink = noteEl.querySelector(".btn-link-this");
    const btnEdit = noteEl.querySelector(".btn-edit-note");
    const btnDel = noteEl.querySelector(".btn-del-note");

    // Pin click toggles lock status
    pinAnchor.addEventListener("click", (e) => {
      e.stopPropagation();
      note.isLocked = !note.isLocked;
      noteEl.classList.toggle("is-locked", note.isLocked);
      playTactileSound('pin');
      saveToStorage();
    });

    // Link button
    btnLink.addEventListener("click", (e) => {
      e.stopPropagation();
      startLinkMode(note.id);
    });

    // Edit button
    btnEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditorModal(note.id);
    });

    // Delete button
    btnDel.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteNote(note.id);
    });

    // Copy code button event delegation
    noteEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-copy-code")) {
        e.stopPropagation();
        const codeText = decodeURIComponent(e.target.getAttribute("data-code"));
        navigator.clipboard.writeText(codeText).then(() => {
          const old = e.target.textContent;
          e.target.textContent = "Copied!";
          setTimeout(() => { e.target.textContent = old; }, 1500);
        });
        return;
      }

      // Spoilers reveal toggle on click
      if (e.target.classList.contains("spoiler")) {
        e.target.classList.toggle("revealed");
        return;
      }
      if (e.target.closest(".code-block-wrapper.maskable")) {
        e.target.closest(".code-block-wrapper.maskable").classList.toggle("revealed");
        return;
      }

      // If linking mode active
      if (state.stringLinkMode.active) {
        handleNoteClickInLinkMode(note.id);
      }
    });

    // Dragging setup
    let isDraggingNote = false;
    let dragStart = { x: 0, y: 0 };
    let noteStart = { x: 0, y: 0 };

    noteEl.addEventListener("mousedown", (e) => {
      // Prevent drag if clicking buttons, inputs, links, or if locked
      if (e.target.closest("button") || e.target.closest("input") || e.target.closest("pre") || e.target.closest(".btn-copy-code")) {
        return;
      }
      if (state.stringLinkMode.active) return;
      if (note.isLocked) return;

      isDraggingNote = true;
      noteEl.classList.add("is-dragging");

      dragStart.x = e.clientX;
      dragStart.y = e.clientY;
      noteStart.x = note.x;
      noteStart.y = note.y;

      const onMouseMove = (moveEvent) => {
        if (!isDraggingNote) return;
        const dx = (moveEvent.clientX - dragStart.x) / state.view.scale;
        const dy = (moveEvent.clientY - dragStart.y) / state.view.scale;
        note.x = Math.round(noteStart.x + dx);
        note.y = Math.round(noteStart.y + dy);
        noteEl.style.left = `${note.x}px`;
        noteEl.style.top = `${note.y}px`;
        updateStringsForNote(note.id);
      };

      const onMouseUp = () => {
        if (isDraggingNote) {
          isDraggingNote = false;
          noteEl.classList.remove("is-dragging");
          saveToStorage();
        }
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  }

  // --- SVG String Connectors (Red Yarn) ---
  function getNotePinCoord(noteId) {
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return null;
    // The pushpin sits at top center of the note card
    return {
      x: note.x + 140, // 280px / 2
      y: note.y - 2
    };
  }

  function renderAllStrings() {
    svgStrings.innerHTML = "";
    state.links.forEach(link => {
      const p1 = getNotePinCoord(link.from);
      const p2 = getNotePinCoord(link.to);
      if (!p1 || !p2) return;

      const pathEl = createStringPath(link.id, p1, p2);
      svgStrings.appendChild(pathEl);
    });
    updateHUD();
  }

  function updateStringsForNote(noteId) {
    const affectedLinks = state.links.filter(l => l.from === noteId || l.to === noteId);
    affectedLinks.forEach(link => {
      const p1 = getNotePinCoord(link.from);
      const p2 = getNotePinCoord(link.to);
      const pathEl = document.getElementById(link.id);
      if (pathEl && p1 && p2) {
        const d = calculateCatenaryPath(p1, p2);
        pathEl.setAttribute("d", d);
      }
    });
  }

  function calculateCatenaryPath(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Subtle physical sag depending on distance
    const sag = Math.min(Math.max(dist * 0.12, 20), 120);

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2 + sag;

    return `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;
  }

  function createStringPath(id, p1, p2) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id", id);
    path.setAttribute("class", "yarn-string");
    path.setAttribute("d", calculateCatenaryPath(p1, p2));
    path.style.pointerEvents = "stroke";
    path.style.cursor = "pointer";

    // Double click to remove string
    path.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      removeLink(id);
    });

    g.appendChild(path);
    return g;
  }

  function removeLink(linkId) {
    state.links = state.links.filter(l => l.id !== linkId);
    saveToStorage();
    renderAllStrings();
  }

  // --- String Link Mode ---
  function startLinkMode(sourceId = null) {
    state.stringLinkMode.active = true;
    state.stringLinkMode.sourceId = sourceId;

    bannerNotification.classList.remove("hidden");
    if (sourceId) {
      bannerMessage.textContent = "Connecting from note! Now click the second note to pin red yarn.";
      highlightLinkableNotes(sourceId);
    } else {
      bannerMessage.textContent = "Link Concepts: Click the first note, then the second note.";
    }
  }

  function cancelLinkMode() {
    state.stringLinkMode.active = false;
    state.stringLinkMode.sourceId = null;
    bannerNotification.classList.add("hidden");
    document.querySelectorAll(".sticky-note").forEach(el => {
      el.classList.remove("selectable-source", "selectable-target");
    });
  }

  function highlightLinkableNotes(sourceId) {
    document.querySelectorAll(".sticky-note").forEach(el => {
      if (el.id === sourceId) {
        el.classList.add("selectable-source");
        el.classList.remove("selectable-target");
      } else {
        el.classList.remove("selectable-source");
        el.classList.add("selectable-target");
      }
    });
  }

  function handleNoteClickInLinkMode(noteId) {
    if (!state.stringLinkMode.sourceId) {
      state.stringLinkMode.sourceId = noteId;
      highlightLinkableNotes(noteId);
      bannerMessage.textContent = "First note selected! Now click the destination note.";
      playTactileSound('pin');
    } else {
      if (state.stringLinkMode.sourceId === noteId) {
        // Clicked same note, cancel
        cancelLinkMode();
        return;
      }

      // Check if link already exists
      const exists = state.links.some(l => 
        (l.from === state.stringLinkMode.sourceId && l.to === noteId) ||
        (l.from === noteId && l.to === state.stringLinkMode.sourceId)
      );

      if (!exists) {
        const newLink = {
          id: "link_" + Date.now().toString(36),
          from: state.stringLinkMode.sourceId,
          to: noteId
        };
        state.links.push(newLink);
        saveToStorage();
        renderAllStrings();
        playTactileSound('link');
      }

      cancelLinkMode();
    }
  }

  // --- Filtering & Searching ---
  function applyFilterAndSearch() {
    const filter = state.filterModule;
    const query = state.searchQuery.trim().toLowerCase();

    state.notes.forEach(note => {
      const el = document.getElementById(note.id);
      if (!el) return;

      const matchesModule = (filter === "all" || note.module === filter);
      const matchesSearch = !query || 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query) ||
        (note.badge && note.badge.toLowerCase().includes(query));

      if (matchesModule && matchesSearch) {
        el.classList.remove("dimmed");
      } else {
        el.classList.add("dimmed");
      }
    });
  }

  // --- Note Editor Dialog ---
  function openEditorModal(noteId = null) {
    state.editingNoteId = noteId;
    if (noteId) {
      const note = state.notes.find(n => n.id === noteId);
      if (!note) return;
      editorDialogTitle.textContent = "Edit Concept Note";
      noteTitleInput.value = note.title;
      noteModuleInput.value = note.module || "c2";
      noteBadgeInput.value = note.badge || "Concept";
      noteContentInput.value = note.content;

      // Color radio
      const colorRadio = formNoteEditor.querySelector(`input[name="note-color"][value="${note.color || 'yellow'}"]`);
      if (colorRadio) colorRadio.checked = true;

      const pinRadio = formNoteEditor.querySelector(`input[name="pin-color"][value="${note.pinColor || 'red'}"]`);
      if (pinRadio) pinRadio.checked = true;

      btnDeleteCurrentNote.classList.remove("hidden");
    } else {
      editorDialogTitle.textContent = "Pin a New Concept Note";
      formNoteEditor.reset();
      // Default to selected module if filtered
      if (state.filterModule !== "all") {
        noteModuleInput.value = state.filterModule;
      } else {
        noteModuleInput.value = "c2";
      }
      btnDeleteCurrentNote.classList.add("hidden");
    }

    modalNoteEditor.showModal();
    noteTitleInput.focus();
  }

  function closeEditorModal() {
    modalNoteEditor.close();
    state.editingNoteId = null;
  }

  function saveNoteFromForm(e) {
    e.preventDefault();
    const title = noteTitleInput.value.trim();
    if (!title) return;

    const module = noteModuleInput.value;
    const badge = noteBadgeInput.value;
    const content = noteContentInput.value;
    const color = (formNoteEditor.querySelector('input[name="note-color"]:checked') || {}).value || "yellow";
    const pinColor = (formNoteEditor.querySelector('input[name="pin-color"]:checked') || {}).value || "red";

    if (state.editingNoteId) {
      const note = state.notes.find(n => n.id === state.editingNoteId);
      if (note) {
        note.title = title;
        note.module = module;
        note.badge = badge;
        note.content = content;
        note.color = color;
        note.pinColor = pinColor;
      }
    } else {
      // Find a pleasant spot near center of current viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const spawnX = Math.round(((vw / 2) - state.view.x) / state.view.scale - 140) + Math.round((Math.random() - 0.5) * 120);
      const spawnY = Math.round(((vh / 2) - state.view.y) / state.view.scale - 120) + Math.round((Math.random() - 0.5) * 120);

      const newNote = {
        id: "note_" + Date.now().toString(36),
        title,
        module,
        badge,
        color,
        pinColor,
        x: spawnX,
        y: spawnY,
        rotation: (Math.random() * 4 - 2).toFixed(1),
        isLocked: false,
        content,
        createdAt: new Date().toISOString()
      };
      state.notes.push(newNote);
    }

    playTactileSound('pin');
    saveToStorage();
    renderAllNotes();
    renderAllStrings();
    closeEditorModal();
  }

  function deleteNote(noteId) {
    state.notes = state.notes.filter(n => n.id !== noteId);
    state.links = state.links.filter(l => l.from !== noteId && l.to !== noteId);
    saveToStorage();
    renderAllNotes();
    renderAllStrings();
  }

  // Helper snippet buttons in editor
  document.querySelectorAll(".btn-snippet").forEach(btn => {
    btn.addEventListener("click", () => {
      const snip = btn.getAttribute("data-snip");
      const textarea = noteContentInput;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      let insert = "";

      if (snip === "code") {
        insert = "\n```python\n# Python IT Automation snippet\nwith open('file.txt') as f:\n    pass\n```\n";
      } else if (snip === "recall") {
        insert = " ||hidden answer for active recall|| ";
      } else if (snip === "bullet") {
        insert = "\n- Key concept 1\n- Key concept 2\n";
      } else if (snip === "callout") {
        insert = "\n> 💡 Tip: Remember that ...\n";
      }

      textarea.setRangeText(insert, start, end, "end");
      textarea.focus();
    });
  });

  // --- Tidy Board (Auto-arrange Grid by Module) ---
  function tidyBoardLayout() {
    if (state.notes.length === 0) return;

    // Group notes by module
    const groups = {};
    state.notes.forEach(note => {
      const m = note.module || "other";
      if (!groups[m]) groups[m] = [];
      groups[m].push(note);
    });

    let startX = 2000;
    let startY = 2000;
    const colWidth = 320;
    const rowHeight = 310;
    const maxCols = 4;

    let index = 0;
    Object.keys(groups).forEach(m => {
      groups[m].forEach(note => {
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        note.x = startX + col * colWidth;
        note.y = startY + row * rowHeight;
        note.rotation = ((index % 3) - 1) * 1.2;
        index++;
      });
    });

    saveToStorage();
    renderAllNotes();
    renderAllStrings();
    centerCanvasOnNotes();
    playTactileSound('pin');
  }

  // --- Update HUD Bar ---
  function updateHUD() {
    hudNoteCount.textContent = `${state.notes.length} Note${state.notes.length === 1 ? '' : 's'}`;
    hudStringCount.textContent = `${state.links.length} Link${state.links.length === 1 ? '' : 's'}`;
    hudFilterLabel.textContent = getModuleLabel(state.filterModule);
  }

  // --- Event Listeners & Hotkeys ---
  function setupEventListeners() {
    // Canvas Panning (drag background or space+drag)
    boardViewport.addEventListener("mousedown", (e) => {
      if (e.target === boardViewport || e.target === boardCanvas || e.target === svgStrings) {
        isPanning = true;
        panStart.x = e.clientX;
        panStart.y = e.clientY;
        viewStart.x = state.view.x;
        viewStart.y = state.view.y;
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (!isPanning) return;
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      state.view.x = viewStart.x + dx;
      state.view.y = viewStart.y + dy;
      applyTransform();
    });

    window.addEventListener("mouseup", () => {
      if (isPanning) {
        isPanning = false;
        saveToStorage();
      }
    });

    // Mouse Wheel Zoom
    boardViewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.08 : -0.08;
      zoomAtPoint(zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Zoom Buttons
    btnZoomIn.addEventListener("click", () => {
      zoomAtPoint(0.15, window.innerWidth / 2, window.innerHeight / 2);
    });
    btnZoomOut.addEventListener("click", () => {
      zoomAtPoint(-0.15, window.innerWidth / 2, window.innerHeight / 2);
    });
    btnZoomReset.addEventListener("click", () => {
      centerCanvasOnNotes();
    });

    // Top Action Buttons
    btnNewNote.addEventListener("click", () => openEditorModal());
    btnToggleStringMode.addEventListener("click", () => {
      if (state.stringLinkMode.active) {
        cancelLinkMode();
      } else {
        startLinkMode();
      }
    });
    btnCancelStringMode.addEventListener("click", cancelLinkMode);

    // Active Recall Mode Toggle
    btnRecallMode.addEventListener("click", () => {
      state.isRecallMode = !state.isRecallMode;
      document.body.classList.toggle("recall-active", state.isRecallMode);
      btnRecallMode.classList.toggle("active", state.isRecallMode);
    });

    // Search and Filter
    inputSearch.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      btnClearSearch.classList.toggle("hidden", !state.searchQuery);
      applyFilterAndSearch();
    });
    btnClearSearch.addEventListener("click", () => {
      inputSearch.value = "";
      state.searchQuery = "";
      btnClearSearch.classList.add("hidden");
      applyFilterAndSearch();
    });

    selectModuleFilter.addEventListener("change", (e) => {
      state.filterModule = e.target.value;
      applyFilterAndSearch();
      updateHUD();
    });

    // Theme Picker
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const theme = btn.getAttribute("data-theme");
        document.body.className = `theme-${theme} ${state.isRecallMode ? 'recall-active' : ''}`;
        state.theme = theme;
        saveToStorage();
      });
    });

    // Tidy Board
    btnTidyBoard.addEventListener("click", tidyBoardLayout);

    // Settings Modal
    btnMenuSettings.addEventListener("click", () => modalSettings.showModal());
    btnCloseSettings.addEventListener("click", () => modalSettings.close());
    btnSettingsDone.addEventListener("click", () => modalSettings.close());

    // Starter pack & clear
    btnLoadStarterNotes.addEventListener("click", () => {
      if (confirm("Load curated Google IT Automation starter notes? (This will add them to your wall)")) {
        loadStarterKit();
        modalSettings.close();
      }
    });

    btnClearAllNotes.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all notes and links from the wall?")) {
        state.notes = [];
        state.links = [];
        saveToStorage();
        renderAllNotes();
        renderAllStrings();
        modalSettings.close();
      }
    });

    // Export / Import
    btnExportBackup.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        notes: state.notes,
        links: state.links,
        exportedAt: new Date().toISOString()
      }, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `studypin-backup-${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });

    inputImportFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed.notes)) {
            state.notes = parsed.notes;
            state.links = Array.isArray(parsed.links) ? parsed.links : [];
            saveToStorage();
            renderAllNotes();
            renderAllStrings();
            centerCanvasOnNotes();
            modalSettings.close();
            alert(`Successfully loaded ${state.notes.length} notes!`);
          } else {
            alert("Invalid backup file format.");
          }
        } catch (err) {
          alert("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    });

    btnPrintWall.addEventListener("click", () => {
      window.print();
    });

    // Form submission
    formNoteEditor.addEventListener("submit", saveNoteFromForm);
    btnCloseEditor.addEventListener("click", closeEditorModal);
    btnCancelEditor.addEventListener("click", closeEditorModal);
    btnDeleteCurrentNote.addEventListener("click", () => {
      if (state.editingNoteId) {
        deleteNote(state.editingNoteId);
        closeEditorModal();
      }
    });

    // Global Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      // Don't trigger shortcuts when typing inside form fields
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        if (e.key === "Escape") {
          if (modalNoteEditor.open) closeEditorModal();
        }
        return;
      }

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        openEditorModal();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        btnRecallMode.click();
      } else if (e.key === "/") {
        e.preventDefault();
        inputSearch.focus();
      } else if (e.key === "Escape") {
        if (state.stringLinkMode.active) cancelLinkMode();
        if (modalNoteEditor.open) closeEditorModal();
        if (modalSettings.open) modalSettings.close();
      }
    });
  }

  // --- Initialize App ---
  function init() {
    const hasData = loadFromStorage();
    if (!hasData) {
      // First time run: load starter kit
      state.notes = JSON.parse(JSON.stringify(GOOGLE_IT_AUTOMATION_STARTER_NOTES));
      state.links = JSON.parse(JSON.stringify(STARTER_LINKS));
      saveToStorage();
    }

    // Set theme
    document.body.className = `theme-${state.theme}`;
    const activeThemeBtn = document.querySelector(`.theme-btn[data-theme="${state.theme}"]`);
    if (activeThemeBtn) {
      document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
      activeThemeBtn.classList.add("active");
    }

    setupEventListeners();
    centerCanvasOnNotes();
    renderAllNotes();
    renderAllStrings();
  }

  // Start when DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
