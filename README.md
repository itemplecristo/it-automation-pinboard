# 📌 StudyPin — Google IT Automation Concept Wall

An interactive, tactile corkboard web application designed for learning, conceptual mapping, and active recall memorization for the **Google IT Automation with Python** professional certificate.

---

## 🚀 How to Run

### Option 1: Direct in Any Browser (Zero Setup)
Simply open `index.html` in Chrome, Firefox, Edge, or Brave:
```bash
# In terminal:
google-chrome index.html
# or
xdg-open index.html
```
Or right-click `index.html` in your file explorer and choose your browser.

### Option 2: Local Python Server
```bash
cd /home/itemplecristo/.gemini/antigravity/scratch/it-automation-pinboard
python3 -m http.server 8080
```
Then visit: `http://localhost:8080`

---

## 🌟 Key Features

1. **Realistic Corkboard & Pushpins:**
   - Drag and drop notes anywhere on a 5000x5000 pannable study wall.
   - Click any pushpin head to **lock/unlock** the note in place.
   - Multiple note colors (Classic Yellow, Rose Pink, Sky Blue, Mint Green, Lavender, Dark Slate) and pin styles.

2. **Red Yarn / String Connectors (Concept Mapping):**
   - Click **"Link Concepts"** (or 🔗 on any note) and pick two notes to stretch a physical string between them.
   - Connected strings curve with realistic gravity sag and stretch dynamically when you drag notes!
   - Double-click any string to detach it.

3. **Active Recall & Memorization Mode (HotKey: `M`):**
   - Press `M` or click **"Active Recall"** in the top bar.
   - All code blocks and text wrapped in `||spoilers||` are instantly blurred.
   - Hover or click any blurred answer to reveal and test your memory!

4. **Curated Google IT Automation Starter Pack:**
   - Pre-loaded with high-yield conceptual notes for:
     - **Python `with open()` & Context Managers** (handling file closures, `readlines()`, buffer gotchas).
     - **File Modes** (`r`, `w`, `a`, `r+` truncation pitfalls).
     - **OS & Paths** (`os.path.join`, `os.path.exists`, `os.listdir`).
     - **Regular Expressions** (`re.search`, greedy vs non-greedy, capture groups).
     - **CSV Processing** (`csv.DictReader` vs standard reader).
     - **Process Automation** (`subprocess.run`, returncodes, safe execution).
     - **Google's 4-Step Troubleshooting Method** (reproduce, root cause, isolate, prevent).

5. **Search & Module Filters:**
   - Filter notes by Course Module (Course 1 through Course 6).
   - Instant search (`/`) that dims irrelevant notes and highlights matching concepts.

6. **Local Persistence & Export:**
   - Notes are automatically stored in `localStorage`.
   - Backup or restore your entire study board as a `.json` file anytime.
   - Print clean study summary sheets via `window.print()` (Print Study Sheet).

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>N</kbd> | Create a new note |
| <kbd>M</kbd> | Toggle Active Recall (Masking mode) |
| <kbd>/</kbd> | Focus search box |
| <kbd>Esc</kbd> | Cancel linking mode / Close dialog |
| <kbd>Space</kbd> + Drag | Pan across the wall canvas |
| <kbd>Scroll Wheel</kbd> | Zoom in and out |
