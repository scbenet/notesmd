# NotesMarkdown

A browser-based markdown note-taking application with rich text editing capabilities.

## Features

- Create, edit, and organize notes with rich text formatting
- Markdown support with live preview
- Syntax highlighting for code blocks
- Full-text search across all notes
- Responsive design that works on desktop and mobile
- Client-side storage (no account required, all data stays in your browser)

## Tech Stack

- React 19
- Vite for fast development and optimized builds
- Mantine UI for responsive components
- TipTap rich text editor with Markdown support
- IndexedDB (via Dexie.js) for client-side storage

## Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/notesmd.git
cd notesmd
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

### Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run preview` - Preview production build locally
