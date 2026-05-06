# Skill: Vite Environment Variables

- All client-side environment variables in Vite must be prefixed with `VITE_`.
- Whenever an environment variable is added or modified in `.env`, its key (without the sensitive value) MUST be immediately added to the `.env.template` file to maintain team consistency.
