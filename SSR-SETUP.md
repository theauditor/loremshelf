# SSR Setup Guide

This application is now configured to use Vite's built-in Server-Side Rendering (SSR) capabilities.

## Architecture Overview

The application uses a modern SSR architecture with the following components:

- **Entry Points:**
  - `src/entry-client.tsx` - Client-side hydration entry point
  - `src/entry-server.tsx` - Server-side rendering entry point
  
- **Server:**
  - `server.js` - Express server that handles SSR for both development and production

- **Build Output:**
  - `dist/client/` - Client-side bundle with assets
  - `dist/server/` - Server-side bundle for SSR

## Development

To run the application in development mode with SSR:

```bash
npm install
npm run dev
```

The development server will start at `http://localhost:3000` with hot module replacement (HMR) enabled.

## Production Build

To build the application for production:

```bash
npm run build
```

This command runs two build processes:
1. `build:client` - Builds the client bundle with SSR manifest
2. `build:server` - Builds the server bundle for SSR

## Production Preview

To preview the production build locally:

```bash
npm run preview
```

This runs the production server with the built assets.

## Docker Deployment

The application includes a multi-stage Dockerfile optimized for SSR:

```bash
# Build the Docker image
docker build -t lorem-publishing .

# Run the container
docker run -p 3000:3000 lorem-publishing
```

The application will be available at `http://localhost:3000`.

## Key Configuration Files

### vite.config.ts
- Configured with `manifest: true` and `ssrManifest: true` for SSR support
- `ssr.noExternal` includes packages that need to be bundled for SSR

### package.json
- Added SSR-specific dependencies: `express`, `compression`, `sirv`
- New scripts for building and running SSR

### server.js
- Handles both development (with Vite middleware) and production modes
- Serves static assets in production
- Renders pages on the server before sending to client

## Benefits of SSR

1. **Improved SEO** - Search engines can crawl fully rendered HTML
2. **Faster First Paint** - Users see content before JavaScript loads
3. **Better Performance** - Reduced time to interactive
4. **Social Media Previews** - Proper meta tags for sharing

## Environment Variables

- `NODE_ENV` - Set to 'production' for production mode
- `PORT` - Server port (default: 3000)
- `BASE` - Base URL path (default: '/')

## Troubleshooting

### Development Issues
- Ensure all dependencies are installed: `npm install`
- Clear node_modules if issues persist: `rm -rf node_modules && npm install`

### Build Issues
- Check that both client and server builds complete successfully
- Verify TypeScript compilation has no errors

### Production Issues
- Ensure NODE_ENV is set to 'production'
- Check that dist/client and dist/server directories exist
- Verify all production dependencies are installed

