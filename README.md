# CyberViz Dashboard

A futuristic, interactive cybersecurity analytics dashboard built with React, Vite, and Tailwind CSS.

## Features

- **Authentication:** Login and registration with role-based access.
- **Dashboard:** Visualize security metrics, incidents, and trends.
- **Threat Analysis:** Charts and summaries of vulnerabilities and exploits.
- **Network Security:** Visualize network risks, protocol distributions, and firewall status.
- **Data Protection:** Policies, encryption, and access control visualization.
- **Access Control:** User access stats, MFA compliance, and recent events.
- **AI Models:** NLP models for intent classification and analysis.
- **Reports:** Generate, view, and download security reports.
- **Analytics:** Advanced analytics and visualizations.
- **Hardware Visualizer:** 3D visualization of hardware security issues.
- **File Upload:** Upload CSV/Excel data for custom analysis.
- **Modern UI:** Cyberpunk-inspired design with glowing effects and responsive layout.

## Project Structure

```
cyber-frontend/
├── public/
│   └── ... (static assets)
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.jsx
├── styles/
│   └── globals.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.mjs
└── vite.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)

### Installation

```sh
pnpm install
# or
npm install
```

### Development

```sh
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```sh
pnpm build
# or
npm run build
```

### Lint

```sh
pnpm lint
# or
npm run lint
```

## Usage

- **Login/Register:** Access via `/login` or `/register`.
- **Dashboard:** Main analytics at `/`.
- **Upload Data:** Use the dashboard upload button to analyze your own CSV/Excel files.
- **Navigate:** Use the sidebar to access Threat Analysis, Network Security, Data Protection, etc.

## Customization

- **Styling:** Modify `src/styles/globals.css` and `tailwind.config.js`.
- **Routes:** See [`App`](src/App.jsx) for route definitions.
- **Components:** Located in [`src/components`](src/components).



© {year} CyberViz Dashboard
