# Hostinger Deployment

This project is a server-rendered TanStack Start application. Deploy it as a
Hostinger **Node.js Web App**, not as a static front-end.

## Recommended: GitHub deployment

1. Push this project to GitHub.
2. In Hostinger hPanel, open **Websites** and select **Add Website**.
3. Choose **Node.js Web App**, then **Import Git Repository**.
4. Select the repository and production branch.
5. Use these build settings:

   - Framework: `Other`
   - Node.js version: `22.x`
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Output directory: `dist`
   - Entry file, if requested: `dist/server/index.mjs`

6. Connect the production domain and deploy.

Hostinger provides the runtime `PORT` environment variable. Nitro reads it
automatically, so no hard-coded port is required.

## ZIP deployment

Create a ZIP containing the source files, including `package.json`,
`package-lock.json`, `src`, `public`, and `vite.config.ts`. Do not include
`node_modules`, `dist`, `.vercel`, logs, or screenshot folders. Upload the
ZIP through the same **Node.js Web App** flow and use the settings above.

## Verification

After deployment, verify:

- `/`
- `/properties`
- `/locations`
- `/sitemap.xml`
- a dynamic property or location page

The sitemap derives its origin from the incoming request, so it automatically
uses the connected production domain.
