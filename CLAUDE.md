# CLAUDE.md - NotesMarkdown Dev Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Code Style
- React 19.0+ with JSX runtime
- Components use PascalCase naming (e.g., BasicAppShell)
- Functional components with hooks preferred
- Import order: react built in hooks first, then external libraries, then local components
- ES2020+ JavaScript syntax (not TypeScript)
- Mantine UI library conventions for styling
- ESLint enforces code quality with React plugins:
  - eslint-plugin-react
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh

## Organization
- React components in PascalCase with .jsx extension
- Separate component logic from presentation when practical
- Keep components reasonably small (<300 lines, can go longer if needed)
- Use consistent error handling patterns (try/catch with user-friendly messages)

This guide will be provided to agentic coding assistants working in this repository.