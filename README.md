# Calculator — Commit 1: History (Vite + React)

Stage 1 of the Sankalp Tech Club calculator task: layout + a working,
persisted history panel. Digit entry works; operators are visibly present
but disabled — the calculation engine is Commit 2's job.

## Structure

```
calculator-vite/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx                # Root component
    ├── components/
    │   ├── Calculator.jsx     # Owns display value, wires everything together
    │   ├── Display.jsx        # Shows the current value
    │   ├── Keypad.jsx         # Digit buttons (active) + operator buttons (disabled)
    │   └── History.jsx        # Renders history list
    ├── hooks/
    │   └── useHistory.js      # localStorage-backed history state
    └── styles/
        └── index.css
```

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Commit it

```bash
git init
git add .
git commit -m "Add calculator layout and implement history panel with localStorage persistence"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
