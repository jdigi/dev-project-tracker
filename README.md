# 📋 Dev Project Tracker — README

A simple internal dashboard to help your project coordinators and creative team visualize what development work is in progress, upcoming, or complete. This tool provides clarity on scope, complexity, go-live dates, and your bandwidth.

---

## 🚀 Project Goals

- Improve visibility of dev work for non-engineers
- Provide a centralized view of project status, scope, and timing
- Allow you (as the sole dev) to easily update data

---

## 🛠️ Tech Stack

- **Framework**: Next.js (recommended for file-based routing and flexibility)
- **Styling**: Tailwind CSS
- **Data Source**: Static JSON file (`/data/projects.json`)
- **Deployment**: Vercel / Netlify / IIS static deployment
- **Auth**: None (read-only internal tool)

---

## 📁 Project Structure

```
project-tracker/
├── public/
├── data/
│   └── projects.json
├── src/
│   ├── components/
│   │   ├── ProjectCard.tsx
│   │   ├── StatusBadge.tsx
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── index.tsx            # Main dashboard
│   │   └── project/[id].tsx     # (Optional) Detail view
│   └── styles/
│       └── globals.css
├── README.md
├── tailwind.config.js
├── next.config.js
└── package.json

```

---

## 📈 Data Format (`/data/projects.json`)

```json
[
  {
    "id": "homepage-refresh",
    "name": "Homepage Refresh",
    "status": "In Progress",
    "scope": "Full Page Build",
    "complexity": "High",
    "goLive": "2025-06-01",
    "progress": 60,
    "notes": "Waiting on image assets"
  },
  {
    "id": "email-module",
    "name": "Email Module Update",
    "status": "Upcoming",
    "scope": "Module Update",
    "complexity": "Medium",
    "goLive": "2025-06-10",
    "progress": 20
  }
]
```

---

## 🧭 Roadmap

### ✅ Week 1: Project Setup

-

### ✅ Week 2: Dashboard View

-

### ✅ Week 3: Data Wiring & Polishing

-

### 🟨 Optional Week 4: Enhancements

- ***

## 💡 Tips for Updating

- Edit `data/projects.json` directly — no CMS or database needed
- Deploy updated build manually if on IIS
- Use clear and consistent status values: `Upcoming`, `In Progress`, `Blocked`, `Done`

---

## 👀 Example UI Elements

- Status: Color-coded pill (e.g. 🔴 In Progress, 🟢 Done)
- Progress: Horizontal bar with % complete
- Complexity: Emoji or level (Low/Medium/High)
- Notes: Optional line for blockers or status context

---

## 🧼 Maintenance Plan

Since you're the only dev:

- Keep data file simple and human-readable
- Avoid over-engineering (no backend)
- Consider batching updates weekly

---

## 🧪 Future Ideas

- Markdown-based notes per project
- Export to CSV
- Email summary or digest version

---

Built by and for internal clarity 🙌
